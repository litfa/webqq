<script setup lang="ts">
import { keyword, onInput, visible, data } from './useChatlistHeader'
import ChatlistChat from '../ChatlistChat/ChatlistChat.vue'
</script>

<template>
  <div class="chatlist_header">
    <el-popover :visible="visible" placement="bottom" :width="400" trigger="focus">
      <template #reference>
        <el-input class="search" v-model="keyword" @input="onInput"></el-input>
      </template>
      <div class="group" v-for="i in data">
        <chatlist-chat
          v-if="i.type == 'GroupMessage'"
          :qq="i.sender.group.id"
          :name="i.sender.group.name"
          :message="`${i.count}条与'${keyword}'相关的消息`"
          avatar-type="group"
          :date="i.date"
        />
      </div>
    </el-popover>
  </div>
</template>

<style lang="less" scoped>
.chatlist_header {
  margin: 10px 0;
  .el-popper {
    width: 100%;
  }
  .search :deep(.el-input__wrapper) {
    border-radius: 200px;
    // overflow: hidden;
  }
}
</style>
