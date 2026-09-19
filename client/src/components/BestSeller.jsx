import React, { useContext } from 'react'
import ProductCard from './ProductCard'
import { AppContext } from '../context/AppContext'

const BestSeller = () => {
  const {products}=useContext(AppContext);
  return (
    <div className='mt-5'>
      <p className='text-2xl md:text-3xl font-medium'>Best Sellers</p>
      <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4
      xl:grid-cols-5 mt-6 gap-3 md:gap-6'>
        {products?.filter((product)=>product.inStock).slice(0,5).map((product,index)=>(
          <ProductCard key={index} product={product}/>
        ))}
      </div>
    </div>
  )
}

export default BestSeller