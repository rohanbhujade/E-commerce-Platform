import React,{useContext, useState} from 'react'
import Title from '../components/Title'
import Carttotal from '../components/Carttotal'
import { assets } from '../assets/assets'
import { ShopContext } from '../context/ShopContext'
import axios from 'axios'
const Placeorder = () => {
  const [method, setmethod] = useState('cod')
  const {navigate,backendurl,token,cartitems,getcartamount,delivery_fee,products,setcartitems}=useContext(ShopContext)

  const [formdata, setformdata] = useState({
    firstname:'',
    lastname:'',
    email:'',
    street:'',
    city:'',
    state:'',
    zipcode:'',
    country:'',
    phone:''
  })
  const onchangehandler=(e)=>{
    const name=e.target.name
    const value=e.target.value
    setformdata(data=>({...data,[name]:value}))

  }
  const onsubmithandler=async(e)=>{
    e.preventDefault();
    try {
      let orderitems=[]
      for(const items in cartitems){
        for(const item in cartitems[items]){
          if(cartitems[items][item]){
            const iteminfo=structuredClone(products.find(product=>product._id===items))
            if(iteminfo){
              iteminfo.size=item
              iteminfo.quantity=cartitems[items][item]
              orderitems.push(iteminfo)
            }
          }
        }
      }
      let orderdata={
        address:formdata,
        items:orderitems,
        amount:getcartamount()+delivery_fee
      }
      switch(method){
        //Api calls for COD
        case 'cod':
          const response=await axios.post(backendurl+'/api/order/place',orderdata,{headers:{token}})
          if(response.data.success){
            setcartitems({})
            navigate('/orders')
          }
          else{
            toast.error(response.data.message)
          }
          break
          case 'stripe':
            const responsestripe=await axios.post(backendurl+'/api/order/stripe',orderdata,{headers:{token}})
             if(responsestripe.data.success){
              const {session_url}=responsestripe.data
              window.location.replace(session_url)
             }
             else{
              toast.error(responsestripe.data.message)
             }
            break
        default:
          break
      }
      
    } catch (error) {
      console.log(error);
      toast.error(message.error)
    }
  }
  return (
    <form onSubmit={onsubmithandler} className='flex flex-col sm:flex-row justify-between gap-4 pt-5 sm:pt-14 min-h-[80vh] border-t border-gray-200'>
      {/* ----------------LEft Side------------------------------- */}
      <div className='flex flex-col gap-4 w-full sm:max-w-[480px]'>
        <div className='text-xl my-3 sm:text-2xl'>
          <Title text1={"DELIVERY"} text2={"INFORMATION"}/>
        </div>
        <div className=' flex gap-3'>
          <input required onChange={onchangehandler} name='firstname' value={formdata.firstname} type="text" placeholder='First name' className='border border-gray-300 rounded py-1.5 px-3.5 w-full' />
          <input required onChange={onchangehandler} name='lastname' value={formdata.lastname} type="text" placeholder='Last name' className='border border-gray-300 rounded py-1.5 px-3.5 w-full' />
        </div>
        <input required onChange={onchangehandler} name='email' value={formdata.email} type="email" placeholder='Email address' className='border border-gray-300 rounded py-1.5 px-3.5 w-full'  />
        <input required onChange={onchangehandler} name='street' value={formdata.street} type="text" placeholder='Street' className='border border-gray-300 rounded py-1.5 px-3.5 w-full' />
        <div className=' flex gap-3'>
          <input required onChange={onchangehandler} name='city' value={formdata.city} type="text" placeholder='City' className='border border-gray-300 rounded py-1.5 px-3.5 w-full' />
          <input  required onChange={onchangehandler} name='state' value={formdata.state} type="text" placeholder='State' className='border border-gray-300 rounded py-1.5 px-3.5 w-full' />
        </div>
        <div className=' flex gap-3'>
          <input required onChange={onchangehandler} name='zipcode' value={formdata.zipcode} type="number" placeholder='Zipcode' className='border border-gray-300 rounded py-1.5 px-3.5 w-full' />
          <input required onChange={onchangehandler} name='country' value={formdata.country} type="text" placeholder='Country' className='border border-gray-300 rounded py-1.5 px-3.5 w-full' />
        </div>
        <input required onChange={onchangehandler} name='phone' value={formdata.phone} type="number" placeholder='Phone' className='border border-gray-300 rounded py-1.5 px-3.5 w-full' />
      </div>
      {/* ------------------------------Right Side------------------------ */}
      <div className='mt-8'>
        <div className='mt-8 min-w-80'>
          <Carttotal/>
        </div>
        <div className='mt-12'>
          <Title text1={"PAYMENT"} text2={"METHOD"}/>
          {/* --------------Text payment method selection------------- */}
          <div className='flex gap-3 lg:flex-row flex-col '>
            <div onClick={()=>setmethod('stripe')} className='flex items-center gap-3 border p-2 px-3 cursor-pointer'>
              <p className={`min-w-3.5 h-3.5 border rounded-full ${method==='stripe'?'bg-green-400':''} `}></p>
              <img className='h-5 mx-4' src={assets.stripe_logo} alt="" />
            </div>
            {/* <div onClick={()=>setmethod('razorpay')} className='flex items-center gap-3 border p-2 px-3 cursor-pointer'>
              <p className={`min-w-3.5 h-3.5 border rounded-full ${method==='razorpay'?'bg-green-400':''}`}></p>
              <img className='h-5 mx-4' src={assets.razorpay_logo} alt="" />
            </div> */}
            <div onClick={()=>setmethod('cod')} className='flex items-center gap-3 border p-2 px-3 cursor-pointer'>
             <p className={`min-w-3.5 h-3.5 border rounded-full ${method==='cod'?'bg-green-400':''} `}></p>
             <p className='text-gray-500 text-sm font-medium mx-4'>CASH ON DELIVERY</p>
            </div>
          </div>
          <div className='w-full text-end mt-8'>
            <button type='submit' className='bg-black text-white px-16 py-3 text-sm cursor-pointer'>PLACE ORDER</button>
          </div>
        </div>
      </div>
    </form>
  )
}

export default Placeorder