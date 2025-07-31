import { configDotenv } from "dotenv";

configDotenv()

export default {
    PORT:process.env.PORT,
    DB_URL:process.env.DB_URL,
    NODE_ENV:process.env.NODE_ENV,
    ACCESS_SECRET:process.env.ACCESS_SECRET,
    REFRESH_SECRET:process.env.REFRESH_SECRET,
    ACCESS_SECRET_EXPIRES_TIME:process.env.ACCESS_SECRET_EXPIRES_TIME,
    REFRESH_SECRET_EXPIRES_TIME:process.env.REFRESH_SECRET_EXPIRES_TIME,
    REDIS_HOST:process.env.REDIS_HOST,
    REDIS_PORT:process.env.REDIS_PORT,
    REDIS_PASSWORD:process.env.REDIS_PASSWORD
}