import { AppError } from "./AppError";
import { StatusCodes } from "http-status-codes";

export class UnauthorizedError extends AppError {
    constructor(){
        super("UNAUTHORIZED_ERROR",StatusCodes.UNAUTHORIZED,"You are not authorized",)
    }
}