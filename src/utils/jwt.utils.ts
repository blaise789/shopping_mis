import config from "config"

import jwt, { JwtPayload } from "jsonwebtoken"
import { findUser } from "../services/user.service"
import SessionModel from "../models/session.model"
import { get } from "lodash"
const privateKey=config.get<string>("privateKey")
const publicKey=config.get<string>("publicKey")
 export function signJwt(object:Object,options?:jwt.SignOptions | undefined){
    // if it becomes null it would cause some problems
    return jwt.sign(object,privateKey,{...options})
 }
export function verifyJwt(token:string){
    try{
        const decoded=jwt.verify(token,privateKey)
        return {
            valid:true,
            expired:false,
            decoded
        }

    }
    catch(err:any){
  return {
    valid:false,
    expired:err.message='jwt expired',
    decoded:null
  }
    }

}

export async function reIssueAccessToken({refreshToken}:{refreshToken:string}){
  const {decoded}=verifyJwt( refreshToken)  
  console.log(decoded)
  if(!decoded ||!get(decoded,"_id")) return false
const session=await SessionModel.findById(get(decoded,"_id"))
console.log(session)
  if(!session || !session.valid) return false
  const user=await findUser({_id:session.user})
  if(!user) return false
  const accessToken=signJwt({
      ...user,session:session._id
  },{expiresIn:config.get("accessTokenTtl")})
  return accessToken
  
}