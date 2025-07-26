import { StatusCodes } from "http-status-codes";
import { AppError } from "./AppError";


export class NotImplementedError extends AppError {
    constructor(message:string){
        super("NOT_IMPLEMENTED",StatusCodes.NOT_IMPLEMENTED,message)
    }
}

