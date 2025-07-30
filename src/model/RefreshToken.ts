import { Schema,Document, model } from "mongoose";
import { IUser } from "./User";


interface IRefreshToken extends Document{ 
    token:string,
    user:IUser["_id"],
    expiresAt:Date
}

const refreshTokenSchema = new Schema<IRefreshToken>({
    token:{
        type:String,
        required:true,
        unique:true,
    },
    user:{
        type:Schema.Types.ObjectId,
        ref:"User",
        required:true,
    },
    expiresAt:{
        type:Date,
        required:true,
    }
},{timestamps:true})

refreshTokenSchema.index({expiresAt:1},{expireAfterSeconds:0})

export default  model<IRefreshToken>("RefreshToken",refreshTokenSchema)