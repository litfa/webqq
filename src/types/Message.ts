import type {
  FriendMessage,
  GroupMessage,
  FriendSyncMessage,
  GroupSyncMessage
} from 'typescript-mirai-api-http/src/types/MessageType'

export interface FriendMessageType extends FriendMessage {
  messageText: string
  date: string
}
export interface GroupMessageType extends GroupMessage {
  messageText: string
  date: string
}
export interface FriendSyncMessageType extends FriendSyncMessage {
  messageText: string
  date: string
}
export interface GroupSyncMessageType extends GroupSyncMessage {
  messageText: string
  date: string
}

export type GetMessageList =
  | FriendMessageType
  | GroupMessageType
  | FriendSyncMessageType
  | GroupSyncMessageType
