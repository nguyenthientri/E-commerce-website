import { useForm } from 'react-hook-form'
import { Link, useNavigate } from 'react-router-dom'
import { useMutation } from '@tanstack/react-query'
import { omit } from 'lodash'
import Input from 'src/components/Input'
import authApi from 'src/apis/auth.api'
import { schema, Schema } from 'src/utils/rules'
import { yupResolver } from '@hookform/resolvers/yup'
import { isAxiosUnprocessableEntityError } from 'src/utils/ultils'
// import { isAxiosUnprocessableEntityError } from 'src/utils/ultils'
import { ErrorResponse } from 'src/types/utils.type'
import { useContext } from 'react'
import { AppContext } from 'src/contexts/app.context'
import { styled } from 'node_modules/@tanstack/react-query-devtools/build/lib/utils'
import style from './register.module.css'

type FormData = Schema

export default function Register() {
  const { setIsAuthenticated } = useContext(AppContext)
  const navigate = useNavigate()
  const {
    register,
    handleSubmit,
    setError,
    formState: { errors }
  } = useForm<FormData>({
    resolver: yupResolver(schema)
  })
  const resgisterAccountMutation = useMutation({
    mutationFn: (body: Omit<FormData, 'confirm_password'>) => authApi.registerAccount(body)
  })
  const onSubmit = handleSubmit((data) => {
    const body = omit(data, ['confirm_password'])
    resgisterAccountMutation.mutate(body, {
      onSuccess: () => {
        // setIsAuthenticated(true)
        navigate('/login')
        alert('Đăng ký thành công!')
      },
      onError: (errors) => {
        if (isAxiosUnprocessableEntityError<ErrorResponse<Omit<FormData, 'confirm_password'>>>(errors)) {
          const formError = errors.response?.data.data
          if (formError) {
            Object.keys(formError).forEach((key) => {
              setError(key as keyof Omit<FormData, 'confirm_password'>, {
                message: formError[key as keyof Omit<FormData, 'confirm_password'>],
                type: 'Server'
              })
            })
          }
          // if (formError?.email) {
          //   setError('email', {
          //     message: formError.email,
          //     type: 'Server'
          //   })
          // }
          // if (formError?.password) {
          //   setError('password', {
          //     message: formError.password,
          //     type: 'Server'
          //   })
          // }
        }
      }
    })
  })

  return (
    <div className=''>
      <div className={style.body_register}>
        <div className='container'>
          <div className='grid grid-cols-1 py-12 lg:grid-cols-7 lg:py-10 '>
            <div className='lg:col-span-3 lg:col-start-3'>
              <form action='' className='rounded p-10 shadow-sm' onSubmit={onSubmit} noValidate>
                <div className='text-2xl text-white'>Đăng ký</div>
                <Input
                  type='email'
                  name='email'
                  placeholder='Email'
                  register={register}
                  className='mt-8'
                  errorMessage={errors.email?.message}
                />
                <Input
                  type='password'
                  name='password'
                  placeholder='Password'
                  register={register}
                  className='mt-2'
                  errorMessage={errors.password?.message}
                  autoComplete='on'
                />
                <Input
                  type='password'
                  name='confirm_password'
                  placeholder='Nhập lại mật khẩu'
                  register={register}
                  className='mt-2'
                  errorMessage={errors.confirm_password?.message}
                />

                <div className='mt-2'>
                  <button
                    type='submit'
                    className='w-full bg-rose-500 px-2 py-4 text-center text-sm uppercase text-white hover:bg-rose-600'
                  >
                    Đăng ký
                  </button>
                </div>
                <div className='flex justify-center py-8'>
                  <span className='text-gray-400'>Bạn đã có tài khoản?</span>
                  <Link className='ml-1 text-rose-600' to='/Login'>
                    Đăng nhập
                  </Link>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
