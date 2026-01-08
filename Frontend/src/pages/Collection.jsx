import React, { useContext, useState,useEffect } from 'react'
import { ShopContext } from '../context/ShopContext'
import { assets } from '../assets/assets'
import Title from '../components/Title'
import ProductsItem from '../components/ProductsItem'

const Collection = () => {
  const {products,search,showSearch}=useContext(ShopContext)
  const [showFilter, setshowFilter] = useState(false)
  const [filterProducts, setfilterProducts] = useState([])
  const [category, setcategory] = useState([])
  const [subcategory, setsubcategory] = useState([])
  const [sortType, setsortType] = useState('relevant')
  
  const toggleCategory=(e)=>{
    if(category.includes(e.target.value)){
      setcategory(prev=>prev.filter(item=>item!==e.target.value))
    }
    else{
      setcategory(prev=>[...prev,e.target.value])
    }
  }
  const togglesubCategory=(e)=>{
    if(subcategory.includes(e.target.value)){
      setsubcategory(prev=>prev.filter(item=>item!==e.target.value))
    }
    else{
      setsubcategory(prev=>[...prev,e.target.value])
    }
  }
  const applyFilter=()=>{
    let productscopy=products.slice()
    if(showSearch && search){
      productscopy=productscopy.filter(item=>item.name.toLowerCase().includes(search.toLowerCase()))
    }
    if(category.length>0){
      productscopy=productscopy.filter(item=>category.includes(item.category))
    }
    if(subcategory.length>0){
      productscopy=productscopy.filter(item=>subcategory.includes(item.subCategory))
    }
    setfilterProducts(productscopy)
  }
  const sortProduct=()=>{
    let fpcopy=filterProducts.slice();
    switch (sortType) {
      case 'low-high':
        setfilterProducts(fpcopy.sort((a,b)=>a.price - b.price))
        break;
      case 'high-low':
        setfilterProducts(fpcopy.sort((a,b)=>(b.price-a.price)))
        break
      default:
        applyFilter();
        break
    }
  }
  useEffect(() => {
    applyFilter()
  }, [category,subcategory,search,showSearch,products])
  useEffect(() => {
    sortProduct()
  }, [sortType])
  
  return (
    <div className='flex flex-col sm:flex-row gap-1 sm:gap-10 pt-10 border-t border-gray-200'>
      {/* Filter Options */}
      <div className='min-w-60'>
        <p onClick={()=>setshowFilter(!showFilter)} className='my-2 text-xl flex items-center cursor-pointer gap-2'>FILTERS
          <img className={`h-3 sm:hidden ${showFilter ? 'rotate-90':''}`} src={assets.dropdown_icon} alt="" />
        </p>
        {/* Category Filter */}
        <div className={`border border-gray-300 pl-5 py-3 mt-6 ${showFilter ?'':'hidden'} sm:block`}>
          <p className='mb-3 text-sm font-medium'>CATEGORIES</p>
          <div className='flex flex-col gap-2 text-sm font-light text-gray-700'>
            <p className='flex gap-2'>
            <input type="checkbox" className='w-3' value={'Men'} onChange={toggleCategory}/>Men
            </p>
            <p className='flex gap-2'>
            <input type="checkbox" className='w-3' value={'Women'} onChange={toggleCategory}/>Women
            </p>
            <p className='flex gap-2'>
            <input type="checkbox" className='w-3' value={'Kids'} onChange={toggleCategory}/>Kids
            </p>
          </div>
        </div>
        {/* Sub category filter */}
        <div className={`border border-gray-300 pl-5 py-3 my-5 mt-6 ${showFilter ?'':'hidden'} sm:block`}>
          <p className='mb-3 text-sm font-medium'>Type</p>
          <div className='flex flex-col gap-2 text-sm font-light text-gray-700'>
            <p className='flex gap-2'>
            <input type="checkbox" className='w-3' value={'Topwear'} onChange={togglesubCategory}/>Topwear
            </p>
            <p className='flex gap-2'>
            <input type="checkbox" className='w-3' value={'Bottomwear'} onChange={togglesubCategory}/>Bottomwear
            </p>
            <p className='flex gap-2'>
            <input type="checkbox" className='w-3' value={'Winterwear'} onChange={togglesubCategory}/>Winterwear
            </p>
          </div>
        </div>
      </div>
      {/* Right Side  */}
      <div className='flex-1'>
        <div className='flex justify-between text-base sm:text-2xl mb-4 '>
          <Title text1={"ALL"} text2={"COLLECTIONS"}/>
          {/* Product Sort */}
          <select onChange={(e)=>{setsortType(e.target.value)}} className='border-2 border-gray-300 text-sm px-2'>
            <option value="Relevant">Sort by:Relevant</option>
            <option value="low-high">Sort by:Low to High</option>
            <option value="high-low">Sort by:High to Low</option>
          </select>
        </div>
        {/* Map Products */}
        <div className='grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 gap-y-6'>
          {filterProducts.map((item,index)=><ProductsItem key={index} name={item.name} id={item._id} price={item.price} image={item.image}/>)}
        </div>
      </div>
    </div>
  )
}

export default Collection