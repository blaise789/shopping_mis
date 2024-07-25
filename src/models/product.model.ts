import mongoose from "mongoose";
import { UserDocument } from "./user.model";

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

}
// const nanoid=customAlphabet("abcdefghijklmnopqrstuvwxyz123456789")
const productSchema=new mongoose.Schema({
    productId:{type:String,required:true,unique:true,default:`product_abcdefghijklmnopqrstuvwxyz123456789`},
    user:{type:mongoose.Schema.Types.ObjectId,ref:"User"},
    title:{type:String,required:true},
    description:{type:String,required:true},
    price:{type:Number,required:true},
    image:{type:String,}


},{
timestamps:true
})
const ProductModel=mongoose.model<ProductDocument>("products", productSchema)
export default ProductModel
