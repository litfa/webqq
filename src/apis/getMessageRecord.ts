import request, { Response } from '../utils/request'
import type {
  FriendMessageType,
  FriendSyncMessageType,
  GroupMessageType,
  GroupSyncMessageType
} from '../types/Message'

export const getFriendMessageRecord = (
  qq: number,
  lastId?: number,
  maxTimestamp?: number
): Response<(FriendMessageType | FriendSyncMessageType)[]> => {
  return request({
    url: '/getMessageRecord/friend',
    method: 'post',
    data: {
      qq,
      lastId,
      maxTimestamp
    }
  })
}
export const getGroupRecord = (
  group: number,
  lastId?: number,
  maxTimestamp?: number
): Response<(GroupMessageType | GroupSyncMessageType)[]> => {
  return request({
    url: '/getMessageRecord/group',
    method: 'post',
    data: {
      group,
      lastId,
      maxTimestamp
    }
  })
}
