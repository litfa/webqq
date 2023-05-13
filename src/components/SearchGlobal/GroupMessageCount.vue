<script setup lang="ts">
import MessageCount from './MessageCount.vue'
import type { GroupMessageCount } from './useSearchGlobal'

defineProps<{
  data: GroupMessageCount[] | null
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
          @click="$router.replace(`/home/group/${i.sender.group.id}?search=${keyword}`)"
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
