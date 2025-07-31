import  express from "express";
import cors from 'cors'
import helmet from "helmet";
import apiRouter from './routes/index'
import { errorHandler } from "./middlewares/errorHandler";
import swagger from './swagger'
import {generalRateLimit} from "./middlewares/rateLimiter";
import logger from "./utils/logger";
import serverConfig from "./config/server-config";
import { connectToDB } from "./config/db-config";
import redis from "./config/redis-config";


const app = express();

app.use(helmet())
app.use(express.json())
app.use(express.urlencoded({extended:true}));
app.use(cors())

app.use((req,res,next)=>{
    logger.info(`Request of ${req.method} is comming for ${req.url}`)
    next()
})

app.use((req,res,next)=>{
    if(req.path.startsWith('/api/auth')) return next()
    return generalRateLimit(req,res,next)
})

app.use('/api',apiRouter)
app.use('/api-docs',swagger)


app.use(errorHandler)

app.get("/api",(req,res,next)=>{
    res.send("Ok")
})

app.listen(serverConfig.PORT,async()=>{
    logger.info(`Server is Running on port ${serverConfig.PORT}`)
    await connectToDB()
    // await redis.flushdb();
    // console.log('redis data deleted')
    const generalRL = await redis.get('general_rl:::1');
    const authRL = await redis.get('auth_rl:::1');
    const loginRL = await redis.get('login_rl:::1_aashish@gmail.com');
    const keys = await redis.keys('*');
    console.log('All Keys:', keys);
    console.log('General Rl:', generalRL);
    console.log('auth Rl:', authRL);
    console.log('login Rl:', loginRL);
})
