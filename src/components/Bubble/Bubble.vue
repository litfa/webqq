<script setup lang="ts">
import UserAvatar from '../UserAvatar/UserAvatar.vue'

withDefaults(
  defineProps<{
    qq?: number | string
    name?: string
    message: string
    reverse: boolean
    avatarDisplay?: 'display' | 'hidden' | 'transparency'
  }>(),
  {
    reverse: false,
    avatarDisplay: 'display'
  }
)
</script>

<template>
  <div class="bubble" :class="reverse ? 'reverse' : ''" :avatar-display="avatarDisplay">
    <div class="avatar">
      <user-avatar
        v-if="qq != undefined && avatarDisplay != 'hidden'"
        :qq="qq"
      ></user-avatar>
    </div>
    <div class="content">
      <div class="name" v-if="name">{{ name }}</div>
      <div class="message-bubble">
        <div class="message">{{ message }}</div>
        <!-- <span class="date">19:13</span> -->
      </div>
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
    }
    .message-bubble {
      background-color: #fff;
      min-height: 35px;
      max-width: 90%;
      padding: 10px 15px;
      box-sizing: border-box;
      border-radius: 0px 10px 10px 10px;

      .message {
        word-break: break-all;
        text-align: left;
      }
    }
  }
}
.bubble.reverse {
  flex-direction: row-reverse;
  .content {
    align-items: flex-end;
    .message-bubble {
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
