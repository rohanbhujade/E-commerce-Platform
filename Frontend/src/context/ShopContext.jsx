import { createContext,useState,useEffect } from "react";

import { toast } from "react-toastify";
import {useNavigate} from 'react-router-dom'
import axios from 'axios'
 export const ShopContext=createContext();
 const ShopContextProvider=(props)=>{
    const currency='$'
    const delivery_fee=10
    const backendurl=import.meta.env.VITE_BACKEND_URL
    const [search, setsearch] = useState('')
    const [showSearch, setshowSearch] = useState(false)
    const [cartitems, setcartitems] = useState({})
    const [products, setproducts] = useState([])
    const [token,settoken]=useState('')
    const navigate=useNavigate()
    const addtocart=async(itemid,size)=>{
        let cartdata=structuredClone(cartitems)
        if(!size){
            toast.error("Select product size")
            return
        }
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
        setcartitems(cartdata)
        if(token){
        try {
            await axios.post(backendurl+'/api/cart/add',{itemid,size},{headers:{token}})
        } catch (error) {
            console.log(error);
            toast.error(error.message)
        }
    }
    }
    
    const getcartcount=()=>{
        let totalcount=0
        for (const items in cartitems) {
           for(const item in cartitems[items]){
            try {
                if(cartitems[items][item]>0){
                    totalcount+=cartitems[items][item]
                }
            } catch (error) {      
            }
           }
        }
        return totalcount;
    }
    const updatequantity=async(itemid,size,quantity)=>{
        let cartdata=structuredClone(cartitems)
        cartdata[itemid][size]=quantity
        setcartitems(cartdata)
        if(token){
            try {
                await axios.post(backendurl+'/api/cart/update',{itemid,size,quantity},{headers:{token}})

            } catch (error) {
                console.log(error);
                toast.error(error.message)
            }
        }
    }
    const getcartamount=()=>{
        let totalamount=0
        for(const items in cartitems){
            let iteminfo=products.find((product)=>product._id===items)
            for(const item in cartitems[items]){
               try {
                if(cartitems[items][item]>0){
                    totalamount+=iteminfo.price*cartitems[items][item]
                }
            } catch (error) {
                
               } 
            }
        }
        return totalamount 
    }
    const getproductsdata=async()=>{
        try {
            let response=await axios.get(backendurl+'/api/product/list')
            if(response.data.success){
                setproducts(response.data.products)
            }
            else{
                toast.error(response.data.message)
            }
            
        } catch (error) {
            console.log(error);
            toast.error(error.message)
        }
    }
    const getusercart=async(token)=>{
        try {
            const response=await axios.post(backendurl+'/api/cart/get',{},{headers:{token}})
            if(response.data.success){
                setcartitems(response.data.cartdata)
            }
        } catch (error) {
            console.log(error);
            toast.error(error.message)
        }
    }
    useEffect(() => {
      getproductsdata()
    }, [])
    useEffect(() => {
      if(!token && localStorage.getItem('token')){
        settoken(localStorage.getItem('token'))
        getusercart(localStorage.getItem('token'))
      }
    }, [])
    
    const value={
        products,
        currency,delivery_fee,search,setsearch,showSearch,setshowSearch,cartitems,setcartitems,addtocart,getcartcount,updatequantity,getcartamount,navigate,backendurl,token,settoken
    }
    return(
        <ShopContext.Provider value={value}>
            {props.children}
        </ShopContext.Provider>
    )
 }
 export default ShopContextProvider