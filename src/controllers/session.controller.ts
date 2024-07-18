import { Request,Response } from "express";
import { validatePassword } from "./user.controller";
import { createSession } from "../services/session.service";
import { signJwt } from "../utils/jwt.utils";
import config from "config"
export async function createUserSessionHandler(req:Request,res:Response){

    // validate the user's password
    const user=  await validatePassword(req.body)   
    console.log(user)
    if(!user){
        return res.status(401).send("Invalid email or password")
    } 
    console.log(user)
    // create a session
    const session =await createSession(user.id,req.get("user-agent") || "")
    // create an access token
    
    const accessToken=signJwt(
        { ...user,session: session._id},{
         expiresIn:config.get("accessTokenTtl")
        } )
  const refreshToken=signJwt({...user,session},{expiresIn:config.get("refreshTokenTtl")})
return res.send({accessToken,refreshToken})
//    create a refresh token



}