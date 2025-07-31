
import Redis from 'ioredis'
import serverConfig from './server-config'
import logger from '../utils/logger'

const redis = new Redis({
    port:parseInt(serverConfig.REDIS_PORT!),
    host:serverConfig.REDIS_HOST,
    password:serverConfig.REDIS_PASSWORD,
    // maxRetriesPerRequest: 3,
    // lazyConnect: false, 
    // enableOfflineQueue: false,
    // connectTimeout: 5000,
    // commandTimeout: 3000,
    // family: 4, // ✅ Force IPv4
})

redis.on("error",(err)=>{
    logger.error("Error Connecting Redis",err)
})

redis.on('connect',()=>{
    logger.info("Redis Connected")
})

redis.on('ready',()=>{
    logger.info('Redis is ready')
})

export default redis
