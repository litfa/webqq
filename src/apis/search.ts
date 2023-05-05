import request from '../utils/request'

export const searchGroupMessage = (keyword: string) => {
  return request({
    url: '/search/groupMessage',
    method: 'post',
    data: {
      keyword
    }
  })
}

export const groupMessageCount = (keyword: string) => {
  return request({
    url: '/search/groupMessageCount',
    method: 'post',
    data: {
      keyword
    }
  })
}
