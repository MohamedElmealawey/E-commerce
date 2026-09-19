import React, { useContext, useEffect, useState } from 'react'
import { AppContext } from '../context/AppContext'
import { useParams } from 'react-router-dom';
import ProductCard from '../components/ProductCard';

const ProductCategory = () => {
    const {products}=useContext(AppContext);
    const {category}=useParams();
    const [filterdProducts,setFilterdProducts]=useState([]);

    useEffect(()=>{
        setFilterdProducts(products.filter((produtct)=>produtct.category.toLowerCase()==category))
    },[products,category])

  return (
    <div className='mt-16 flex flex-col'>
        <div className='flex flex-col items-end w-max'>
            <p className='text-2xl font-medium uppercase'>Fresh {category}</p>
            <div className='w-16 h-0.5 bg-primary-dull rounded-full'></div>
        </div>
        <div className='mt-6 gap-5 md:gap-6 grid grid-cols-1 sm:grid-cols2 md:grid-cols-3 lg:grid-cols-4 
        xl:grid-cols-5'>
            {filterdProducts.length>0 ? filterdProducts?.map((product,index)=>(
                <ProductCard key={index} product={product}/>
            )):(
                <div className='flex items-center justify-center'>
                    <p className='text-2xl font-medium text-primary-dull'>
                        No products found in this category.
                    </p>
                </div>
            )}
        </div>
    </div>
  )
}

export default ProductCategory