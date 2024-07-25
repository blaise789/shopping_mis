import { FilterQuery, QueryOptions, UpdateQuery } from "mongoose";
import ProductModel, { CreateProductInput, ProductDocument } from "../models/product.model";


//  Omit<> generic
export async function createProduct(input:CreateProductInput){
return ProductModel.create(input)
}
export async function findProduct(query:FilterQuery<ProductDocument>,options:QueryOptions={lean:true}){
 return ProductModel.findOne(query,{},options)

}

export async function updateProduct(query:FilterQuery<ProductDocument>,update:UpdateQuery<ProductDocument>,options:QueryOptions){
return  ProductModel.findOneAndUpdate(query,update,options)
}
export async function deleteProduct(query:FilterQuery<ProductDocument>){

    return ProductModel.deleteOne(query)
}
