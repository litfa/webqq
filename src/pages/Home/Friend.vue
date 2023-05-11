<script setup lang="ts">
import { getFriendMessageRecord } from '../../apis/getMessageRecord'
import { useMessage, SearchMessage } from './useMessage'

const { list, chat, qq } = useMessage(getFriendMessageRecord)
</script>

<template>
  <div class="chat" ref="chat">
    <messagelist :list="list" />
    <search-message type="friend" :qq="qq" />
  </div>
</template>

<style lang="less" scoped>
@import url(./style.less);
</style>
