

type ErrorType = "BAD_REQUEST" | "NOT_FOUND" | "DB_ERROR"| "UNAUTHORIZED_ERROR" | "INTERNAL_SERVER_ERROR"    

export class AppError extends Error {

    type:ErrorType
    statusCode:number;
    isOperational:boolean;

    constructor(type:ErrorType,statusCode:number,message:string,isOperational:boolean=true,){
        super(message),
        this.type = type
        this.statusCode = statusCode,
        this.isOperational = isOperational

        Error.captureStackTrace(this,this.constructor)
    }
    
}