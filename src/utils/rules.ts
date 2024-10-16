import type { RegisterOptions, UseFormGetValues } from 'react-hook-form'
import * as yup from 'yup'
// type Rules = { [key in 'email' | 'password' | 'confirm_password']?: RegisterOptions }
// export const getRules = (getValues?: UseFormGetValues<any>): Rules => ({
//   email: {
//     required: {
//       value: true,
//       message: 'Bạn phải nhập email.'
//     },
//     pattern: {
//       value: /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/,
//       message: 'Email không đúng định dạng.'
//     },
//     maxLength: {
//       value: 160,
//       message: 'Độ dài từ 5-160 ký tự!'
//     },
//     minLength: {
//       value: 5,
//       message: 'Độ dài từ 5-160 ký tự!'
//     }
//   },
//   password: {
//     required: {
//       value: true,
//       message: 'Bạn phải nhập password.'
//     },
//     maxLength: {
//       value: 160,
//       message: 'Độ dài password từ 5-160 ký tự!'
//     },
//     minLength: {
//       value: 6,
//       message: 'Độ dài password từ 5-160 ký tự!'
//     }
//   },
//   confirm_password: {
//     required: {
//       value: true,
//       message: 'Hãy nhập lại password.'
//     },
//     maxLength: {
//       value: 160,
//       message: 'Độ dài password từ 5-160 ký tự!'
//     },
//     minLength: {
//       value: 6,
//       message: 'Độ dài password từ 5-160 ký tự!'
//     },
//     validate:
//       typeof getValues === 'function'
//         ? (value) => value === getValues('password') || 'Password nhập lại không khớp!'
//         : undefined
//   }
// })
export const schema = yup.object({
  email: yup
    .string()
    .required('Bạn phải nhập email!')
    .email('Email không đúng định dạng!')
    .min(6, 'Độ dài từ 5 - 160 ký tự!')
    .max(160, 'Độ dài từ 5 - 160 ký tự!'),
  password: yup
    .string()
    .required('Bạn phải nhập password!')
    .min(6, 'Độ dài từ 6 - 160 ký tự!')
    .max(160, 'Độ dài từ 6 - 160 ký tự!'),
  // confirm_password: handleConfirmPasswordYup('password'),
  confirm_password: yup
    .string()
    .required('Bạn phải nhập lại password!')
    .min(6, 'Độ dài từ 6 - 160 ký tự!')
    .max(160, 'Độ dài từ 6 - 160 ký tự!')
    .oneOf([yup.ref('password')], 'Password nhập lại không khớp!')

  // name: yup.string().trim().required('')
})
export type Schema = yup.InferType<typeof schema>
