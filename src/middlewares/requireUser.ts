import { NextFunction, Request,Response } from "express";

export const requireUser =async(req:Request,res:Response,next:NextFunction)=>{
    const user=res.locals.user
    console.log(user)
    if(!user?._id){
        return res.sendStatus(403)
    }
    return next()

}
export default requireUser