import mongoose from "mongoose";
import bcrypt from "bcrypt"
export interface UserInput{
    email:string,
    name:string,
    password:string
}
export interface UserDocument extends UserInput,mongoose.Document{
    createdAt:Date
    updatedAt:Date
    comparePassword(candidatePassword:string):Promise<Boolean>

}

const userSchema=new mongoose.Schema({
    email:{type:String,required:true,unique:true},
    name:{type:String ,required:true},
    password:{type:String,required:true}

},{
    timestamps:true
})
userSchema.pre("save",async function(next){
    let user=this as  UserDocument;
    if(!user.isModified("password")){
        return next()
    }
  const hashedPassword=await bcrypt.hash(user.password,10)
  user.password=hashedPassword
  next()
  
  
})
userSchema.methods.comparePassword=async  function(candidatePassword:string){
const user=this as UserDocument
return bcrypt.compare(candidatePassword,user.password).catch((e)=>false)


}
const UserModel=mongoose.model<UserDocument>("users",userSchema)
export default UserModel;