import React, { useContext } from 'react'
import { ShopContext } from '../context/ShopContext'
import Title from './Title';

const CartTotal = () => {

    const {currency , delivery_fee , getCartAmount} = useContext(ShopContext);


  return (
    <div className='w-full'>
        <div className='text-2xl'>
            <Title text1={'Tổng tiền'} text2={'giỏ hàng'} />
        </div>

        <div className='flex flex-col gap-2 mt-2 text-sm'>
            <div className='flex justify-between'>
                <p>Tạm tính</p>
                <p>{getCartAmount().toLocaleString('vi-VN')}{currency}</p>
            </div>
            <hr/>
            <div className='flex justify-between'>
                <p>Phí giao hàng</p>
                <p>{delivery_fee.toLocaleString('vi-VN')}{currency}</p>
            </div>
            <hr />
            <div className='flex justify-between'>
                <b>Tổng tiền</b>
                <b>{getCartAmount() === 0 ? 0 : (getCartAmount() + delivery_fee).toLocaleString('vi-VN')}{currency}</b>
            </div>
        </div>
    </div>
  )
}

export default CartTotal