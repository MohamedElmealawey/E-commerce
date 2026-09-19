import React, { useContext } from 'react';
import { categories } from '../assets/assets';
import { AppContext } from '../context/AppContext';
import { Link } from 'react-router-dom';

const Categories = () => {
  const { navigate } = useContext(AppContext);

  return (
    <div className='py-8 md:py-12 lg:py-16 max-w-7xl mx-auto'>
      {/* Header Section */}
      <div className="flex flex-col items-center mb-8 md:mb-12">
        <div className="flex items-center gap-4">
          <div className="w-12 h-1 bg-gradient-to-r from-primary to-primary-dark rounded-full" />
          <p className='text-2xl md:text-3xl lg:text-4xl font-bold text-gray-800'>
            Shop by <span className='text-primary'>Categories</span>
          </p>
          <div className="w-12 h-1 bg-gradient-to-l from-primary to-primary-dark rounded-full" />
        </div>
        <p className="text-gray-500 text-sm md:text-base mt-2 text-center max-w-2xl">
          Explore our wide range of products across various categories
        </p>
      </div>

      {/* Categories Grid */}
      <div className='grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-7 
        gap-3 sm:gap-4 md:gap-5 lg:gap-6'>
        {categories?.map((item, index) => (
          <div 
            key={index} 
            className='group relative cursor-pointer rounded-2xl overflow-hidden
              transition-all duration-300 transform hover:-translate-y-2 hover:shadow-2xl
              focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2'
            onClick={() => {
              navigate(`/products/${item.path.toLowerCase()}`);
              window.scrollTo(0, 0);
            }}
            role="button"
            tabIndex={0}
            onKeyDown={(e) => {
              if (e.key === 'Enter' || e.key === ' ') {
                navigate(`/products/${item.path.toLowerCase()}`);
                window.scrollTo(0, 0);
              }
            }}
          >
            {/* Category Card */}
            <div 
              className='flex flex-col items-center justify-center p-4 sm:p-5 md:p-6 
                h-full min-h-[120px] sm:min-h-[140px] md:min-h-[160px]
                transition-all duration-300'
              style={{ backgroundColor: item.bgColor || '#f3f4f6' }}
            >
              {/* Image with animation */}
              <div className="relative w-full flex justify-center">
                <div className="absolute inset-0 bg-white/20 rounded-full blur-2xl opacity-0 
                  group-hover:opacity-100 transition-opacity duration-500" />
                <img 
                  src={item.image} 
                  className='w-16 h-16 sm:w-20 sm:h-20 md:w-24 md:h-24 
                    object-contain transition-all duration-500 
                    group-hover:scale-110 group-hover:rotate-3'
                  alt={item.text} 
                  loading="lazy"
                />
              </div>

              {/* Category Name */}
              <p className='text-sm sm:text-base font-semibold text-gray-800 mt-3 sm:mt-4 
                text-center transition-colors duration-300 group-hover:text-primary'>
                {item.text}
              </p>

              {/* Decorative indicator */}
              <div className="w-8 h-0.5 bg-gray-300 mt-1 rounded-full 
                transition-all duration-300 group-hover:w-12 group-hover:bg-primary" />
            </div>

            {/* Overlay gradient on hover */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/5 to-transparent 
              opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

            {/* Hover shine effect */}
            <div className="absolute -inset-full top-0 left-0 w-1/2 h-full 
              bg-gradient-to-r from-transparent via-white/20 to-transparent 
              transform -skew-x-12 group-hover:translate-x-full 
              transition-transform duration-700" />
          </div>
        ))}
      </div>
    </div>
  );
};

export default Categories;