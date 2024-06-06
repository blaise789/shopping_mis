import express from "express"
import config  from "config"
import { connect } from "./utils/connect"
import log from "./utils/logger"
import authRoutes from "./routes/auth.routes"
const app=express()
const port =config.get<number>("port")
app.use(express.json())
app.use("/v1/api/auth",authRoutes)


app.listen(port,async ()=>{

    log.info(`the server is running on port  ${port}`)
    await connect()

    
}
)
    