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
</script>

<template>
  <template v-for="i in list">
    <bubble
      v-if="i.type == 'GroupMessage'"
      :qq="i.sender.id"
      :message-chain="i.messageChain"
      :name="i.sender.memberName"
    />
    <bubble
      v-if="i.type == 'GroupSyncMessage'"
      :message-chain="i.messageChain"
      name="XING"
      :avatar-display="'hidden'"
      reverse
    />
  </template>
</template>

<style lang="less" scoped></style>
