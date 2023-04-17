<script setup lang="ts">
import UserAvatar from '../UserAvatar/UserAvatar.vue'
import MessageBubble from '../MessageBubble/MessageBubble.vue'
import { MessageChain } from 'typescript-mirai-api-http/src/types/MessageChainType'

withDefaults(
  defineProps<{
    qq?: number | string
    name?: string
    messageChain: MessageChain[]
    reverse?: boolean
    avatarDisplay?: 'display' | 'hidden' | 'transparency'
    infoDisplay?: boolean
  }>(),
  {
    reverse: false,
    avatarDisplay: 'display',
    infoDisplay: true
  }
)
</script>

<template>
  <div
    class="bubble"
    :class="reverse ? 'reverse' : ''"
    :avatar-display="!infoDisplay ? 'transparency' : avatarDisplay"
  >
    <div class="avatar">
      <user-avatar
        v-if="qq != undefined && avatarDisplay != 'hidden'"
        :qq="qq"
      ></user-avatar>
    </div>
    <div class="content">
      <div class="name" v-if="name && infoDisplay">{{ name }}</div>
      <message-bubble :message-chain="messageChain" />
    </div>
  </div>
</template>

<style>
body {
  background-color: #eeeeee;
}
</style>
<style lang="less" scoped>
.bubble {
  display: flex;
  align-items: flex-start;
  // height: 50px;
  margin: 10px 0;
  .avatar {
    margin: 0 10px;
    width: 40px;
    img {
      width: 100%;
      border-radius: 50%;
    }
  }
  .content {
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    justify-content: space-around;
    width: 100%;
    text-align: right;
    .name {
      margin-bottom: 3px;
      text-align: left;
    }
  }
}
.bubble.reverse {
  flex-direction: row-reverse;
  .content {
    align-items: flex-end;
    .name {
      text-align: right;
    }
    :deep(.message-bubble) {
      border-radius: 10px 0px 10px 10px;
    }
  }
}
.bubble[avatar-display='hidden'] .avatar {
  // 宽度改 0 为了留个 margin
  width: 0;
  margin-left: 0;
}

.bubble[avatar-display='transparency'] .avatar {
  opacity: 0;
}
</style>
