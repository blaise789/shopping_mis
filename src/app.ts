import express from "express"
import config  from "config"
import { connect } from "./utils/connect"
import log from "./utils/logger"
import authRoutes from "./routes/auth.routes"
import deserializeUser from "./middlewares/deserializeUser"
import productRoutes from "./routes/product.routes"
const app=express()
const port =config.get<number>("port")
app.use(express.json())
app.use(deserializeUser)
app.use("/v1/api/auth",authRoutes)
app.use("/v1/api/products",productRoutes)

app.listen(port,async ()=>{
    log.info(`the server is running on port  ${port}`)
    await connect()
}
)
    