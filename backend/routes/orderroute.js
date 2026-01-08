import express from 'express'
import {placeorder,placeorderrazorpay,placeorderstripe,userorders,allorders,updatestatus, verifystripe} from '../controllers/orderController.js'
import adminAuth from '../middleware/adminAuth.js'
import authuser from '../middleware/Auth.js'
const orderrouter=express.Router()
//Admin Features
orderrouter.post('/list',adminAuth,allorders)
orderrouter.post('/status',adminAuth,updatestatus) 
//Payment Features
orderrouter.post('/place',authuser,placeorder)
orderrouter.post('/stripe',authuser,placeorderstripe)
orderrouter.post('/razorpay',authuser,placeorderrazorpay)
//User Features
orderrouter.post('/userorders',authuser,userorders)
//verify payment
orderrouter.post('/verifystripe',authuser,verifystripe)
export default orderrouter


