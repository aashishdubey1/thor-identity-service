import { error, log } from "console"
import { DBError } from "../errors/Db-error"
import { IUserRepository } from "../repository/userRepo-interface"
import { UserType } from "../schemas/user"
import logger from "../utils/logger"

export class UserService{
    repository: IUserRepository
    constructor(repository:IUserRepository){
        this.repository = repository 
    }

    async createUser(user:UserType){
        try {
            const createdUser = await this.repository.createUser(user)
            logger.info("User created successfully");
            return createdUser
        } catch (error) {
            logger.error("Failed to create User",error)
            throw new DBError("Failed to Create User")
        }
    }
    async updateUser(id:string,user:UserType){
        try {
            const updatedUser = await this.repository.updateUser(id,user)
            if (!updatedUser) {
                throw new DBError("User not found during update");
            }
            logger.info(`User with ID ${id} updated`);
            return updatedUser
        } catch (error) {
            logger.error(`Failed to update user with ID ${id}`, error);
            throw new DBError("Failed to update user");
        }

    }
    async deleteUser(id:string){
        try {
            const deletedUser = await this.repository.deleteUser(id)
            if (!deletedUser) {
                throw new DBError("User not found during delete");
            }
            logger.info(`User with ID ${id} Deleted`);
            return deletedUser
        } catch (error) {
            logger.error(`Failed to update user with ID ${id}`, error);
            throw new DBError("Failed to Delete User")
        }
    }
}