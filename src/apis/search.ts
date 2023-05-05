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

export const getGroupMessageCount = (keyword: string) => {
  return request({
    url: '/search/groupMessageCount',
    method: 'post',
    data: {
      keyword
    }
  })
}

export const getFriendMessageCount = (keyword: string) => {
  return request({
    url: '/search/friendMessageCount',
    method: 'post',
    data: {
      keyword
    }
  })
}