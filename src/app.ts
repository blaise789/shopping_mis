import express from "express"
import config  from "config"
const app=express()
const port =config.get<number>("port")


app.listen(port,()=>{console.log(`the server is running on port  ${port}`)})