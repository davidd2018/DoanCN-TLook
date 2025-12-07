import React, { useContext, useState } from 'react'
import { ShopContext } from '../context/ShopContext'
import { Link } from 'react-router-dom'

const ProductItem = ({id, image, name, price}) => {
    const {currency} = useContext(ShopContext);
    const [isLoading, setIsLoading] = useState(true);

    return (
        <Link 
            className='group block bg-white rounded-xl overflow-hidden shadow-md hover:shadow-lg transition-all duration-300 border border-gray-100' 
            to={`/product/${id}`}
        >
            {/* Image Container */}
            <div className='relative overflow-hidden bg-gray-50 aspect-square'>
                {/* Loading Skeleton */}
                {isLoading && (
                    <div className='absolute inset-0 bg-gray-200 animate-pulse'></div>
                )}
                
                <img 
                    className='w-full h-full object-cover group-hover:scale-105 transition-transform duration-300' 
                    src={image[0]} 
                    alt={name}
                    onLoad={() => setIsLoading(false)}
                    style={{display: isLoading ? 'none' : 'block'}}
                />
                
                {/* Overlay với text "Chi tiết" */}
                <div className='absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-30 transition-all duration-300 flex items-center justify-center'>
                    <span className='text-white text-lg font-semibold opacity-0 group-hover:opacity-100 transform translate-y-2 group-hover:translate-y-0 transition-all duration-300'>
                        Chi tiết
                    </span>
                </div>
                
                {/* Sale Badge */}
                <div className='absolute top-3 left-3 bg-gradient-to-r from-red-500 to-pink-500 text-white px-2 py-1 rounded-full text-xs font-bold shadow-lg'>
                    Mới
                </div>
            </div>
            
            {/* Product Info */}
            <div className='p-4'>
                <h3 className='text-gray-800 font-medium text-sm leading-5 mb-2 line-clamp-2 hover:text-blue-600 transition-colors'>
                    {name}
                </h3>
                
                <div className='flex items-center justify-between'>
                    <p className='text-lg font-bold text-red-600'>
                        {price.toLocaleString('vi-VN')}{currency}
                    </p>
                    
                    {/* Rating Stars */}
                    <div className='flex items-center gap-1'>
                        {[...Array(5)].map((_, i) => (
                            <svg 
                                key={i} 
                                className='w-3 h-3 text-yellow-400 fill-current' 
                                viewBox='0 0 20 20'
                            >
                                <path d='M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z' />
                            </svg>
                        ))}
                        <span className='text-xs text-gray-500 ml-1'>5.0</span>
                    </div>
                </div>
            </div>
        </Link>
    )
}

export default ProductItem