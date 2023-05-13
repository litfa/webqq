<script setup lang="ts">
import { useBotProfileStore } from '../../config/store'
import UserAvatar from '../UserAvatar/UserAvatar.vue'
import { More } from '@icon-park/vue-next'

const { botProfile } = useBotProfileStore()
</script>

<template>
  <div class="bot_profile">
    <div class="user">
      <user-avatar class="avatar" :qq="botProfile?.qq!" />
      <span>{{ botProfile?.profile.nickname }}</span>
    </div>
    <div class="icons">
      <more size="20" />
    </div>
  </div>
</template>

<style lang="less" scoped>
.bot_profile {
  position: sticky;
  top: 0;
  z-index: 100;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 5px 20px;
  background-color: #fff;
  box-shadow: 0px 1px 5px 0 #dfdfdfaa;
  margin-bottom: 10px;
  .user {
    display: flex;
    align-items: center;
    .avatar {
      border-radius: 50%;
      width: 40px;
      margin-right: 10px;
    }
  }
}
</style>
