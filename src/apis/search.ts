import {
  FriendMessageType,
  FriendSyncMessageType,
  GroupMessageType,
  GroupSyncMessageType
} from '../types/Message'
import request, { Response } from '../utils/request'

export const searchGroupMessage = (
  keyword: string,
  qq: number,
  lastId?: number
): Response<(GroupMessageType | GroupSyncMessageType)[]> => {
  return request({
    url: '/search/groupMessage',
    method: 'post',
    data: {
      keyword,
      qq,
      lastId
    }
  })
}
export const searchFriendMessage = (
  keyword: string,
  qq: number,
  lastId?: number
): Response<(FriendMessageType | FriendSyncMessageType)[]> => {
  return request({
    url: '/search/friendMessage',
    method: 'post',
    data: {
      keyword,
      qq,
      lastId
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
