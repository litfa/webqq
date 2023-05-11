<script setup lang="ts">
import {
  keyword,
  onInput,
  visible,
  groupMessage,
  friendMessage
} from './useChatlistHeader'
import GroupMessageCount from './GroupMessageCount.vue'
import FriendMessageCount from './FriendMessageCount.vue'
</script>

<template>
  <div class="chatlist_header">
    <el-popover :visible="visible" placement="bottom" :width="400" trigger="focus">
      <template #reference>
        <el-input class="search" v-model="keyword" @input="onInput"></el-input>
      </template>
      <div class="resault">
        <group-message-count :data="groupMessage" :keyword="keyword" />
        <friend-message-count :data="friendMessage" :keyword="keyword" />
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
    margin: 0 10px;
  }
  .resault {
    display: flex;
    flex-direction: column;
    :deep(.collapse_content) {
      display: flex;
      flex-direction: column;
    }
  }
}
</style>
