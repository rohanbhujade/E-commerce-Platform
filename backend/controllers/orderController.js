import orderModel from "../models/orderModel.js"
import userModel from '../models/userModel.js'
import Stripe from 'stripe'
//Global variables
const currency="inr"
const deliveryCharge=10
//Gateway Initializze
const stripe=new Stripe(process.env.STRIPE_SECRET_KEY)
//Placing orders using COD Methods
const placeorder=async(req,res)=>{
try {
    const {userid,items,amount,address}=req.body
    const orderdata={
        userid,
        items,amount,address,
        paymentmethod:"COD",
        payment:false,
        date:Date.now()
    }
    const neworder=new orderModel(orderdata)
    await neworder.save()
    await userModel.findByIdAndUpdate(userid,{cartdata:{}})
    res.json({success:true,message:"Order Placed"})
} catch (error) {
    console.log(error);
    res.json({success:false,message:error.message})
}
}

//Placing orders using strip Method
const placeorderstripe=async(req,res)=>{
    try {
        const {userid,items,amount,address}=req.body
        const {origin}=req.headers
         const orderdata={
        userid,
        items,amount,address,
        paymentmethod:"Stripe",
        payment:false,
        date:Date.now()
    }
    const neworder=new orderModel(orderdata)
    await neworder.save() 
    const line_items=items.map((item)=>({
        price_data:{
            currency:currency,
            product_data:{
                name:item.name,
            },
            unit_amount:item.price*100
        },
        quantity:item.quantity
    }))
     line_items.push({
         price_data:{
            currency:currency,
            product_data:{
                name:'Delivery Charges',
            },
            unit_amount:deliveryCharge*100
        },
        quantity:1
     })
     const session=await stripe.checkout.sessions.create({
        success_url:`${origin}/verify?success=true&orderid=${neworder._id}`,
        cancel_url:`${origin}/verify?success=false&orderid=${neworder._id}`,
        line_items,
        mode:'payment'
     })
     res.json({success:true,session_url:session.url})
    } catch (error) {
        console.log(error);
        res.json({success:false,message:error.message})
    }
}
//verify stripe
const verifystripe=async(req,res)=>{
    const{orderid,success,userid}=req.body
    try {
        if(success==='true'){
            await orderModel.findByIdAndUpdate(orderid,{payment:true})
            await userModel.findByIdAndUpdate(userid,{cartdata:{}})
            res.json({success:true})
        }
        else{
            await orderModel.findByIdAndDelete(orderid)
            res.json({success:false})
        }
    } catch (error) {
        console.log(error);
        res.json({success:false,message:error.message})
    }
}
//Placing orders using razor Method
const placeorderrazorpay=async(req,res)=>{
    try {

    } catch (error) {
        
    }
}
//All orders data for admin panel
const allorders=async(req,res)=>{
    try {
        const orders=await orderModel.find({})
        res.json({success:true,orders})
    } catch (error) {
        console.log(error);
        res.json({success:false,message:error.message})
    }

}
//user orders
const userorders=async(req,res)=>{
    try {
        const {userid}=req.body
        const orders=await orderModel.find({userid})
        res.json({success:true,orders})
    } catch (error) {
        console.log(error);
        res.json({success:false,message:error.message})
    }

}
// update order status for admin panel
const updatestatus=async(req,res)=>{
    try {
        const {orderid,status}=req.body
        await orderModel.findByIdAndUpdate(orderid,{status})
        res.json({success:true,message:"Status updated"})
    } catch (error) {
        console.log(error);
        res.json({success:false,message:error.message})
    }

}
export {placeorder,placeorderrazorpay,placeorderstripe,userorders,verifystripe,allorders,updatestatus}