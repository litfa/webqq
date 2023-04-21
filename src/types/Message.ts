import type {
  FriendMessage,
  GroupMessage,
  FriendSyncMessage,
  GroupSyncMessage
} from 'typescript-mirai-api-http/src/types/MessageType'

interface sqlData {
  id: number
  date: string
  timestamp: number
  uuid: string
}

export interface FriendMessageType extends FriendMessage, sqlData {
  messageText: string
}
export interface GroupMessageType extends GroupMessage, sqlData {
  messageText: string
}
export interface FriendSyncMessageType extends FriendSyncMessage, sqlData {
  messageText: string
}
export interface GroupSyncMessageType extends GroupSyncMessage, sqlData {
  messageText: string
}

export type GetMessageList =
  | FriendMessageType
  | GroupMessageType
  | FriendSyncMessageType
  | GroupSyncMessageType
