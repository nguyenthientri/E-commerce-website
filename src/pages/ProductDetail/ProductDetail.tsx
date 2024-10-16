import { useEffect, useMemo, useState } from 'react'
import { useMutation, useQuery } from '@tanstack/react-query'
import { useParams } from 'react-router-dom'
import productApi from 'src/apis/Product.api'
import { formatCurrency, formatNumberToSocialStyle } from 'src/utils/ultils'
import { Product } from 'src/types/product.type'
import purchaseApi from 'src/apis/purchase.api'
import QuantityController from 'src/components/QuantityController'
import { queryClient } from 'src/main'
import { purchasesStatus } from 'src/constants/purchase'
import { toast } from 'react-toastify'

export default function ProductDetail() {
  const [buyCount, setBuyCount] = useState(1)
  const { id } = useParams()
  const { data: productDetailData } = useQuery({
    queryKey: ['product', id],
    queryFn: () => productApi.getProductDetails(id as string)
  })
  const [currentIndexImages, setCurrentIndexImages] = useState([0, 5])
  const [acctiveImage, setAcctiveImage] = useState('')
  const product = productDetailData?.data.data
  const currentImages = useMemo(
    () => (product ? product.images.slice(...currentIndexImages) : []),
    [product, currentIndexImages]
  )

  const addToCartMutation = useMutation(purchaseApi.addToCart)
  useEffect(() => {
    if (product && product.images.length > 0) {
      setAcctiveImage(product.images[0])
    }
  }, [product])

  const chooseAcctive = (img: string) => {
    setAcctiveImage(img)
  }
  const next = () => {
    if (currentIndexImages[1] < (product as Product).images.length) {
      setCurrentIndexImages((prev) => [prev[0] + 1, prev[1] + 1])
    }
  }
  const previous = () => {
    if (currentIndexImages[0] > 0) {
      setCurrentIndexImages((prev) => [prev[0] - 1, prev[1] - 1])
    }
  }
  const handleBuyCount = (value: number) => {
    setBuyCount(value)
  }

  const addToCart = () => {
    addToCartMutation.mutate(
      { buy_count: buyCount, product_id: product?._id as string },
      {
        onSuccess: (data) => {
          toast.success(data.data.message)
          queryClient.invalidateQueries({ queryKey: ['purchase', { status: purchasesStatus.inCart }] })
        }
      }
    )
  }
  if (!product) return null
  return (
    <div className='bg-gray-200 py-6'>
      <div className='bg-white p-4 shadow'>
        <div className='container'>
          <div className='grid grid-cols-12 gap-9'>
            <div className='col-span-5'>
              <div className='relative w-full pt-[100%] shadow'>
                <img src={acctiveImage} alt={product.name} className='absolute left-0 top-0 bg-white object-cover' />
              </div>
              <div className='relative mt-4 grid grid-cols-5 gap-1'>
                <button
                  className='absolute left-0 top-1/2 z-10 h-9 w-5 -translate-y-1/2 bg-black/20 text-white'
                  onClick={previous}
                >
                  <svg
                    xmlns='http://www.w3.org/2000/svg'
                    fill='none'
                    viewBox='0 0 24 24'
                    strokeWidth={1.5}
                    stroke='currentColor'
                    className='h-5 w-5'
                  >
                    <path strokeLinecap='round' strokeLinejoin='round' d='M15.75 19.5 8.25 12l7.5-7.5' />
                  </svg>
                </button>
                {currentImages.map((img) => {
                  const isActive = img === acctiveImage
                  return (
                    <div
                      className='relative w-full pt-[100%] '
                      key={img}
                      onMouseEnter={() => {
                        chooseAcctive(img)
                      }}
                    >
                      <img
                        src={img}
                        alt={product.name}
                        className='absolute left-0 top-0 cursor-pointer bg-white object-cover'
                      />
                      {isActive && <div className='absolute inset-0 border-2 border-orange'></div>}
                    </div>
                  )
                })}
                <button
                  className='absolute right-0 top-1/2 z-10 h-9 w-5 -translate-y-1/2 bg-black/20 text-white'
                  onClick={next}
                >
                  <svg
                    xmlns='http://www.w3.org/2000/svg'
                    fill='none'
                    viewBox='0 0 24 24'
                    strokeWidth={1.5}
                    stroke='currentColor'
                    className='h-5 w-5'
                  >
                    <path strokeLinecap='round' strokeLinejoin='round' d='m8.25 4.5 7.5 7.5-7.5 7.5' />
                  </svg>
                </button>
              </div>
            </div>
            <div className='col-span-7'>
              <h1 className='text-xl font-medium uppercase'>{product.name}</h1>
              <div className='ml-5 mt-5 flex items-center'>
                <div>
                  <span className='text-gray-500'>{formatNumberToSocialStyle(product.sold)}</span>
                  <span className='ml-1 text-gray-500'>Đã bán</span>
                </div>
              </div>
              <div className='mt-8 flex items-center bg-gray-50 px-5 py-4'>
                <div className=' text-3xl font-medium text-rose-500'>₫{formatCurrency(product.price)}</div>
                <div className='ml-3 pt-[7px] text-gray-500 line-through'>
                  ₫{formatCurrency(product.price_before_discount)}
                </div>
              </div>
              <div className='mt-8 flex items-center px-5'>
                <div className='pr-3 capitalize text-gray-500'>Số lượng</div>
                <QuantityController
                  onDecrease={handleBuyCount}
                  onIncrease={handleBuyCount}
                  onType={handleBuyCount}
                  value={buyCount}
                  max={product.quantity}
                />
              </div>
              <div className='px-5 pt-4 text-sm text-gray-600'>{product.quantity} Sản phẩm có sẵn</div>
              <div className='mt-10 flex items-end'>
                <button
                  className='ml-[175px] flex h-10 items-center rounded-md border-2 border-rose-600 
                bg-rose-50 p-2 text-sm capitalize   text-rose-500 hover:bg-rose-100'
                  onClick={addToCart}
                >
                  <svg
                    xmlns='http://www.w3.org/2000/svg'
                    fill='none'
                    viewBox='0 0 24 24'
                    strokeWidth={1.5}
                    stroke='currentColor'
                    className='mr-2 h-5 w-5'
                  >
                    <path
                      strokeLinecap='round'
                      strokeLinejoin='round'
                      d='M15.75 10.5V6a3.75 3.75 0 1 0-7.5 0v4.5m11.356-1.993 1.263 12c.07.665-.45 1.243-1.119 1.243H4.25a1.125 1.125 0 0 1-1.12-1.243l1.264-12A1.125 1.125 0 0 1 5.513 7.5h12.974c.576 0 1.059.435 1.119 1.007ZM8.625 10.5a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Zm7.5 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Z'
                    />
                  </svg>
                  Thêm vào giỏ hàng
                </button>
                <button className='ml-8 h-10 rounded-md border-2 border-rose-500 bg-rose-600 p-2 capitalize text-white hover:bg-rose-500'>
                  mua ngay
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className='mt-8 bg-white p-4 shadow'>
        <div className='container'>
          <div className='rounded bg-gray-50 p-4 text-lg capitalize text-slate-700'>Mô tả sản phẩm</div>
          <div className='mx-4 mb-4 mt-12 text-sm leading-loose'>
            <div
              dangerouslySetInnerHTML={{
                __html: product.description
              }}
            />
          </div>
        </div>
      </div>
    </div>
  )
}
