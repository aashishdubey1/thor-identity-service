import mongoose from "mongoose";
import serverConfig from "./server-config";

export async function connectToDB(){
    try {
        await mongoose.connect(serverConfig.DB_URL!)
        console.log("DB connected")
    } catch (error) {   
        console.log("Error connecting To db",error)
    }
}