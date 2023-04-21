import request, { Response } from '../utils/request'

export const login = (password: string) => {
  return request({
    url: '/login/',
    method: 'post',
    data: {
      key: password
    }
  })
}
