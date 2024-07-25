import mongoose from "mongoose";
import { UserDocument } from "./user.model";
import { customAlphabet } from "nanoid";

export interface ProductDocument extends mongoose.Document{
    user:UserDocument["_id"]
    title:string,
    description:string
    price: number
    image:string
    createdAt:Date
    updatedAt:Date


}
export interface CreateProductInput{
    user:UserDocument["_id"]
    title:string,
    description:string
    price: number
    image:string

}
const nanoid=customAlphabet("abcdefghijklmnopqrstuvwxyz123456789")
const productSchema=new mongoose.Schema({
    productId:{type:String,required:true,unique:true,default:`product_${nanoid()}`},
    user:{type:mongoose.Schema.Types.ObjectId,ref:"User"},
    title:{type:String,required:true},
    description:{type:String,required:true},
    price:{type:Number,required:true},
    image:{type:String,required:true}


},{
timestamps:true
})
const ProductModel=mongoose.model<ProductDocument>("products", productSchema)
export default ProductModel
