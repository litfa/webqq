import request, { Response } from '../utils/request'
import type {
  FriendMessageType,
  FriendSyncMessageType,
  GroupMessageType,
  GroupSyncMessageType
} from '../types/Message'
import type { AxiosResponse } from 'axios'

export const getFriendMessageRecord = (
  qq: number
): Response<(FriendMessageType | FriendSyncMessageType)[]> => {
  return request({
    url: '/getMessageRecord/friend',
    method: 'post',
    data: {
      qq
    }
  })
}
export const getGroupRecord = (
  group: number
): Response<(GroupMessageType | GroupSyncMessageType)[]> => {
  return request({
    url: '/getMessageRecord/group',
    method: 'post',
    data: {
      group,
      lastId: 495135
    }
  })
}
