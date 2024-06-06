import { AnyZodObject } from "zod";
import { NextFunction, Request, Response, query } from "express";

export const validateResource= (schema:AnyZodObject)=>
    (req:Request,res:Response,next:NextFunction)=>{
        try{
            console.log(req.body)

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


export default validateResource;