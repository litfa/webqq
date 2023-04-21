import request, { Response } from '../utils/request'
import type { GetMessageList } from '../types/Message'

export const getMessageList = (): Response<GetMessageList[]> => {
  return request({
    url: '/getMessageList',
    method: 'POST'
  })
}
