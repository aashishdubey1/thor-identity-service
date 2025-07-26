
import { Request,Response,NextFunction } from "express"
import { NotImplementedError } from "../errors/NotImplemented-error"

export const getUser = async (req:Request,res:Response,next:NextFunction) => {
    try {
        throw new NotImplementedError("This Feature is not ready yet")
    } catch (error) {
        next(error)
    }
}

export const updateUser = async (req:Request,res:Response,next:NextFunction) => {
    try {
        throw new NotImplementedError("This Feature is not ready yet")
    } catch (error) {
        next(error)
    }
}

export const deleteUser = async (req:Request,res:Response,next:NextFunction) => {
    try {
        throw new NotImplementedError("This Feature is not ready yet")
    } catch (error) {
        next(error)
    }
}