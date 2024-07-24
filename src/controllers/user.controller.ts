import { Request,Response } from "express";
import { CreateUserInput} from "../schemas/user.schema";
import { createUser } from "../services/user.service";
import log from "../utils/logger";
import { omit } from "lodash";
import UserModel from "../models/user.model";
export const createUserHandler=async (req:Request<{}, {}, CreateUserInput["body"]>,res:Response)=>{
    try{
        console.log(req.body)
        const user=await createUser(req.body)
        return res.json(user).status(201)
    }
    catch(err:any){
        log.error(err.message)
       return res.status(409).json({error:err.message})

    }

}
export async function validatePassword({email,password}:{email:string,password:string}){
    
        const user=await UserModel.findOne({email})
        if(!user){
            return false
        }
        const isValid= user.comparePassword(password)
        if(!isValid) return false
        return omit(user.toJSON(),'password')

}