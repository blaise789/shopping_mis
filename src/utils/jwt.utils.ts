import config from "config"
import jwt from "jsonwebtoken"
import { object } from "zod"
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