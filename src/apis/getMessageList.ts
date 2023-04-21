import request, { Response } from '../utils/request'
import type { GetMessageList } from '../types/Message'

export const getMessageList = (): Response<{
  status: number
  data: GetMessageList[]
}> => {
  return request({
    url: '/getMessageList',
    method: 'POST'
  })
}
