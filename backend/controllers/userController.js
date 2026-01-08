import userModel from '../models/userModel.js'
import validator from 'validator'
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'
const createtoken=(id)=>{
    return jwt.sign({id},process.env.JWT_SECRET)
}
//Route for user login
const loginuser=async(req,res)=>{
    try {
        const {email,password}=req.body
        const user=await userModel.findOne({email})
        if(!user){
            return res.json({success:false,message:"user does not exist"})
        }
        const ismatch=await bcrypt.compare(password,user.password)
        if(ismatch){
            const token=createtoken(user._id)
            res.json({success:true,token})
        }
        else{
            res.json({success:false,message:"Invalid credentials"})
        }
    } catch (error) {
        console.log(error);
        res.json({success:false ,message:error.message})  
    }
}
//route for user register
const registeruser=async(req,res)=>{
    try {
        const {name,email,password}=req.body;
        //Checking user already exists
        const exists=await userModel.findOne({email})
        if(exists){
           return res.json({success:false,message:"User already exists"})
        }
        //validating email format & strong format
        if(!validator.isEmail(email)){
            return res.json({success:false,message:"Please enter a valid email"})
        }
        if(password.length<8){
            return res.json({success:false,message:"Please enter a strong password"})
        }
        //Hashing user password
        const salt=await bcrypt.genSalt(10)
        const hashedpassword=await bcrypt.hash(password,salt)
        
        const newuser= new userModel({
            name,
            email,
            password:hashedpassword
        })
        const user= await newuser.save()
        const token=createtoken(user._id)
        res.json({success:true,token})
    } catch (error) {
          console.log(error);
          res.json({success:false,message:error.message})
    }
}
//Route for admin login
const adminlogin=async(req,res)=>{
    try {
        const {email,password}=req.body
        if(email===process.env.ADMIN_EMAIL && password===process.env.ADMIN_PASSWORD){
            const token=jwt.sign(email+password,process.env.JWT_SECRET)
            res.json({success:true,token})
        }
        else{
            res.json({success:false,message:"invalid credentials"})
        }
    } catch (error) {
        res.json({success:false ,message:error.message})
    }

}

export {loginuser,registeruser, adminlogin}