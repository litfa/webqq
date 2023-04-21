import request, { Response } from '../utils/request'

export const login = (
  password: string,
  verificationCodeId: string,
  verificationCode: string
) => {
  return request({
    url: '/login/',
    method: 'post',
    data: {
      key: password,
      verificationCodeId,
      verificationCode
    }
  })
}
export const getCode = (): Response<{ svg: string; id: string }> => {
  return request({
    url: '/login/getCode',
    method: 'post'
  })
}
