import  express from "express";
import cors from 'cors'
import serverConfig from "./config/server-config";
import { connectToDB } from "./config/db-config";
import userRouter from './routes/user'
import logger from "./utils/logger";


const app = express();

app.use(express.json())
app.use(express.urlencoded({extended:true}));
app.use(cors())

app.use('/api/user',userRouter)


app.listen(serverConfig.PORT,async ()=>{
    logger.info(`Server is Running on port ${serverConfig.PORT}`)
    await connectToDB()
})