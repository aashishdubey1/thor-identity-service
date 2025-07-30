import RefreshToken from "../model/RefreshToken";
import logger from "../utils/logger";


export class TokenRepo {


    async saveToken (userId:string,token:string){
        try {
            const expiresAt = new Date(Date.now() + 7 * 24 * 60 * 60 * 1000);
            return await RefreshToken.create({user:userId,token,expiresAt})
        } catch (error) {
            logger.error("DB Error Creating Refreas Token")            
            throw error
        }
    }

    async findToken(token:string){
        try {
            return await RefreshToken.findOne({token})
        } catch (error) {
            logger.error("DB Error Finding Refreas Token")            
            throw error
        }
    } 
    async removeToken(token:string)  {
        try {
            return await RefreshToken.deleteOne({token})
        } catch (error) {
            logger.error("DB Error Deleting Refreas Token")            
            throw error
        }
    }
    async findTokenByUserId(userId:string){
        try {
        return await RefreshToken.findOne({ user: userId });
        } catch (error) {
        throw new Error('Error finding refresh token by user: ' + error);
        }
    }
}