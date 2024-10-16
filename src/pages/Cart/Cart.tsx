import { useMutation, useQuery } from '@tanstack/react-query'
import path from 'src/constants/path'
import purchaseApi from 'src/apis/purchase.api'
import { purchasesStatus } from 'src/constants/purchase'
import { formatCurrency } from 'src/utils/ultils'
import { Link } from 'react-router-dom'
import QuantityController from 'src/components/QuantityController'
import { useEffect, useState } from 'react'
import { Purchase } from 'src/types/purchase.type'
import { produce } from 'immer'

interface ExtendedPurchase extends Purchase {
  disabled: boolean
  checked: boolean
}
export default function Cart() {
  const [extendedPurchases, setExtendedPurchases] = useState<ExtendedPurchase[]>([])
  const { data: purchasesInCartData, refetch } = useQuery({
    queryKey: ['purchases', { status: purchasesStatus.inCart }],
    queryFn: () => purchaseApi.getPurchases({ status: purchasesStatus.inCart })
  })
  const updatePurchaseMutation = useMutation({
    mutationFn: purchaseApi.updatePurchase,
    onSuccess: () => {
      refetch()
    }
  })
  const deletePurchaseMutation = useMutation({
    mutationFn: purchaseApi.deletePurchase,
    onSuccess: () => {
      refetch()
    }
  })
  const purchasesInCart = purchasesInCartData?.data.data
  const isAllChecked = extendedPurchases.every((purchase) => purchase.checked)
  const checkedPurchases = extendedPurchases.filter((purchase) => purchase.checked)
  const totalCheckPurchasePrice = checkedPurchases.reduce((result, current) => {
    return result + current.product.price * current.buy_count
  }, 0)

  useEffect(() => {
    setExtendedPurchases((prev) => {
      // const extendedPurchasesObject = keyBy(prev.'_id')
      return (
        purchasesInCart?.map((purchase) => ({
          ...purchase,
          disabled: false,
          checked: Boolean()
        })) || []
      )
    })
  }, [purchasesInCart])
  const handleCheck = (purchaseIndex: number) => (event: React.ChangeEvent<HTMLInputElement>) => {
    setExtendedPurchases(
      produce((draft) => {
        draft[purchaseIndex].checked = event.target.checked
      })
    )
  }

  const handleCheckAll = () => {
    setExtendedPurchases((prev) =>
      prev.map((purchase) => ({
        ...purchase,
        checked: !isAllChecked
      }))
    )
  }
  const handleQuantity = (purchaseIndex: number, value: number, enabled: boolean) => {
    if (enabled) {
      const purchase = extendedPurchases[purchaseIndex]
      setExtendedPurchases(
        produce((draft) => {
          draft[purchaseIndex].disabled = true
        })
      )
      updatePurchaseMutation.mutate({ product_id: purchase.product._id, buy_count: value })
    }
  }
  const handleDeletePurchase = (purchaseIndex: number) => () => {
    const purchaseId = extendedPurchases[purchaseIndex]._id
    deletePurchaseMutation.mutate([purchaseId])
  }
  const handleDeleteManyPurchase = () => {
    const purchaseIds = checkedPurchases.map((purchase) => purchase._id)
    deletePurchaseMutation.mutate(purchaseIds)
  }

  return (
    <div className='bg-neutral-100 py-16 '>
      <div className='container'>
        <div className=''>
          <div className='min-w-[1000px]'>
            <div className='grid grid-cols-12 rounded-sm bg-white px-9 py-5 text-sm capitalize text-gray-500 shadow-sm'>
              <div className='col-span-6 bg-white'>
                <div className='flex items-center'>
                  <div className='flex-grow text-black'>Sản phẩm</div>
                </div>
              </div>
              <div className='col-span-6'>
                <div className='grid grid-cols-5 text-center'>
                  <div className='col-span-2'>Đơn giá</div>
                  <div className='col-span-1'>Số lượng</div>
                  <div className='col-span-1'>Thành tiền</div>
                  <div className='col-span-1'></div>
                </div>
              </div>
            </div>
            <div className='my-3 rounded-sm bg-white p-5 shadow'>
              {extendedPurchases?.map((purchase, index) => (
                <div
                  key={purchase._id}
                  className='grid grid-cols-12 rounded-sm border border-gray-200 bg-white px-4 py-5 text-center text-sm text-gray-500'
                >
                  <div className='col-span-6'>
                    <div className='flex'>
                      <div className='flex flex-shrink items-center justify-center pr-3'>
                        <input
                          type='checkbox'
                          className='h-5 w-5 accent-blue-600'
                          checked={purchase.checked}
                          onChange={handleCheck(index)}
                        />
                      </div>
                      <div className='flex-grow'>
                        <div className='flex'>
                          <Link className='h-20 w-20 flex-shrink-0' to={`${path.home}${purchase.product._id}`}>
                            <img src={purchase.product.image} alt={purchase.product.name} />
                          </Link>
                          <div className='flex-grow px-2 pb-2 pt-7'>
                            <Link to={`${path.home}${purchase.product._id}`} className='line-clamp-2'>
                              {purchase.product.name}
                            </Link>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className='col-span-6'>
                    <div className='grid grid-cols-5 items-center'>
                      <div className='col-span-2'>
                        <div className='flex items-center justify-center pt-7'>
                          {formatCurrency(purchase.price)}
                          <span className='ml-3'></span>
                        </div>
                      </div>
                      <div className='col-span-1 pt-6'>
                        <QuantityController
                          max={purchase.product.quantity}
                          value={purchase.buy_count}
                          onIncrease={(value) => handleQuantity(index, value, value < purchase.product.quantity)}
                          onDecrease={(value) => handleQuantity(index, value, value >= 1)}
                          disabled={purchase.disabled}
                        />
                      </div>
                      <div className='col-span-1 pt-7'>
                        <span className=' text-rose-500'>{formatCurrency(purchase.price * purchase.buy_count)}</span>
                      </div>
                      <div className='col-span-1'>
                        <button
                          className='bg-none pt-7 text-black transition-colors hover:text-rose-500'
                          onClick={handleDeletePurchase(index)}
                        >
                          Xóa
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
            <div className='sticky bottom-0 z-10 flex items-center rounded-sm border border-gray-200 bg-white p-5'>
              <div className='flex flex-shrink-0 items-center justify-center pr-3'>
                <input
                  type='checkbox'
                  className='ml-5 h-5 w-5 accent-blue-500'
                  checked={isAllChecked}
                  onChange={handleCheckAll}
                />
              </div>
              <button className='mx-3 border-none bg-none'>Chọn tất cả</button>
              <button className='mx-3 border-none bg-none' onClick={handleDeleteManyPurchase}>
                Xóa
              </button>
              <div className='ml-auto flex items-center'>
                <div>
                  <div className='flex items-center justify-end'>
                    <div>Tổng tiền :</div>
                    <div className='ml-2 text-3xl text-rose-500'>{totalCheckPurchasePrice}</div>
                    <button className='ml-10 bg-rose-600 px-3 py-2 text-lg font-bold text-white hover:bg-rose-500'>
                      Thanh toán
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
