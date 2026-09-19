import React, { useContext, useEffect, useState } from 'react'
import { AppContext } from '../context/AppContext'
import ProductCard from '../components/ProductCard';

const AllProducts = () => {
    const {products,searchQuery}=useContext(AppContext);
    const [filteredProducts,setFilteredProducts]=useState([]);

    useEffect(()=>{
        if(searchQuery.length>0){
            setFilteredProducts(products.filter((product)=>product.name.toLowerCase().includes(searchQuery)))
        }else{
            setFilteredProducts(products)
        }
    },[products,searchQuery])
  return (
    <div className='mt-16 flex flex-col'>
        <div className='flex flex-col items-end w-max'>
            <p className='text-2xl font-medium uppercase'>All products</p>
            <div className='w-16 h-0.5 bg-primary-dull rounded-full'></div>
        </div>
        <div className='mt-6 gap-5 md:gap-6 grid grid-cols-1 sm:grid-cols2 md:grid-cols-3 lg:grid-cols-4 
        xl:grid-cols-5'>
            {filteredProducts.filter((product)=>product.inStock).map((product,index)=>(
                <ProductCard key={index} product={product}/>
            ))}
        </div>
    </div>
  )
}

export default AllProducts