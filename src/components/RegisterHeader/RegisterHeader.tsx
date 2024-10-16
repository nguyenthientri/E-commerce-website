import React from 'react'
import { Link, useMatch } from 'react-router-dom'

export default function RegisterHeader() {
  const registerMatch = useMatch('/register')
  const isRegister = Boolean(registerMatch)
  return (
    <header className='bg-black py-5'>
      <div className='container'>
        <nav className='flex grid grid-cols-12 items-end'>
          <div className='col-span-4 sm:col-span-3 lg:col-span-2'>
            <Link to='/'>
              <img className='h-[50px]' src='src\assets\img\Screenshot 2024-05-14 170515.png' alt='' />
            </Link>
          </div>
          <div className='col-span-8 ml-5 text-xl text-white sm:col-span-9 lg:col-span-10 lg:text-2xl'>
            {isRegister ? 'Đăng ký' : 'Đăng Nhập'}
          </div>
        </nav>
      </div>
    </header>
  )
}
