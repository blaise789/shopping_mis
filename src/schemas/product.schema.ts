import { number, object, string, TypeOf } from "zod";

// request payload
const payload={
    body:object({
        title:string({
            required_error:"Title is required"

        }),
        description:string({
    required_error:"description is required"
        }),
        price:number({
            required_error:"price is required"
            
        }),
        

    })
}
const params={
    params:object({
        productId:string({
            required_error:"productId is requried "
        })
    })
}
export const createProductSchema=object({
    ...payload
})
export const updateProductSchema=object({
    ...payload,...params
})
export const deleteProductSchema=object({
    ...params
})
export const findProductSchema=object({
    ...params
})
export type createProductInput=TypeOf<typeof createProductSchema>
export type updateProductInput=TypeOf<typeof updateProductSchema>
export type deleteProductInput=TypeOf<typeof deleteProductSchema>
export type findProductInput=TypeOf<typeof findProductSchema>
