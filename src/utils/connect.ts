import mongoose  from "mongoose"
import config from "config"

 export const connect=async()=>{
const dbUri=config.get<string>("dbUri")
await mongoose.connect(dbUri)
console.log("connected to db")

}