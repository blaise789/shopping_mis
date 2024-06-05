import mongoose  from "mongoose"
import config from "config"
import log from "./logger"


 export const connect=async()=>{
    try{
    const dbUri=config.get<string>("dbUri")
    await mongoose.connect(dbUri)
    log.info("Connected to db")
    }
    catch(err){
        log.error("Could not connect to db")
        process.exit(1)
    }
    
}