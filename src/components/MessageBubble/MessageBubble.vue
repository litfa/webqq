<script setup lang="ts">
import { MessageChain } from 'typescript-mirai-api-http/src/types/MessageChainType'
import Image from '../Image/Image.vue'

defineProps<{
  messageChain: MessageChain[]
}>()
</script>

<template>
  <Image
    v-if="messageChain.length == 2 && messageChain[1].type == 'Image'"
    :src="messageChain[1].url"
    :alt="messageChain[1].imageId"
    class="image"
  />

  <div class="message-bubble" v-else>
    <template v-for="i in messageChain">
      <template v-if="i.type == 'Plain'">
        <span> {{ i.text }}</span>
      </template>
      <template v-if="i.type == 'At'">
        <a href="" class="at">@{{ i.display || i.target }}&nbsp;</a>
      </template>
      <template v-if="i.type == 'AtAll'">
        <a href="" class="at">@全体成员&nbsp;</a>
      </template>
      <template v-if="i.type == 'Image'">
        <Image :src="i.url" :alt="i.imageId" class="image" />
      </template>
      <template v-if="i.type == 'Face'">
        <span>[Face: {{ i.name }}]</span>
      </template>
    </template>
  </div>
</template>

<style lang="less" scoped>
.message-bubble {
  background-color: #fff;
  min-height: 35px;
  max-width: 90%;
  padding: 10px 15px;
  box-sizing: border-box;
  border-radius: 0px 10px 10px 10px;
  text-align: left;
  word-break: break-all;
  a {
    text-decoration: none;
    color: #3390ec;
  }
}
.image {
  max-width: 90%;
  max-height: 300px;
  border-radius: 5px;
}
</style>
