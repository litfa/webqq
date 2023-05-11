<script setup lang="ts">
import { getGroupRecord } from '../../apis/getMessageRecord'
import { useMessage, SearchMessage } from './useMessage'

const { list, chat, qq } = useMessage(getGroupRecord)
</script>

<template>
  <div class="chat" ref="chat">
    <messagelist :list="list" />
    <search-message type="group" :qq="qq" />
  </div>
</template>

<style lang="less" scoped>
@import url(./style.less);
</style>
