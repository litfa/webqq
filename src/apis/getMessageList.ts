import request from '../utils/request'
import type { GetMessageList } from '../types/Message'
import type { AxiosResponse } from 'axios'

export const getMessageList = (): Promise<
  AxiosResponse<{ status: number; data: GetMessageList[] }>
> => {
  return request({
    url: '/getMessageList',
    method: 'POST'
  })
}
