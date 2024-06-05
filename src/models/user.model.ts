import mongoose from "mongoose";
export interface UserInput{
    email:string,
    name:string,
    password:string
}
export interface UserDocument extends UserInput,mongoose.Document{
    createdDate:Date
    updatedDate:Date
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
})
userSchema.methods.comparePassword=async ():Promise<Boolean>{


}
