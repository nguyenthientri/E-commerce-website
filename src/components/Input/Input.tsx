/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { InputHTMLAttributes } from 'react'
import { RegisterOptions, UseFormRegister } from 'react-hook-form'
interface Props extends InputHTMLAttributes<HTMLInputElement> {
  // type: React.HTMLInputTypeAttribute
  // placeholder: string
  errorMessage?: string
  // clasName: string
  // name: string
  classNameInput?: string
  classNameError?: string
  register?: UseFormRegister<any>
  rules?: RegisterOptions
}
export default function Input({
  type,
  placeholder,
  errorMessage,
  className,
  name,
  register,
  rules,
  classNameInput = 'p-3 w-full text-white outline-none border bg-transparent border-gray-300 focus:border-gray-500 rounded-sm focus:shadow-sm',
  classNameError = 'mt-1 text-red-500 min-h-[1.25rem] text-sm'
}: Props) {
  const registerResult = register && name ? register(name, rules) : {}
  return (
    <div className={className}>
      <input type={type} placeholder={placeholder} className={classNameInput} {...registerResult} />
      {/* message khi say ra loi */}
      <div className={classNameError}>{errorMessage}</div>
    </div>
  )
}
