<script setup lang="ts">
import MessageCount from './MessageCount.vue'
import type { MessageCount as MessageCountType } from './useChatlistHeader'

defineProps<{
  data: MessageCountType[] | null
  keyword: string
}>()
</script>

<template>
  <message-count title="群聊">
    <div class="group" v-loading="!data">
      <template v-for="i in data">
        <chatlist-chat
          v-if="i.type == 'GroupMessage'"
          :qq="i.sender.group.id"
          :name="i.sender.group.name"
          :message="`${i.count}条与'${keyword}'相关的消息`"
          avatar-type="group"
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
