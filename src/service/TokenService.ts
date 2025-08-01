import jwt, { JwtPayload } from 'jsonwebtoken'
import argon2 from 'argon2'
import serverConfig from '../config/server-config'
import { TokenRepo } from '../repository/TokenRepo'
import logger from '../utils/logger'
import { DBError } from '../errors/Db-error'
import { NotFoundError } from '../errors/NotFound-error'
import crypto from 'crypto'

const tokenRepo = new TokenRepo()

export class TokenService {   
    createAccessToken(payload:object){
        return jwt.sign(payload,serverConfig.ACCESS_SECRET!,{expiresIn:'30m'})
    }

    createRefreshToken(payload:object){
        return jwt.sign(payload,serverConfig.REFRESH_SECRET!,{expiresIn:'7d'})
    }

    verifyAcessToken(token:string){
        return jwt.verify(token,serverConfig.ACCESS_SECRET!)
    }

    async verifyRefreshToken(token:string){
        return jwt.verify(token,serverConfig.REFRESH_SECRET!)
    }

    async saveRefreshToken(userId:string,token:string){
        try {
            const hashed = await argon2.hash(token)
            const newToken = await tokenRepo.saveToken(userId,hashed)
            if(!newToken){
                logger.error("DB Error Can't create token")
                throw new DBError("Unable to create token")
            }
        } catch (error) {
            logger.error("Token save failed: " + error);
            throw error 
        }
    }

    async findRefreshTokenByUserId(userId:string){
        try {
            const existingToken = await tokenRepo.findTokenByUserId(userId)
            if(!existingToken){
                logger.error("Not found refresh token")
                throw new NotFoundError("Can't find refresh token ")
            }
            return existingToken
        } catch (error) {
             logger.error("find Token failed: " + error);
            throw error
        }
    }

    async removeRefreshToken(userId:string){
        try {
            const deletedToken = await tokenRepo.removeToken(userId)
            if (!deletedToken){
                logger.error("DB Error can't find token")
                throw new DBError("Can't find token ")
            }
            return deletedToken
        } catch (error) {
            logger.error("Remove Token failed: " + error);
            throw error
        }
    }
}