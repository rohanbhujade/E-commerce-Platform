import userModel from "../models/userModel.js"

//Add products to user cart 
const addtocart=async(req,res)=>{
    try {
        const {userid,itemid,size}=req.body
        const userdata=await userModel.findById(userid)
        let cartdata=await userdata.cartdata;
        if(cartdata[itemid]){
            if(cartdata[itemid][size]){
                cartdata[itemid][size]+=1
            }
            else{
                cartdata[itemid][size]=1
            }
        }
        else{
            cartdata[itemid]={}
            cartdata[itemid][size]=1
        }

        await userModel.findByIdAndUpdate(userid,{cartdata})
        res.json({success:true,message:"Added to cart"})

    } catch (error) {
        console.log(error);
        res.json({success:false,message:error.message})
    }

}
//update user cart 
const updatecart=async(req,res)=>{
    try {
        const {userid,itemid,size,quantity}=req.body
        const userdata=await userModel.findById(userid)
        let cartdata=await userdata.cartdata;
        cartdata[itemid][size]=quantity
        await userModel.findByIdAndUpdate(userid,{cartdata})
        res.json({success:true,message:"Cart updated"})
    } catch (error) {
        console.log(error);
        res.json({success:false,message:error.message})
    }
}

//get user cart 
const getusercart=async(req,res)=>{
    try {
        const {userid}=req.body
        const userdata=await userModel.findById(userid)
        let cartdata=await userdata.cartdata
        res.json({success:true,cartdata})
    } catch (error) {
        console.log(error);
        res.json({success:false,message:error.message})
        
    }

}
export {addtocart,getusercart,updatecart}