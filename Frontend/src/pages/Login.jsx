import React,{useContext,useEffect, useState} from 'react'
import { ShopContext } from '../context/ShopContext'
import axios from 'axios'
import { toast } from 'react-toastify'

const Login = () => {
  const [currentstate, setcurrentstate] = useState("Login")
  const {token,settoken,navigate,backendurl}=useContext(ShopContext)
  const [name, setname] = useState('')
  const [password, setpassword] = useState('')
  const [email, setemail] = useState('')
  const onsubmithandler=async(e)=>{
    e.preventDefault()
    try {
      if(currentstate==="Sign Up"){
        const response=await axios.post(backendurl+'/api/user/register',{name,email,password})
        if(response.data.success){
          settoken(response.data.token)
          localStorage.setItem('token',response.data.token)
        }
        else{
          toast.error(response.data.message)
        }
      }
      else{
        const response=await axios.post(backendurl+'/api/user/login',{email,password})
        if(response.data.success){
          settoken(response.data.token)
          localStorage.setItem('token',response.data.token)
           
        }
        else{
          toast.error(response.data.message)
        }
        
      }
      
    } catch (error) {
      console.log(error);
      toast.error(error)
    }
  }
  useEffect(() => {
    if(token){
      navigate('/')
    }
  }, [token])
  
  return (
    <form  onSubmit={onsubmithandler}className='flex flex-col items-center w-[90%] sm:max-w-96 m-auto mt-14 gap-4 text-gray-800'>
      <div className='inline-flex items-center gap-2 mb-2 mt-10'>
        <p className='prata-regular text-3xl'>{currentstate}</p>
        <hr className='border-none h-[1.5px] w-8 bg-gray-800'/>
      </div>
      {currentstate==="Login"?'':<input onChange={(e)=>setname(e.target.value)} value={name} type="text" className='w-full px-3 py-2 border border-gray-800' placeholder='Name' required />}
      <input type="email" onChange={(e)=>setemail(e.target.value)} value={email} className='w-full px-3 py-2 border border-gray-800' placeholder='Email'  required/>
      <input type="password" onChange={(e)=>setpassword(e.target.value)} value={password} className='w-full px-3 py-2 border border-gray-800' placeholder='Password' required />
      <div className='w-full flex justify-between text-sm mt-[-8px]'>
        <p className='cursor-pointer'>Forgot your password?</p>
        {currentstate ==="Login"?<p className='cursor-pointer' onClick={()=>setcurrentstate('Sign Up')}>Create Account</p>
          :<p className='cursor-pointer' onClick={()=>setcurrentstate('Login')}>Login Here</p>
        }
      </div>
      <button className='bg-black text-white font-light px-8 py-2 mt-4 rounded-sm cursor-pointer'>{currentstate==='Login'?"Sign In":"Sign Up"}</button>
    </form>
  )
}

export default Login