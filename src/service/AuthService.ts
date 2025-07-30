import { ConflictError } from "../errors/ConflictsError";
import { IUserRepository } from "../repository/userRepo-interface";
import { TokenService } from "./TokenService";
import logger from "../utils/logger";
import { UserType } from "../schemas/user";

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

            const accessToken = tokenService.createAccessToken({newUser:newUser._id})
            const refreshToken = tokenService.createRefreshToken({newUser:newUser._id})
            await tokenService.saveRefreshToken(newUser._id,refreshToken)

            return {newUser,accessToken,refreshToken}
        } catch (error) {
            throw error
        }
    }
}