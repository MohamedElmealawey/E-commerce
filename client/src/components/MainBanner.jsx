import React from 'react';
import { assets } from '../assets/assets';
import { Link } from 'react-router-dom';

const MainBanner = () => {
  return (
    <div className='relative overflow-hidden rounded-2xl mt-4'>
      <picture>
        <source media="(min-width: 768px)" srcSet={assets.main_banner_bg} />
        <img 
          src={assets.main_banner_bg_sm} 
          alt="Fresh grocery banner" 
          className='w-full h-[300px] md:h-[400px] lg:h-[500px] object-cover'
          loading="lazy"
        />
      </picture>

      <div className='absolute inset-0 bg-gradient-to-r from-black/40 via-black/20 to-transparent' />

      <div className='absolute inset-0 flex flex-col items-center md:items-start justify-center px-6 sm:px-10 md:px-16 lg:px-20'>
        <div className='mb-4 md:mb-6 bg-white/20 backdrop-blur-sm px-4 py-1.5 rounded-full border border-white/30'>
          <span className='text-white text-xs md:text-sm font-medium tracking-wide uppercase'>
            🚀 Limited Time Offer
          </span>
        </div>

        <h1 className='text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-white text-center md:text-left 
          max-w-xs sm:max-w-sm md:max-w-xl lg:max-w-3xl leading-tight md:leading-tight lg:leading-[1.2] 
          drop-shadow-2xl'>
          Freshness You Can Trust,{' '}
          <span className='text-primary-light'>Saving You Will Love!</span>
        </h1>

        <p className='hidden md:block text-white/90 text-base lg:text-lg mt-4 max-w-md lg:max-w-lg 
          font-light tracking-wide drop-shadow-lg'>
          Discover premium quality products at unbeatable prices. 
          Your one-stop shop for fresh groceries delivered to your doorstep.
        </p>

        <div className='flex flex-col sm:flex-row items-center gap-4 mt-6 md:mt-8'>
          <Link 
            to="/products" 
            className='group relative overflow-hidden px-8 md:px-10 py-3.5 md:py-4 
              bg-gradient-to-r from-primary to-primary-dark hover:from-primary-dark hover:to-primary 
              text-white font-semibold rounded-full shadow-lg hover:shadow-xl 
              transition-all duration-300 transform hover:scale-105 active:scale-95 
              flex items-center gap-2'
          >
            <span>Shop Now</span>
            <svg 
              className='w-4 h-4 md:w-5 md:h-5 transition-transform duration-300 group-hover:translate-x-1 group-hover:scale-110' 
              fill="none" 
              viewBox="0 0 24 24" 
              stroke="currentColor"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M17 8l4 4m0 0l-4 4m4-4H3" />
            </svg>
          </Link>

          <Link 
            to="/products" 
            className='hidden md:flex items-center gap-2 px-8 py-3.5 
              bg-white/10 backdrop-blur-sm border-2 border-white/40 
              text-white font-semibold rounded-full 
              hover:bg-white hover:text-black transition-all duration-300 
              group'
          >
            <span>Explore Deals</span>
            <svg 
              className='w-5 h-5 transition-transform duration-300 group-hover:translate-x-1' 
              fill="none" 
              viewBox="0 0 24 24" 
              stroke="currentColor"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M17 8l4 4m0 0l-4 4m4-4H3" />
            </svg>
          </Link>

          <div className='hidden lg:flex items-center gap-8 ml-8 text-white'>
            <div className='text-center'>
              <p className='text-2xl font-bold'>50+</p>
              <p className='text-xs opacity-80'>Categories</p>
            </div>
            <div className='w-px h-10 bg-white/30' />
            <div className='text-center'>
              <p className='text-2xl font-bold'>10k+</p>
              <p className='text-xs opacity-80'>Happy Customers</p>
            </div>
          </div>
        </div>

        <div className='flex items-center gap-6 mt-6 md:hidden text-white/80'>
          <div className='flex items-center gap-2'>
            <svg className='w-4 h-4' fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
            </svg>
            <span className='text-xs'>Fresh Guarantee</span>
          </div>
          <div className='w-px h-4 bg-white/30' />
          <div className='flex items-center gap-2'>
            <svg className='w-4 h-4' fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
            </svg>
            <span className='text-xs'>Best Prices</span>
          </div>
        </div>
      </div>

      <div className='absolute top-4 right-4 md:top-8 md:right-8 opacity-20'>
        <div className='w-12 h-12 md:w-20 md:h-20 border-2 border-white rounded-full animate-pulse' />
      </div>
      <div className='absolute bottom-4 left-4 md:bottom-8 md:left-8 opacity-20 hidden md:block'>
        <div className='w-8 h-8 md:w-12 md:h-12 border-2 border-white rounded-full animate-pulse delay-75' />
      </div>
    </div>
  );
};

export default MainBanner;