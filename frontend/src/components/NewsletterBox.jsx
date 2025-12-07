import React from 'react'

const NewsletterBox = () => {

    const onSubmitHandler = (event) => {
    event.preventDefault();
    }

  return (
    <div className='text-center py-1'>
        <p className='text-2xl font-medium text-gray-800'>Đăng ký ngay & giảm giá 15%</p>
        <p className='text-gray-600 mt-3 text-[16px]'>
            Chỉ cần đăng ký tài khoản, bạn sẽ nhận ngay mã giảm giá 15% cho đơn hàng đầu tiên.
            Nhanh tay – số lượng ưu đãi có hạn!
        </p>
        <form onSubmit={onSubmitHandler} className='w-full sm:w-1/2 flex items-center gap-3 mx-auto my-6 border pl-3'>
            <input className='w-full sm:flex-1 outline-none' type="email" placeholder='Nhập email của bạn' required />
            <button type='submit' className='bg-black text-white text-xs py-4 px-10'>Đăng ký </button>
        </form>
    </div>
  )
}

export default NewsletterBox