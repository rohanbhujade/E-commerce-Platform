import express from 'express'
import { addtocart,getusercart,updatecart } from '../controllers/cartController.js'
import authuser from '../middleware/Auth.js'
const cartrouter=express.Router()
cartrouter.post('/get',authuser,getusercart)
cartrouter.post('/add',authuser,addtocart)
cartrouter.post('/update',authuser,updatecart)
export default cartrouter