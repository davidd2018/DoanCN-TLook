import React, { useContext } from 'react'
import { ShopContext } from '../context/ShopContext'
import Title from '../components/Title'
import { useState } from 'react';
import { useEffect } from 'react';
import axios from 'axios';

const Orders = () => {

  const {backendUrl , token , currency} = useContext(ShopContext);

  const [orderData,setorderData] = useState([]);

  const loadOrderData = async () => {
    try {
      if(!token){
          return null;
      }

      const response = await axios.post(backendUrl + '/api/order/userorders',{},{headers:{token}});
      if (response.data.success){
        let allOrdersItem = []
        response.data.orders.map((order) => {
            order.items.map((item)=>{
              item['status'] = order.status
              item['payment'] = order.payment
              item['paymentMethod'] = order.paymentMethod
              item['createdAt'] = order.createdAt
              // item['date'] = order.date
              allOrdersItem.push(item)
            })
        })
        setorderData(allOrdersItem.reverse());
        
      }
      

    } catch (error) {
      
    }
  }
console.log(orderData);

  useEffect(() =>{
    loadOrderData();
  },[token])

  return (
    <div className='border-t pt-16 pb-16 px-8 bg-white'>

      <div className='text-2xl'>
        <Title  text1={'Đơn hàng'} text2={'của tôi'} />
      </div>

      <div >
        {
          orderData.map((item,index) =>(
            <div key={index} className='py-4 border-t border-b text-gray-700 flex felx-col md:flex-row md:item-center md:justify-between gap-4'>
                <div className='flex items-start gap-6 text-sm'>
                  <img className='w-16 sm:w-20' src={item.image[0]} alt="" />
                  <div>
                    <p className='sm:text-base font-medium '>{item.name}</p>
                    <div className='flex items-center gap-3 mt-1 text-base text-gray-700'>
                      <p>{item.price.toLocaleString('vi-VN')}{currency}</p>
                      <p>Số lượng: {item.quantity}</p>
                      <p>Sise: {item.size}</p>
                    </div>
                    
                    {/* <p className='mt-1'>Ngày: <span className='text-gray-400'>{new Date(item.date).toLocaleDateString()}</span></p> */}
                    <p className='mt-1'>Ngày: <span className='text-gray-400'>{new Date(item.createdAt).toLocaleDateString('vi-VN')}</span></p>

                    <p className='mt-1'>Phương thức thanh toán: <span className='text-gray-400'>{item.paymentMethod}</span></p>
                  </div>
                </div>
                <div className='md:w-1/2 flex justify-between '>
                    <div className='flex items-center gap-2'>
                        <p className='min-w-2 h-2 rounded-full bg-green-500'></p>
                        <p className='text-sm md:text-base'>{item.status}</p>
                    </div>
                    <button onClick={loadOrderData} className='border px-4 py-2 text-sm font-medium rounded-md hover:bg-black hover:text-white transition ease-in-out'>Theo dõi đơn hàng</button>
                </div>
            </div>
          ))
        }
      </div>

    </div>
  )
}

export default Orders