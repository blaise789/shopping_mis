import { Request,Response } from "express";
import { createProduct, deleteProduct, findProduct, updateProduct } from "../services/product.service";
import { createProductInput, deleteProductInput, findProductInput, updateProductInput } from "../schemas/product.schema";


export async function findProductHandler(req:Request<findProductInput["params"]>,res:Response){
 
   const productId=res.locals.user._id
   const product=await findProduct({productId})
    if(!product){
        res.sendStatus(404).json({"error":"product not found"})
    }
  return res.send(product)
   
    
}
export async function createProductHandler(req:Request<{},{},createProductInput["body"]>,res:Response){
    const userId=res.locals.user._id
    const body=req.body
    const product=await createProduct({...body,user:userId })
    res.send(product)


}
export async function deleteProductHandler(req:Request<deleteProductInput["params"]>,res:Response){
    const userId=res.locals.user._id
    const productId=req.params.productId
    const productToDelete=await findProduct({productId})
    if(!productId){
        return res.sendStatus(404).json({"error":"not found"})
    }
    if (productToDelete?.user!=userId){
        return res.sendStatus(403)
    }
    await deleteProduct({productId})
    return res.json({"message":"product deleted successfully"})
    
}
export async function updateProductHandler(req:Request<updateProductInput["params"],{},createProductInput["body"]>,res:Response){
const userId=res.locals.user._id
const productId=req.params.productId
const update=req.body
const product=await findProduct({productId})
if(!product){
    return res.sendStatus(404).json({"error":" product not found"})
}
if(product.user !=userId){
    return res.sendStatus(403)
}

const updatedProduct=await updateProduct({productId},update,{new:true})
return res.send(updatedProduct)
}