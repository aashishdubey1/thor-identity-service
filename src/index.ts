import  express from "express";
import cors from 'cors'
import serverConfig from "./config/server-config";
import { connectToDB } from "./config/db-config";
import apiRouter from './routes/index'
import logger from "./utils/logger";
import { errorHandler } from "./middlewares/errorHandler";
import swagger from './swagger'

const app = express();

app.use(express.json())
app.use(express.urlencoded({extended:true}));
app.use(cors())

app.use('/api',apiRouter)
app.use('/api-docs',swagger)

app.use(errorHandler)

app.listen(serverConfig.PORT,async ()=>{
    logger.info(`Server is Running on port ${serverConfig.PORT}`)
    await connectToDB()
})