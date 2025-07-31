
import {RateLimiterRedis} from 'rate-limiter-flexible'
import redis from '../config/redis-config'
import { Request, Response,NextFunction } from 'express'
import logger from '../utils/logger'


const generalLimiter = new RateLimiterRedis({
    storeClient:redis,
    keyPrefix:"general_rl",
    points: 200,
    duration:900,
    blockDuration:120
})

const authLimiter = new RateLimiterRedis({
    storeClient:redis,
    keyPrefix:"auth_rl",
    points:10,
    duration:900,
    blockDuration:300,
    execEvenly: true,
})

const loginLimiter = new RateLimiterRedis({
    storeClient:redis,
    keyPrefix:"login_rl",
    points: 2,
    duration:120,
    blockDuration:120,
    execEvenly:true,
})

const createRateLimiter = (limiter: RateLimiterRedis, keyGenerator?: (req: Request) => string) => 
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      console.log('=== Rate limiter start ===');
      console.log('Rate limiter called for IP:', req.ip);
      console.log('Request URL:', req.url);
      console.log('Request method:', req.method);
      
      const key = keyGenerator ? keyGenerator(req) : req.ip;
      console.log('Generated key:', key);
      
      if (!key) {
        throw new Error('Generated key is falsy');
      }
      
      console.log('About to call limiter.consume...');
      const result = await limiter.consume(key);
      console.log('Limiter consume successful, remaining:', result.remainingPoints);
      console.log('=== Rate limiter success, calling next() ===');
      next();
    } catch (rejRes: any) {
      console.log('=== Rate limiter caught error ===');
      console.log('Error type:', typeof rejRes);
      console.log('Error details:', rejRes);
      
      if (rejRes && typeof rejRes.msBeforeNext === 'number') {
        logger.warn(`Rate limit exceeded for ${req.ip}`);
        const secs = Math.round(rejRes.msBeforeNext / 1000) || 1;
        res.set("Retry-After", String(secs));
        return res.status(429).json({
          success: false,
          error: "Too many requests",
          retryAfter: `${secs}s`
        });
      } else {
        console.error('Unexpected error in rate limiter:', rejRes);
        return res.status(500).json({
          success: false,
          error: "Internal server error"
        });
      }
    }
  };

export const authRateLimit = createRateLimiter(authLimiter)
export const generalRateLimit = createRateLimiter(generalLimiter)
export const loginRateLimit = createRateLimiter(loginLimiter,(req)=>`${req.ip!}_${req.body.email!}`)
