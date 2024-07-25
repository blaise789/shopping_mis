import { Request,Response } from "express";
import { CreateUserInput} from "../schemas/user.schema";
import { createUser } from "../services/user.service";
import log from "../utils/logger";
import { omit } from "lodash";
import UserModel from "../models/user.model";
export const createUserHandler=async (req:Request<{}, {}, CreateUserInput["body"]>,res:Response)=>{
    try{
        const user=await createUser(req.body)
        return res.json(user).status(201)
    }
    catch(err:any){
        log.error(err.message)
       return res.status(409).json({error:err.message})

    }

}
