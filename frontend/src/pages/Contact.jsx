import React from 'react'
import Title from '../components/Title'
import { assets } from '../assets/assets'
import NewsletterBox from '../components/NewsletterBox'
import { useForm, ValidationError } from '@formspree/react';
const Contact = () => {

  const [state, handleSubmit] = useForm("xgvpgwlb");
  if (state.succeeded) {
      return <p>Cảm ơn bạn đã gửi lời nhắn cho Shop!</p>;
  }

  return (
    <div className='bg-white py-5'>

      <div className='text-center text-2xl pt-10 border-t'>
          <Title text1={'Liên hệ'} text2={'về chúng tôi'}/>
      </div>

      <div className='my-10 flex flex-col justify-center md:flex-row gap-8 mb-28'>
        <img className='w-full md:max-w-[480px] rounded' src={assets.contact_img} alt="" />
        <div className='flex flex-col justify-center items-start gap-6'>
          <p className='font-semibold text-xl text-gray-600'> Nơi giải đáp toàn bộ mọi thắc mắc của bạn?</p>
          <p className='text-gray-500'> 981 Kim Giang <br />Thanh Trì,Hà Nội,Việt Nam</p>
          <p className='text-gray-500'> Số điện thoại chủ shop: 0353542949 <br />Email: duythien2902@gmail.com</p>
          <p className='text-gray-500'> Hotline: 0398184532 <br />Email: tlook@gmail.com</p>
          <form onSubmit={handleSubmit} className='flex flex-col gap-2  w-[100%]'>
            <label htmlFor="email">
              Email liên hệ của bạn
            </label>
            <input
              id="email"
              type="email" 
              name="email"
              className='border p-2 rounded'
              placeholder='Nhập email của bạn...'
            />
            <ValidationError 
              prefix="Email" 
              field="email"
              errors={state.errors}
            />
            <textarea
              id="message"
              name="message"
              className='border p-2 rounded'
              placeholder='Hãy lại lời nhắn của bạn...'
            />
            <ValidationError 
              prefix="Message" 
              field="message"
              errors={state.errors}
            />
            <button type="submit" className='border rounded border-black px-8 py-2 text-sm hover:bg-black hover:text-white transition-all duration-300' disabled={state.submitting}>
              Submit
            </button>
          </form>
          {/* <button className='border border-black px-8 py-2 text-sm hover:bg-black hover:text-white transition-all duration-300'>Explore Jobs</button> */}
        </div>
      </div>
  
    <NewsletterBox />
    
    </div>
  )
}

export default Contact