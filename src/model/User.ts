import {Schema,Document,model} from "mongoose";
import argon2 from 'argon2'


export interface IUser extends Document {
    username:string,
    password:string,
    email:string,
    createdAt?:Date
    comparePassword(password:string):Promise<boolean>;
}


const userSchema = new Schema<IUser>({
    username:{
        type:String,
        required:true,
        unique:true,
        trim:true,
        minlength:3,
    },
    password:{
        type:String,
        required:true,
        trim:true,
        minlength:8
    },
    email:{
        type:String,
        required:true,
        unique:true,
        trim:true,
        lowercase:true,
    },
},{timestamps:{createdAt:true,updatedAt:true}})


userSchema.pre('save',async function(next) {
    const user = this as IUser & Document
    if(user.isModified('password')){
        try {
            user.password = await argon2.hash(user.password)
        } catch (error) {
            return error instanceof Error ? next(error) : new Error("Hashing failed")
        }
    }
    next();
})

userSchema.methods.comparePassword = async function(password:string):Promise<boolean>{
    return await argon2.verify(this.password,password)
}

userSchema.index({username:"text"})

export const User = model<IUser & Document>("User",userSchema);

