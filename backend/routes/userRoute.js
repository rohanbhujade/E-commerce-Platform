import express from 'express'
import { loginuser,registeruser,adminlogin } from '../controllers/userController.js'

const userRouter=express.Router()
userRouter.post('/register',registeruser)
userRouter.post('/login',loginuser)
userRouter.post('/admin',adminlogin)
export default userRouter

