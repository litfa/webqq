<script setup lang="ts">
import MessageCount from './MessageCount.vue'
import type { FriendMessageCount } from './useChatlistHeader'

defineProps<{
  data: FriendMessageCount[] | null
  keyword: string
}>()
</script>

<template>
  <message-count title="聊天记录">
    <div class="group" v-loading="!data">
      <template v-for="i in data">
        <chatlist-chat
          v-if="i.type == 'FriendMessage'"
          :qq="i.sender.id"
          :name="i.sender.remark || i.sender.nickname"
          :message="`${i.count}条与'${keyword}'相关的消息`"
          avatar-type="member"
        />
      </template>
    </div>
  </message-count>
</template>

<style lang="less" scoped>
.group {
  min-height: 210px;
}
</style>
