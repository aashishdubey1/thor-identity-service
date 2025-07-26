
import { Request,Response,NextFunction } from "express"
import { NotImplementedError } from "../errors/NotImplemented-error"

export const registerUser = async (req:Request,res:Response,next:NextFunction) => {
    try {
        throw new NotImplementedError("This Feature is not ready yet")
    } catch (error) {
        next(error)
    }
}

export const loginUser = async (req:Request,res:Response,next:NextFunction) => {
    try {
        throw new NotImplementedError("This Feature is not ready yet")
    } catch (error) {
        next(error)
    }
}

export const logoutUser = async (req:Request,res:Response,next:NextFunction) => {
    try {
        throw new NotImplementedError("This Feature is not ready yet")
    } catch (error) {
        next(error)
    }
}

