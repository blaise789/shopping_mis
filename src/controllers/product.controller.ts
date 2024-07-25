import { Request,Response } from "express";
import { createProduct, deleteProduct, findProduct, updateProduct } from "../services/product.service";
import { createProductInput, deleteProductInput, findProductInput, updateProductInput } from "../schemas/product.schema";


export async function findProductHandler(req:Request<findProductInput["params"]>,res:Response){
 
   const productId=req.params.productId

   const product=await findProduct({productId})
   
    if(!product){
       return  res.status(404).json({"error":"product not found"})
    }
  return res.json(product)
   
    
}
export async function createProductHandler(req:Request<{},{},createProductInput["body"]>,res:Response){
   try{
    const userId=res.locals.user._id
    const body=req.body
    const product=await createProduct({...body,user:userId })
    res.json(product)
   } 
   catch(err){
    res.status(500).json({"error":"internal server error"})
   }


}
export async function deleteProductHandler(req:Request<deleteProductInput["params"]>,res:Response){
    const userId=res.locals.user._id
    const productId=req.params.productId
    const productToDelete=await findProduct({productId})
    if(!productId){
        return res.status(404).json({"error":"not found"})
    }
    if (productToDelete?.user!=userId){
        return res.status(403)
    }
    await deleteProduct({productId})
    return res.json({"message":"product deleted successfully"})
    
}
export async function updateProductHandler(req:Request<updateProductInput["params"],{},createProductInput["body"]>,res:Response){
    try{
        const userId=res.locals.user._id
        const productId=req.params.productId
        const update=req.body
        const product=await findProduct({productId})
        if(!product){
            return res.status(404).json({"error":" product not found"})
        }
        if(product.user !=userId){
            return res.sendStatus(403)
        }
        
        const updatedProduct=await updateProduct({productId},update,{new:true})
        return res.send(updatedProduct)
    }
    catch(err:any){
       return res.status(500).json({"error":err.message})
    }

}