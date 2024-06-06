import { omit } from "lodash";
import UserModel, { UserInput } from "../models/user.model";

export async function createUser(input:UserInput){
    try{
    const user=await UserModel.create(input);
    console.log(user)
    return omit(user.toJSON(),"password")

    }
     catch(err){
        throw new Error("failed to register")
     }
}
