<script setup lang="ts">
import { messageTime } from '../../utils/dayjs'
import {
  FriendMessageType,
  FriendSyncMessageType,
  GroupMessageType,
  GroupSyncMessageType
} from '../../types/Message'
import Bubble from '../Bubble/Bubble.vue'

const props = defineProps<{
  list:
    | (FriendMessageType | FriendSyncMessageType)[]
    | (GroupMessageType | GroupSyncMessageType)[]
}>()

const display = (
  i: number,
  e: FriendMessageType | FriendSyncMessageType | GroupMessageType | GroupSyncMessageType
): { info: boolean; date: string | null } => {
  if (i == 0) {
    return { info: true, date: null }
  }

  const lastMessage = props.list[i - 1]

  const date = messageTime(lastMessage.timestamp, e.timestamp)

  if (date) {
    return { info: true, date }
  }

  if (lastMessage.type == e.type) {
    if (lastMessage.type == 'FriendMessage' && e.type == 'FriendMessage') {
      if (lastMessage.sender.id == e.sender.id) {
        return { info: false, date: null }
      }
    } else if (lastMessage.type == 'FriendSyncMessage' && e.type == 'FriendSyncMessage') {
      // sync都是自己的消息，可以直接隐藏
      return { info: false, date: null }
    }

    if (lastMessage.type == 'GroupMessage' && e.type == 'GroupMessage') {
      if (lastMessage.sender.id == e.sender.id) {
        return { info: false, date: null }
      }
    } else if (lastMessage.type == 'GroupSyncMessage' && e.type == 'GroupSyncMessage') {
      // sync都是自己的消息，可以直接隐藏
      return { info: false, date: null }
    }
  }

  return { info: true, date: null }
}
</script>

<template>
  <template v-for="(i, index) in list">
    <div class="date" v-if="display(index, i).date">
      {{ display(index, i).date }}
    </div>
    <bubble
      v-if="i.type == 'FriendMessage'"
      :qq="i.sender.id"
      :message-chain="i.messageChain"
      :name="i.sender.remark || i.sender.nickname"
      :info-display="display(index, i).info"
    />
    <bubble
      v-if="i.type == 'FriendSyncMessage'"
      :message-chain="i.messageChain"
      :avatar-display="'hidden'"
      reverse
    />
    <bubble
      v-if="i.type == 'GroupMessage'"
      :qq="i.sender.id"
      :message-chain="i.messageChain"
      :name="i.sender.memberName"
      :info-display="display(index, i).info"
    />
    <bubble
      v-if="i.type == 'GroupSyncMessage'"
      :message-chain="i.messageChain"
      name="XING"
      :avatar-display="'hidden'"
      :info-display="display(index, i).info"
      reverse
    />
  </template>
</template>

<style lang="less" scoped>
.date {
  text-align: center;
  margin: 15px 0;
}
</style>
