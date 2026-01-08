import express from 'express'
import cors from 'cors'
import 'dotenv/config'
import connectDB from './config/mongodb.js'
import connectCloudinary from './config/cloudinary.js'
import userRouter from './routes/userRoute.js'
import productrouter from './routes/productroute.js'
import cartrouter from './routes/cartroute.js'
import orderrouter from './routes/orderroute.js'

//APP config
const app=express()
const port=process.env.PORT || 4000
connectDB()
connectCloudinary()
//Middlewares
app.use(express.json())
app.use(cors())
//API endpoints
app.use('/api/user',userRouter)
app.use('/api/product',productrouter)
app.use('/api/cart',cartrouter)
app.use('/api/order',orderrouter)
app.get('/',(req,res)=>{
    res.send("API working")
})
app.listen(port,()=>{
    console.log("Server Started on PORT " + port);
})