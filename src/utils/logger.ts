import { createLogger,transports,format } from "winston";
import path from "path";
import serverConfig from "../config/server-config";


const logDir = path.resolve(__dirname,'../../logs');
const isDev :boolean = serverConfig.NODE_ENV !== 'production'

const logger = createLogger({
    level:serverConfig.NODE_ENV === 'development' ? "debug" : "info",
    format:format.combine(
        format.timestamp(),
        format.errors({stack:true}),
        format.splat(),
        format.json()
    ),
    defaultMeta:{service:"identity-service"},
    transports:[
        new transports.Console({
            format:isDev ? format.combine(format.colorize(),format.simple()):format.json()
        }),
        new transports.File({filename:path.join(logDir,'error.log'),level:"error"}),
        new transports.File({filename:path.join(logDir,'combined.log')})
    ]
})

export default logger