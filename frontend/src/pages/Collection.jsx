import React, { useContext, useEffect, useState } from 'react';
import { ShopContext } from '../context/ShopContext';
import { assets } from '../assets/assets';
import Title from '../components/Title';
import ProductItem from '../components/ProductItem';

const Collection = () => {

  const {products , search , showSearch } = useContext(ShopContext);
  const [showFilter,setShowfilter] = useState(false);
  const [filterProducts, setFilterProducts] = useState([]);
  const [category,setCategory] = useState([]);
  const [subCategory,setSubCategory] = useState([]);
  const [sortType, setSortType] = useState('relavent');

  const toggleCategory = (e) => {
    if(category.includes(e.target.value)){
      setCategory(prev=> prev.filter(item => item !== e.target.value));
    }
    else{
      setCategory(prev=> [...prev, e.target.value]);
    }
  }

  const toggleSubCategory = (e) => {
    if(subCategory.includes(e.target.value)){
      setSubCategory(prev=> prev.filter(item => item !== e.target.value));
    }
    else{
      setSubCategory(prev=> [...prev, e.target.value]);
    }
  }


  const applyFilter =() => {
    let productsCopy = products.slice();

    if(showSearch && search.length ){
      productsCopy = productsCopy.filter(item => item.name.toLowerCase().includes(search.toLowerCase()));
    }

    if(category.length > 0){
      productsCopy = productsCopy.filter(item => category.includes(item.category));
    }
    if(subCategory.length > 0){
      productsCopy = productsCopy.filter(item => subCategory.includes(item.subCategory));
    }

    setFilterProducts(productsCopy);
  }
 
  const sortProduct = () =>{
    let fpCopy = filterProducts.slice();
    switch (sortType) {
      case 'low-high':
        setFilterProducts(fpCopy.sort((a,b)=>(a.price - b.price)));
        break;
      case 'high-low':
        setFilterProducts(fpCopy.sort((a,b)=>(b.price - a.price)));
        break;
      
      default:
        applyFilter();
        break;
    }
  }

  useEffect(() => {
    applyFilter();
  },[category, subCategory , search , showSearch , products]);

  useEffect(() => {
    sortProduct();
  },[sortType]);

  return (
    <div className='flex flex-col sm:flex-row gap-1 sm:gap-10 pt-10 pb-10 border-t bg-white px-8'>
      {/* filter Options */}
      <div className='min-w-60'>
        <p onClick={()=>setShowfilter(!showFilter)} className='my-2 text-xl flex items-center cursor-pointer gap-2'>BỘ LỌC
          <img className={`h-3 sm:hidden ${showFilter ? 'rotate-90' : ''}`} src={assets.dropdown_icon} alt="" />
        </p>
        {/* Category Filter */}
        <div className={`border border-gray-300 pl-5 py-3 mt-6 ${showFilter ? '' :'hidden'} sm:block`}>
          <p className='mb-3 text-sm font-medium'>THƯƠNG HIỆU </p>
          <div className='flex flex-col gap-2 text-sm font-light text-gray-700'>
            <p className='flex gap-2'>
              <input className='w-3' type="checkbox" value={'Yonex'} onChange={toggleCategory} /> Yonex  
            </p>
             <p className='flex gap-2'>
              <input className='w-3' type="checkbox" value={'Victor'} onChange={toggleCategory} /> Victor
            </p>
             <p className='flex gap-2'>
              <input className='w-3' type="checkbox" value={'Lining'} onChange={toggleCategory} /> Lining 
            </p>
          </div>
        </div>
        {/* SubCategory Filter */}
         <div className={`border border-gray-300 pl-5 py-3 my-5 ${showFilter ? '' :'hidden'} sm:block`}>
          <p className='mb-3 text-sm font-medium'>PHONG CÁCH CHƠI </p>
          <div className='flex flex-col gap-2 text-sm font-light text-gray-700'>
            <p className='flex gap-2'>
              <input className='w-3' type="checkbox" value={'Attack'} onChange={toggleSubCategory} /> Tấn công
            </p>
             <p className='flex gap-2'>
              <input className='w-3' type="checkbox" value={'Defense'} onChange={toggleSubCategory} /> Phòng thủ , phản tạt  
            </p>
             <p className='flex gap-2'>
              <input className='w-3' type="checkbox" value={'Balance'} onChange={toggleSubCategory} /> Công thủ toàn diện 
            </p>
          </div>
        </div>       
      </div>
      {/* Right Side */}
      <div className='flex-1'>
        <div className='flex justify-between text-base sm:text-2xl mb-4'>
          <div className='flex items-center gap-3 mb-4'>
            <h2 className='text-2xl sm:text-3xl font-bold text-gray-800'>
              TẤT CẢ <span className='text-blue-600'>SẢN PHẨM</span>
            </h2>
          </div>
          {/* Product Sort */}
          <select onChange={(e)=>setSortType(e.target.value)} className='border-2 border-gray-300 text-sm px-2 cursor-pointer'>
            <option value="relavent">Sắp xếp theo giá: Liên quan</option>
            <option value="low-high">Sắp xếp theo giá: Thấp đến Cao</option>
            <option value="high-low">Sắp xếp theo giá: Cao đến Thấp</option>
          </select>
        </div>

        {/* Map Products */}
        <div className='grid grid-cols-2 md:gird-cols-3 lg:grid-cols-4 gap-4 gap-y-6'>
          {
            filterProducts.map((item,index)=>(
              <ProductItem key = {index} name={item.name} id={item._id} image={item.image} price={item.price}/>
            ))
          }
        </div>

      </div>
    </div>
  )
}

export default Collection