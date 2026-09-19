import React, { useContext, useEffect } from 'react'
import { AppContext } from '../context/AppContext'
import { useLocation } from 'react-router-dom';

const Loading = () => {
    const {navigate}=useContext(AppContext);
    let {search}=useLocation();
    const query=new URLSearchParams(search);
    const nxtUrl=query.get('next');

    useEffect(()=>{
        if(nxtUrl){
            setTimeout(()=>{
                navigate(`/${nxtUrl}`)
            },5000)
        }
    },[nxtUrl])
  return (
    <div className='flex justify-center items-center h-screen'>
        <div className="animate-spin rounded-full h-24 w-24 border-4 border-gray-300
        border-t-primary-dull"></div>
    </div>
  )
}

export default Loading