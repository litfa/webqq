<script setup lang="ts">
import { getFriendMessageRecord } from '../../apis/getMessageRecord'
import { useMessage } from './useMessage'

const { list, chat } = useMessage(getFriendMessageRecord)
</script>

<template>
  <div class="chat" ref="chat">
    <messagelist :list="list" />
  </div>
</template>

<style lang="less" scoped>
.chat {
  height: 100vh;
  overflow: auto;
  display: flex;
  flex-direction: column;
}
</style>
