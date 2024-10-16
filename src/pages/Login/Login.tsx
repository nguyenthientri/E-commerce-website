import { Link, useNavigate } from 'react-router-dom'
import { useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import { schema, Schema } from 'src/utils/rules'
import { useMutation } from '@tanstack/react-query'
import { omit } from 'lodash'
import { isAxiosUnprocessableEntityError } from 'src/utils/ultils'
import Input from 'src/components/Input'
import { ErrorResponse } from 'src/types/utils.type'
import authApi from 'src/apis/auth.api'
import { useContext } from 'react'
import { AppContext } from 'src/contexts/app.context'
import style from './login.module.css'

type FormData = Omit<Schema, 'confirm_password'>
const loginSchema = schema.omit(['confirm_password'])
export default function Login() {
  const { setIsAuthenticated } = useContext(AppContext)
  const navigate = useNavigate()
  const {
    register,
    handleSubmit,
    setError,
    formState: { errors }
  } = useForm<FormData>({
    resolver: yupResolver(loginSchema)
  })

  const loginMutation = useMutation({
    mutationFn: (body: Omit<FormData, 'confirm_password'>) => authApi.login(body)
  })
  const onSubmit = handleSubmit((data) => {
    loginMutation.mutate(data, {
      onSuccess: (data) => {
        setIsAuthenticated(true)
        navigate('/')
      },
      onError: (errors) => {
        if (isAxiosUnprocessableEntityError<ErrorResponse<FormData>>(errors)) {
          const formError = errors.response?.data.data
          if (formError) {
            Object.keys(formError).forEach((key) => {
              setError(key as keyof FormData, {
                message: formError[key as keyof FormData],
                type: 'Server'
              })
            })
          }
        }
      }
    })
  })
  return (
    <div className=''>
      <div className={style.body_login}>
        <div className='container'>
          <div className='grid grid-cols-1 py-12 lg:grid-cols-7 lg:py-[65px]'>
            <div className='lg:col-span-3 lg:col-start-3'>
              <form action='' className='rounded p-10 shadow-sm' onSubmit={onSubmit} noValidate>
                <div className='text-2xl text-white'>Đăng nhập</div>
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
                <div className='mt-3'>
                  <button
                    type='submit'
                    className='w-full bg-rose-500 px-2 py-4 text-center text-sm uppercase text-white hover:bg-rose-600'
                  >
                    Đăng nhập
                  </button>
                </div>
                <div className='flex justify-center py-8'>
                  <span className='text-gray-400'>Bạn chưa có tài khoản?</span>
                  <Link className='ml-1 text-rose-500' to='/Register'>
                    Đăng ký
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
