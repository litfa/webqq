<script setup lang="ts">
import Bubble from '../components/Bubble/Bubble.vue'
import { getGroupRecord } from '../apis/getMessageRecord'
import { useRoute } from 'vue-router'
import { ref } from 'vue'
import { GroupMessageType, GroupSyncMessageType } from '../types/Message'

const route = useRoute()

const qq = Number(route.params?.qq)
const list = ref<(GroupMessageType | GroupSyncMessageType)[]>([])

const getMessageRecord = async () => {
  const { data: res } = await getGroupRecord(qq)
  if (res.status == 200) {
    list.value = res.data
  }
}
getMessageRecord()

const display = (i: number, e: GroupMessageType | GroupSyncMessageType): boolean => {
  if (i == 0) {
    return true
  }
  console.log(i, e);
  
  const lastMessage = list.value[i - 1]

  if (lastMessage.type == e.type) {
    if (lastMessage.type == 'GroupMessage' && e.type == 'GroupMessage') {
      if (lastMessage.sender.id == e.sender.id) {
        return false
      }
    } else if (lastMessage.type == 'GroupSyncMessage' && e.type == 'GroupSyncMessage') {
      // sync都是自己的消息，可以直接隐藏
      return false
    }
  }

  return true
}
</script>

<template>
  <template v-for="(i, index) in list">
    <bubble
      v-if="i.type == 'GroupMessage'"
      :qq="i.sender.id"
      :message-chain="i.messageChain"
      :name="i.sender.memberName"
      :info-display="display(index, i)"
    />
    <bubble
      v-if="i.type == 'GroupSyncMessage'"
      :message-chain="i.messageChain"
      name="XING"
      :avatar-display="'hidden'"
      :info-display="display(index, i)"
      reverse
    />
  </template>
</template>

<style lang="less" scoped></style>
