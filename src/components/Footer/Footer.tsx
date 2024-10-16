import React from 'react'
import style from './footer.module.css'
import Input from '../Input'

export default function Footer() {
  return (
    <footer className=' bg-neutral-100 py-16'>
      <div className='container'>
        <div className='grid grid-cols-1 gap-4 lg:grid-cols-12'>
          <div className='lg:col-span-4'>
            <div className='text-center leading-relaxed text-gray-500'>
              We Buy nơi kết nối người mua và người bán, cung cấp đa dạng sản phẩm với giá cả cạnh tranh và dịch vụ hỗ
              trợ tận tình, mang đến trải nghiệm mua sắm trực tuyến tiện lợi và an toàn.
            </div>
          </div>
          <div className='lg:col-span-2'>
            <div>
              <h3 className='pb-[1.75rem] font-bold'>Về chúng tôi</h3>
              <div className='flex flex-wrap'>
                <span className='w-full pb-3 text-gray-500'>Giới thiệu</span>
                <span className='w-full pb-3 text-gray-500'>Tuyển dụng</span>
                <span className='w-full pb-3 text-gray-500'>Liên hệ & truyền thông</span>
                <span className='w-full pb-3 text-gray-500'>Chính sách bảo mật </span>
              </div>
            </div>
          </div>
          <div className='lg:col-span-2'>
            <div>
              <h3 className='pb-[1.75rem] font-bold'>Liên kết</h3>
              <div className='flex flex-wrap'>
                <span className='w-full pb-3 text-gray-500'>Tin tức</span>
                <span className='w-full pb-3 text-gray-500'>Đối tác</span>
                <span className='w-full pb-3 text-gray-500'>Công việc</span>
              </div>
            </div>
          </div>
          <div className='contact lg:col-span-4'>
            <div>
              <h4 className='font-bold'>Đăng ký trở thành CTV</h4>
              <p className='py-7 text-gray-500'>
                Bạn muốn đối tác kinh doanh cùng Webuy? Cùng nhau xây dựng thương hiệu nổi bật trên Webuy ngay!
              </p>
              <form action='' className='relative'>
                <input type='text' placeholder='Nhập email!' className={style.input_footer} />
                <button className={style.btn_footer}>Đăng ký</button>
              </form>
              <ul className='mt-5 flex'>
                <li className={style.list_contact}>
                  <svg className={style.contact_icon} xmlns='http://www.w3.org/2000/svg' viewBox='0 0 320 512'>
                    <path d='M80 299.3V512H196V299.3h86.5l18-97.8H196V166.9c0-51.7 20.3-71.5 72.7-71.5c16.3 0 29.4 .4 37 1.2V7.9C291.4 4 256.4 0 236.2 0C129.3 0 80 50.5 80 159.4v42.1H14v97.8H80z' />
                  </svg>
                </li>
                <li className={style.list_contact}>
                  <svg className={style.contact_icon} xmlns='http://www.w3.org/2000/svg' viewBox='0 0 576 512'>
                    <path d='M549.7 124.1c-6.3-23.7-24.8-42.3-48.3-48.6C458.8 64 288 64 288 64S117.2 64 74.6 75.5c-23.5 6.3-42 24.9-48.3 48.6-11.4 42.9-11.4 132.3-11.4 132.3s0 89.4 11.4 132.3c6.3 23.7 24.8 41.5 48.3 47.8C117.2 448 288 448 288 448s170.8 0 213.4-11.5c23.5-6.3 42-24.2 48.3-47.8 11.4-42.9 11.4-132.3 11.4-132.3s0-89.4-11.4-132.3zm-317.5 213.5V175.2l142.7 81.2-142.7 81.2z' />
                  </svg>
                </li>
                <li className={style.list_contact}>
                  <svg className={style.contact_icon} xmlns='http://www.w3.org/2000/svg' viewBox='0 0 448 512'>
                    <path d='M448 209.9a210.1 210.1 0 0 1 -122.8-39.3V349.4A162.6 162.6 0 1 1 185 188.3V278.2a74.6 74.6 0 1 0 52.2 71.2V0l88 0a121.2 121.2 0 0 0 1.9 22.2h0A122.2 122.2 0 0 0 381 102.4a121.4 121.4 0 0 0 67 20.1z' />
                  </svg>
                </li>
                <li className={style.list_contact}>
                  <svg className={style.contact_icon} xmlns='http://www.w3.org/2000/svg' viewBox='0 0 512 512'>
                    <path d='M459.4 151.7c.3 4.5 .3 9.1 .3 13.6 0 138.7-105.6 298.6-298.6 298.6-59.5 0-114.7-17.2-161.1-47.1 8.4 1 16.6 1.3 25.3 1.3 49.1 0 94.2-16.6 130.3-44.8-46.1-1-84.8-31.2-98.1-72.8 6.5 1 13 1.6 19.8 1.6 9.4 0 18.8-1.3 27.6-3.6-48.1-9.7-84.1-52-84.1-103v-1.3c14 7.8 30.2 12.7 47.4 13.3-28.3-18.8-46.8-51-46.8-87.4 0-19.5 5.2-37.4 14.3-53 51.7 63.7 129.3 105.3 216.4 109.8-1.6-7.8-2.6-15.9-2.6-24 0-57.8 46.8-104.9 104.9-104.9 30.2 0 57.5 12.7 76.7 33.1 23.7-4.5 46.5-13.3 66.6-25.3-7.8 24.4-24.4 44.8-46.1 57.8 21.1-2.3 41.6-8.1 60.4-16.2-14.3 20.8-32.2 39.3-52.6 54.3z' />
                  </svg>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}
