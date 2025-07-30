import { IUser } from "../model/User";
import { UserType } from "../schemas/user";

export interface IUserRepository {
    createUser:(user:UserType)=>Promise<any>,
    updateUser:(id:string,user:Partial<UserType>) => Promise<any>
    deleteUser:(id:string)=>Promise<any>,
    findByEmailAndUsername:(email:string,username:string)=> Promise<any>
    findByEmail:(email:string)=>Promise<any>
}