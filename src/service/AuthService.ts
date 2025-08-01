import { ConflictError } from "../errors/ConflictsError";
import { IUserRepository } from "../repository/userRepo-interface";
import { TokenService } from "./TokenService";
import logger from "../utils/logger";
import { UserType } from "../schemas/user";
import { BadRequestError } from "../errors/BadRequest-error";
import { NotFoundError } from "../errors/NotFound-error";
import { IUser } from "../model/User";
import { sanitizeUser } from "../utils/sanitizeUser";
import { AuthenticationError } from "../errors/Authentication-error";
import argon2 from 'argon2'
import { UnauthorizedError } from "../errors/Unauthorized-error";

const tokenService = new TokenService()


export class AuthService {
    repository:IUserRepository

    constructor(repository:IUserRepository){
        this.repository = repository
    }

    async register (username:string,email:string,password:string):Promise<{
        newUser:Omit<UserType,'password'>,
        accessToken:string,
        refreshToken:string,
    }> {
        try {
            const existingUser = await this.repository.findByEmailAndUsername(email,username)

            if(existingUser) {
                logger.warn("User Already Exist")
                throw new ConflictError("User Already Exist")
            }

            const newUser = await this.repository.createUser({username,email,password})
            logger.info(`New user created: ${newUser._id}`)

            const accessToken = tokenService.createAccessToken({userId:newUser._id})
            const refreshToken = tokenService.createRefreshToken({userId:newUser._id})
            await tokenService.saveRefreshToken(newUser._id,refreshToken)

            return {newUser,accessToken,refreshToken}
        } catch (error) {
            throw error
        }
    }

    async login(email:string,password:string):Promise<{
        safeUser:object,
        accessToken:string,
        refreshToken:string,
    }>{
        try {
            const existingUser = await this.repository.findByEmail(email) as IUser
            if(!existingUser) throw new NotFoundError("User");

            const correctPass = await existingUser.comparePassword(password)
            if(!correctPass) throw new BadRequestError("Password is incorrect");

            const accessToken = tokenService.createAccessToken({userId:existingUser._id})
            const refreshToken = tokenService.createRefreshToken({userId:existingUser._id})
            await tokenService.saveRefreshToken(existingUser._id as string,refreshToken)

            const safeUser = sanitizeUser(existingUser);

            return {safeUser,accessToken,refreshToken}

        } catch (error) {
             logger.warn("Login error", error);
             throw error;
        }
    }

    async logout(refreshToken: string) {
        await tokenService.removeRefreshToken(refreshToken);
        return { message: "Logged out successfully" };
    }

    async refresh(refreshToken:string){
        let decoded:any
        try {
            decoded = await tokenService.verifyRefreshToken(refreshToken)
        } catch (error) {
            logger.warn('Refresh token verifation failed')
            throw new AuthenticationError("Invalid or expired refresh token")
        }
        
        const tokenRecord  = await tokenService.findRefreshTokenByUserId(decoded.userId)

        console.log(tokenRecord,'tokenrecord')

        const isValid = await argon2.verify(tokenRecord.token,refreshToken)

        if(!isValid){
            throw new UnauthorizedError("Refresh token mismatch")
        }

        const newAccessToken = tokenService.createAccessToken({userId:decoded.userId})
        const newRefreshToken = tokenService.createRefreshToken({userId:decoded.userId});

        await tokenService.saveRefreshToken(decoded.userId,newRefreshToken);
        await tokenService.removeRefreshToken(tokenRecord.token)

        return {newAccessToken,newRefreshToken}
    }

}