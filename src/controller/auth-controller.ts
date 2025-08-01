
import { Request,Response,NextFunction } from "express"
import { NotImplementedError } from "../errors/NotImplemented-error"
import { AuthService } from "../service/AuthService"
import { UserRepo } from "../repository/UserRepo"
import { UserType } from "../schemas/user"
import { StatusCodes } from "http-status-codes"
import { sanitizeUser } from "../utils/sanitizeUser"
import redis from "../config/redis-config"
import logger from "../utils/logger"



const authService = new AuthService(new UserRepo())

export const registerUser = async (req:Request,res:Response,next:NextFunction) => {
    try {
        const  {username,email,password} = req.body as UserType
        const {newUser,accessToken,refreshToken} = await authService.register(username,email,password)

        res.cookie("refreshToken",refreshToken,{
                httpOnly:true,
                sameSite:"strict",
                maxAge: 7 * 24 * 60 * 60 * 1000
        })

        const safeUser = sanitizeUser(newUser)
        res.status(StatusCodes.CREATED).json({
            success:true,
            message:"User Created Successfully",
            data:safeUser,
            token:accessToken
        })
    } catch (error) {
        next(error)
    }
}

export const loginUser = async (req:Request,res:Response,next:NextFunction) => {
    try {
        const {email,password} = req.body as UserType
        const {safeUser,accessToken,refreshToken} = await authService.login(email,password)
        res.cookie("refreshToken",refreshToken,{
            httpOnly:true,
            sameSite:"strict",
            maxAge: 7 * 24 * 60 * 60 * 1000
        })
        res.status(200).json({
            success:true,
            message:"Login Success",
            data:safeUser,
            token:accessToken
        })
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

export const refresh = async(req:Request,res:Response,next:NextFunction)=>{
    try {
        const refreshToken = req.cookies.refreshToken
        const {newAccessToken,newRefreshToken} = await authService.refresh(refreshToken)

        res.cookie('refreshToken',newRefreshToken,{
            httpOnly:true,
            sameSite:'strict',
            maxAge: 7 * 24 * 60 * 60 * 1000
        })

        res.status(StatusCodes.OK).json({
            success:true,
            message:"token refreshed",
            token:newAccessToken
        })

    } catch (error) {
        throw error;
    }
}
