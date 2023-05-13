<script setup lang="ts">
import { keyword, onInput, visible, groupMessage, friendMessage } from './useSearchGlobal'
import GroupMessageCount from './GroupMessageCount.vue'
import FriendMessageCount from './FriendMessageCount.vue'
</script>

<template>
  <el-popover :visible="visible" placement="bottom" :width="400" trigger="focus">
    <template #reference>
      <el-input class="search" placeholder="搜索" v-model="keyword" @input="onInput"></el-input>
    </template>
    <div class="resault">
      <group-message-count :data="groupMessage" :keyword="keyword" />
      <friend-message-count :data="friendMessage" :keyword="keyword" />
    </div>
  </el-popover>
</template>

<style lang="less" scoped>
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
</style>
