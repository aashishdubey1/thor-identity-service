import { configDotenv } from "dotenv";

configDotenv()

export default {
    PORT:process.env.PORT,
    DB_URL:process.env.DB_URL,
    NODE_ENV:process.env.NODE_ENV,
    ACCESS_SECRET:process.env.ACCESS_SECRET,
    REFRESH_SECRET:process.env.REFRESH_SECRET,
}