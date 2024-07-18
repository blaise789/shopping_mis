import mongoose from "mongoose";
// import bcrypt from "bcrypt"
import { UserDocument } from "./user.model";

export interface SchemaDocument extends mongoose.Document{
    user:UserDocument["_id"]
    valid:boolean
    userAgent:string
    createdAt:Date
    updatedAt:Date
}

const sessionSchema=new mongoose.Schema({
    user:{type:mongoose.Types.ObjectId,ref:'User'},
    valid:{type:Boolean,default:true},
    userAgent:{type:String}

},{
    timestamps:true
})

// sessionSchema.methods.comparePassword=async  function(candidatePassword:string){
// const 
// return bcrypt.compare(candidatePassword,user.password).catch((e)=>false)


// }
const SessionModel=mongoose.model<SchemaDocument>("sessions",sessionSchema)
export default SessionModel;