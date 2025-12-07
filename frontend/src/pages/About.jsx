import React from 'react'
import Title from '../components/Title'
import { assets } from '../assets/assets'
import NewsletterBox from '../components/NewsletterBox'
const About = () => {
  return (
    <div className='bg-white py-5'>

      <div className='text-2xl text-center pt-8 border-t'>
        <Title text1={'Giới thiệu'} text2={'về chúng tôi'}/>
      </div>

      <div className='my-10 flex flex-col md:flex-row gap-16 justify-center'>
        <img className='w-full md:max-w-[460px] rounded' src={assets.about_img} alt="" />
        <div className='flex flex-col justify-center gap-6 md:w-2/4 text-gray-600'>
            <p>TLOOK là một thương hiệu trẻ ra đời vào năm 2024, chuyên cung cấp các dòng vợt cầu lông chất lượng cao, phục vụ nhu cầu luyện tập và thi đấu của người chơi ở mọi trình độ – từ phong trào đến chuyên nghiệp.
              Với định hướng “Chất lượng tạo nên khác biệt”, TLOOK không chỉ là nơi bán sản phẩm, mà còn là người đồng hành đáng tin cậy của cộng đồng cầu lông tại Việt Nam.
            </p>
            <b className='text-gray-800 text-[18px]'>Sứ mệnh</b>  
            <p>TLOOK cam kết mang đến cho khách hàng những sản phẩm chính hãng, đa dạng, phù hợp với thể trạng người Việt, đồng thời tư vấn đúng – trúng – tận tâm nhằm giúp người chơi chọn được vợt phù hợp với phong cách và trình độ của mình.</p> 
            <b className='text-gray-800 text-[18px]'>Tầm nhìn</b>  
            <p>Chúng tôi hướng đến việc trở thành một trong những địa chỉ bán vợt cầu lông đáng tin cậy nhất tại Việt Nam, với hệ thống phân phối hiện đại và dịch vụ khách hàng chuyên nghiệp, từng bước góp phần phát triển phong trào cầu lông nước nhà.</p>     
        </div>
      </div>

      <div className='text-xl py-4'>
        <Title text1={'HÃY MUA HÀNG'} text2={'CỦA CHÚNG TÔI'}/>
      </div>

      <div className='flex flex-col md:flex-row text-sm mb-20'>

        <div className='border px-10 md:px-16 py-8 sm:py-20 flex flex-col gap-5 text-[16px]'>
            <b>Chất lượng chính hãng, nguồn gốc rõ ràng:</b>
            <p className='text-gray-600'>Tất cả sản phẩm đều được nhập khẩu hoặc phân phối chính thức, nói không với hàng giả, hàng nhái.</p>
        </div>
        <div className='border px-10 md:px-16 py-8 sm:py-20 flex flex-col gap-5 text-[16px]'>
            <b>Tư vấn chuẩn theo trình độ người chơi:</b>
            <p className='text-gray-600'>Đội ngũ am hiểu kỹ thuật, sẵn sàng tư vấn chọn vợt phù hợp với lối đánh, sức tay và kinh nghiệm.</p>
        </div>
        <div className='border px-10 md:px-16 py-8 sm:py-20 flex flex-col gap-5 text-[16px]'>
            <b>Dịch vụ hậu mãi uy tín – căng vợt, bảo hành tận tâm</b>
            <p className='text-gray-600'>Miễn phí căng vợt lần đầu, hỗ trợ bảo hành chính hãng và đổi trả theo quy định rõ ràng.</p>
        </div>
      </div>

      <NewsletterBox/>
    </div>
  )
}

export default About