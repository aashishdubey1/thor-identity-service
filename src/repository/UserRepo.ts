import { IUser, User } from "../model/User";
import { UserType } from "../schemas/user";
import logger from "../utils/logger";
import { IUserRepository } from "./userRepo-interface";

export class UserRepo implements IUserRepository{
    async createUser(user: UserType):Promise<IUser> {
        try {
            return await User.create(user);
        } catch (error) {
            logger.error("DB Create Error",error)
            throw error;
        }
    }

    async updateUser(id: string,user: Partial<UserType>) :Promise<IUser | null> {
        try {
            return await User.findByIdAndUpdate(id,user);
        } catch (error) {
            logger.error("DB Update Error",error)
            throw error
        }
    }

    async deleteUser(id: string):Promise<IUser|null> {
        try {
            return await User.findByIdAndDelete(id);
        } catch (error) {
            logger.error("DB Delete Error",error);
            throw error
        }
    }
    async findByEmailAndUsername(email:string,username:string){
        try {
            return await User.findOne({$or:[{email},{username}]})
        } catch (error) {
            logger.error("DB Can't Find User",error)
            throw error
        }
    }

    async findByEmail(email:string){
        try {
            return await User.find({email})
        } catch (error) {
            logger.error("Cant find user by Email",error)
            throw error;
        }
    }

}

