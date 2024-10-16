import React from 'react'
import { Link } from 'react-router-dom'
import path from 'src/constants/path'
import { Product as ProductType } from 'src/types/product.type'
import { formatCurrency, formatNumberToSocialStyle } from 'src/utils/ultils'

interface Props {
  product: ProductType
}
export default function Product({ product }: Props) {
  return (
    <Link to={`${path.home}${product._id}`}>
      <div
        className='overflow-hidden rounded-sm bg-white shadow transition-transform 
      duration-100  hover:translate-y-[-0.0625rem] hover:shadow-md'
      >
        <div className='relative w-full pt-[100%]'>
          <img src={product.image} alt={product.name} className='absolute left-0 top-0 bg-white object-cover' />
        </div>
        <div className='overflow-hidden p-2'>
          <div className='line-clamp-2 min-h-[1,75rem] text-sm'>{product.name}</div>
          <div className='item-center mt-3 flex'>
            <div className='max-w-[50%] truncate pt-[2px] text-[12px] text-gray-500 line-through'>
              {formatCurrency(product.price_before_discount)}
            </div>
            <div className='ml-2 truncate text-orange'>
              <span className='text-xs'>₫</span>
              <span>{formatCurrency(product.price)}</span>
            </div>
          </div>
          <div className='mt-3 flex items-center justify-end'>
            <div className='flex items-center'>
              <div className='relative'>
                <div className='absolute left-0 top-0 h-full overflow-hidden' style={{ width: '50%' }}>
                  {/* {Array(5)
                    .fill(0)
                    .map((_, index) => (
                      <svg
                        xmlns='http://www.w3.org/2000/svg'
                        fill='none'
                        viewBox='0 0 24 24'
                        strokeWidth={0.5}
                        stroke='orange'
                        className='w-4 h-4 fill-orange border-[1px]'
                        key={index}
                      >
                        <path
                          strokeLinecap='round'
                          strokeLinejoin='round'
                          d='M11.48 3.499a.562.562 0 0 1 1.04 0l2.125 5.111a.563.563 0 0 0 .475.345l5.518.442c.499.04.701.663.321.988l-4.204 3.602a.563.563 0 0 0-.182.557l1.285 5.385a.562.562 0 0 1-.84.61l-4.725-2.885a.562.562 0 0 0-.586 0L6.982 20.54a.562.562 0 0 1-.84-.61l1.285-5.386a.562.562 0 0 0-.182-.557l-4.204-3.602a.562.562 0 0 1 .321-.988l5.518-.442a.563.563 0 0 0 .475-.345L11.48 3.5Z'
                        />
                      </svg>
                    ))} */}
                </div>
              </div>
            </div>
            <div className='w-full text-xs '>
              <span>Đã bán</span>
              <span className='ml-1'>{formatNumberToSocialStyle(product.sold)}</span>
            </div>
          </div>
        </div>
      </div>
    </Link>
  )
}
