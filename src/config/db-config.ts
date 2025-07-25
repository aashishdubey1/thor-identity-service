import mongoose from "mongoose";
import serverConfig from "./server-config";
import logger from "../utils/logger";

export async function connectToDB(){
    try {
        await mongoose.connect(serverConfig.DB_URL!)
        logger.info("Db Connected")
    } catch (error) {   
        logger.error("Error connecting To db",error);
    }
}