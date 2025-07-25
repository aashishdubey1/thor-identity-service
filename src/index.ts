import  express from "express";
import cors from 'cors'
import serverConfig from "./config/server-config";
import { connectToDB } from "./config/db-config";
import userRouter from './routes/user'


const app = express();

app.use(express.json())
app.use(express.urlencoded({extended:true}));
app.use(cors())

app.use('/api/user',userRouter)


app.listen(serverConfig.PORT,async ()=>{
    console.log("Server is running")
    await connectToDB()
})