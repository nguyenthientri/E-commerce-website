import React, { useContext } from 'react'
import { useState } from 'react'
import { useFloating, FloatingPortal } from '@floating-ui/react'
import { Link, createSearchParams, useNavigate } from 'react-router-dom'
import useQueryConfig from 'src/hooks/useQueryConfig'
import { useForm } from 'react-hook-form'
import { useMutation, useQuery } from '@tanstack/react-query'
import authApi from 'src/apis/auth.api'
import { AppContext } from 'src/contexts/app.context'
import { schema, Schema } from 'src/utils/rules'
import { yupResolver } from '@hookform/resolvers/yup'
import path from 'src/constants/path'
import omit from 'lodash'
import purchaseApi from 'src/apis/purchase.api'
import { purchasesStatus } from 'src/constants/purchase'
import { clearAccessTokenFromLS } from 'src/utils/auth'
import style from './header.module.css'
import { toast } from 'react-toastify'

type FormData = Pick<Schema, 'name'>
const nameSchema = schema.pick(['name'])

export default function Header() {
  const queryConfig = useQueryConfig()
  const { register, handleSubmit } = useForm<FormData>({
    defaultValues: {
      name: ''
    },
    resolver: yupResolver(nameSchema)
  })
  const { setIsAuthenticated, isAuthenticated } = useContext(AppContext)
  const logoutMutation = useMutation({
    mutationFn: () => authApi.logout(),
    onSuccess: () => {
      setIsAuthenticated(false)
      clearAccessTokenFromLS()
    }
  })

  const { data } = useQuery({
    queryKey: ['purchases', { status: purchasesStatus.inCart }],
    queryFn: () => purchaseApi.getPurchases({ status: purchasesStatus.inCart }),
    enabled: isAuthenticated
  })
  // const purchasesInCart = purchasesInCartData?.data.data
  const handleLogout = () => {
    logoutMutation.mutate()
  }
  const [open, setOpen] = useState(false)
  const { x, y, reference, floating, strategy } = useFloating({
    open,
    onOpenChange: setOpen
  })
  // const showPopover = () => {
  //   setOpen = true
  // }
  // const hidePopover = () => {
  //   setOpen = false
  // }
  const navigate = useNavigate()

  //TÌM KIẾM SẢN PHẨM
  const onSubmitSearch = handleSubmit((data) => {
    const config = queryConfig.order
      ? omit(
          {
            ...queryConfig,
            name: data.name
          },
          ['order', 'sort_by']
        )
      : {
          ...queryConfig,
          name: data.name
        }
    navigate({
      pathname: path.home,
      search: createSearchParams(config).toString()
    })
  })
  const handleClick = () => {
    if (isAuthenticated) {
      navigate('/cart')
    } else {
      toast('Bạn chưa đăng nhập!')
    }
  }
  // console.log(queryConfig)

  return (
    <div className='bg-black pb-10 pt-2'>
      <div className='container'>
        <div className='flex justify-end text-white'>
          <div
            className=' flex cursor-pointer items-center py-1 hover:text-gray-300'
            ref={reference}
            // onMouseEnter={showPopover}
            // onMouseLeave={hidePopover}
          >
            {/* <svg
              xmlns='http://www.w3.org/2000/svg'
              fill='none'
              viewBox='0 0 24 24'
              strokeWidth={1.5}
              stroke='currentColor'
              className='h-6 w-6'
            >
              <path
                strokeLinecap='round'
                strokeLinejoin='round'
                d='M12 21a9.004 9.004 0 0 0 8.716-6.747M12 21a9.004 9.004 0 0 1-8.716-6.747M12 21c2.485 0 4.5-4.03 4.5-9S14.485 3 12 3m0 18c-2.485 0-4.5-4.03-4.5-9S9.515 3 12 3m0 0a8.997 8.997 0 0 1 7.843 4.582M12 3a8.997 8.997 0 0 0-7.843 4.582m15.686 0A11.953 11.953 0 0 1 12 10.5c-2.998 0-5.74-1.1-7.843-2.918m15.686 0A8.959 8.959 0 0 1 21 12c0 .778-.099 1.533-.284 2.253m0 0A17.919 17.919 0 0 1 12 16.5c-3.162 0-6.133-.815-8.716-2.247m0 0A9.015 9.015 0 0 1 3 12c0-1.605.42-3.113 1.157-4.418'
              />
            </svg>
            <span className='mx-1'>Tiếng Việt</span>
            <svg
              xmlns='http://www.w3.org/2000/svg'
              fill='none'
              viewBox='0 0 24 24'
              strokeWidth={1.5}
              stroke='currentColor'
              className='h-6 w-6'
            >
              <path strokeLinecap='round' strokeLinejoin='round' d='m19.5 8.25-7.5 7.5-7.5-7.5' />
            </svg> */}
          </div>

          <FloatingPortal>
            {open && (
              <div
                ref={floating}
                style={{
                  position: strategy,
                  top: y ?? 0,
                  left: x ?? 0,
                  width: 'max-content'
                }}
              >
                Tooltip
                {/* // <div className='bg-white relative shadow-md rounded-sm border border-grey-200'>
              //   <div className='flex flex-col py-2 px-3'>
              //     <button className='py-2 px-3 hover:text-orange'>Tiếng Việt</button>
              //     <button className='py-2 px-3 hover:text-orange'>Tiếng Anh</button>
              //   </div>
              // </div> */}
              </div>
            )}
          </FloatingPortal>

          {isAuthenticated && (
            <div className='center flex cursor-pointer items-center py-1 hover:text-gray-300'>
              <div className='w6 h6 flex-shink-0 mr-2'>
                <img
                  src='https://yt3.ggpht.com/K4ygAstBO0MO0K1YlZroyEcSS2JiKdhS5n84K9e8etsh52XTucdkDxjATnpuVGoRXNV1DhQu=s68-c-k-c0x00ffffff-no-rj'
                  alt=''
                  className='h-full w-8 rounded-full object-cover'
                />
              </div>
              <div>Nguyễn Thiên Trí</div>
            </div>
          )}
        </div>
        <div className='flex justify-end'>
          {isAuthenticated && (
            <button
              onClick={handleLogout}
              className='rounded-[20px] border border-gray-500 bg-rose-500 px-2 py-1 text-white hover:bg-rose-600'
            >
              Đăng xuất
            </button>
          )}
          {!isAuthenticated && (
            <div className='flex items-center'>
              <Link to='/register' className='mx-3 capitalize text-white hover:text-white'>
                <p className={style.btn_login}>Đăng ký</p>
              </Link>
              <div className='h-4 border-r-[1px] border-r-white/40  '></div>
              <Link to='/login' className='mx-3 capitalize text-white hover:text-white'>
                <p className={style.btn_login}>Đăng nhập</p>
              </Link>
            </div>
          )}
        </div>
        <div className=' grid grid-cols-12 items-end gap-4'>
          <Link to='/' className='col-span-2'>
            <img className='h-[60px]' src='src\assets\img\Screenshot 2024-05-14 170515.png' alt='' />
          </Link>
          <div className='col-span-1'></div>
          <form action='' className='col-span-6' onSubmit={onSubmitSearch}>
            <div className='flex rounded-sm bg-white  p-1'>
              <input
                type='text'
                placeholder='We buy free ship 0Đ - Đăng ký ngay!'
                className=' h-8 w-full flex-grow border-none bg-transparent px-3 py-2 text-black outline-none placeholder:italic placeholder:text-slate-400'
                {...register('name')}
              />
              <button className='py-1.75 flex-shrink-0 rounded-sm bg-rose-600 px-5 hover:opacity-80'>
                <svg
                  xmlns='http://www.w3.org/2000/svg'
                  fill='none'
                  viewBox='0 0 24 24'
                  strokeWidth={1.5}
                  stroke='white'
                  className='h-4 w-4'
                >
                  <path
                    strokeLinecap='round'
                    strokeLinejoin='round'
                    d='m21 21-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.607 10.607Z'
                  />
                </svg>
              </button>
            </div>
          </form>
          <div className='col-span-1'></div>
          <div className='col-span-2 flex justify-center'>
            <i onClick={handleClick} to='/cart' className=''>
              <svg
                xmlns='http://www.w3.org/2000/svg'
                fill='none'
                viewBox='0 0 24 24'
                strokeWidth={1.5}
                stroke='pink'
                className='h-8 w-8 '
              >
                <path
                  strokeLinecap='round'
                  strokeLinejoin='round'
                  d='M2.25 3h1.386c.51 0 .955.343 1.087.835l.383 1.437M7.5 14.25a3 3 0 0 0-3 3h15.75m-12.75-3h11.218c1.121-2.3 2.1-4.684 2.924-7.138a60.114 60.114 0 0 0-16.536-1.84M7.5 14.25 5.106 5.272M6 20.25a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0Zm12.75 0a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0Z'
                />
              </svg>
            </i>
          </div>
        </div>
      </div>
    </div>
  )
}
