<script setup lang="ts">
import { getGroupRecord } from '../../apis/getMessageRecord'
import { useMessage, SearchMessage, MessageSearch } from './useMessage'

const { list, chat, qq, onOpen } = useMessage(getGroupRecord)
</script>

<template>
  <div class="chat" ref="chat">
    <messagelist :list="list" />
    <message-search
      class="message_search"
      theme="outline"
      size="24"
      fill="#333"
      @click="onOpen++"
    />
    <search-message type="group" :qq="qq" :on-open="onOpen" />
  </div>
</template>

<style lang="less" scoped>
@import url(./style.less);
</style>
