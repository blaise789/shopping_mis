import { TypeOf, object, string } from "zod";

export const createUserSchema=object(
{
body:object({
    name:string({
        required_error:"name is required"

    }),
    password:string({
        required_error:"password is required"
    }).min(6,"password too showrt  - should be 6 chars minimum"),
    passwordConfirmation:string({
        required_error:"passwordConfirmation is required"
    }),
    email:string({
        required_error:"Email is required"
    }).email("Not a valid email"),

}
).refine((data)=>data.password===data.passwordConfirmation,{
    message:"password not match",
    path:["passwordConfirmation"]
})
}   
 

)
export type CreateUserInput = Omit<
  TypeOf<typeof createUserSchema>,
  "body.passwordConfirmation"
>;
