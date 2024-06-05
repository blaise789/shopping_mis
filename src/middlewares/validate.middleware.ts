import { AnyZodObject } from "zod";
import { NextFunction, Request, Response, query } from "express";

const validate=async (schema:AnyZodObject)=>{
    (req:Request,res:Response,next:NextFunction)=>{
        try{
            schema.parse({
                body:req.body,
                query:req.query,
                params:req.params
            });
            next();
        }
        catch(e:any){
            return res.status(400).send(e.errors)
        }
    }

}
export default validate;