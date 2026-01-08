import React,{useContext,useEffect} from 'react'
import { ShopContext } from '../context/ShopContext'
import { useSearchParams } from 'react-router-dom'
import axios from 'axios'
import { toast } from 'react-toastify'

const Verify = () => {
    const {navigate,token,setcartitems,backendurl}=useContext(ShopContext)
    const [searchparams, setsearchparams] = useSearchParams()
    const success=searchparams.get('success')
    const orderid=searchparams.get('orderid')
    const verifypayment=async()=>{
        try {
            if(!token){
                return null
            }
            const response=await axios.post(backendurl+'/api/order/verifystripe',{success,orderid},{headers:{token}})
            if(response.data.success){
                setcartitems({})
                navigate('/orders')
            }
            else{
                navigate('/cart')
            }
        } catch (error) {
            console.log(error);
            toast.error(error.message)
        }
    }
    useEffect(() => {
      verifypayment()
    }, [token])
    
  return (
    <div>

    </div>
  )
}

export default Verify