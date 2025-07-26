import { Request,Response,NextFunction } from "express"
import { ZodType } from "zod"
import logger from "../utils/logger"
import { BadRequestError } from "../errors/BadRequest-error"

export const validate = <T>(schema:ZodType<T>) => (req:Request,res:Response,next:NextFunction) => {

    const result = schema.safeParse(req.body)
    if(!result.success){
        logger.info(`BAD_REQUEST_ERROR ${result.error.issues}`,)
        throw new BadRequestError("Invalid Inputs")
    }
    req.body = result.data
    next()
}