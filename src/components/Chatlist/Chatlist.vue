<script setup lang="ts">
import ChatlistChat from '../ChatlistChat/ChatlistChat.vue'
import { getMessageList as getMessageListApi } from '../../apis/getMessageList'
import { ref } from 'vue'
import type { GetMessageList } from '../../types/Message'

const messageList = ref<GetMessageList[]>([])

const getMessageList = async () => {
  const { data: res } = await getMessageListApi()
  messageList.value = res.data
}
getMessageList()
</script>

<template>
  <div class="chatlist">
    <template v-for="i in messageList" :key="i.id">
      <chatlist-chat
        v-if="i.type == 'FriendMessage'"
        :qq="i.sender.id"
        :name="i.sender?.nickname"
        :message="i.messageText"
        avatar-type="member"
        :date="i.date"
        @click="$router.push(`/home/friend/${i.sender.id}`)"
      ></chatlist-chat>

      <chatlist-chat
        v-if="i.type == 'GroupMessage'"
        :qq="i.sender.group.id"
        :name="i.sender?.group.name"
        :message="`${i.sender.memberName}： ${i.messageText}`"
        avatar-type="group"
        :date="i.date"
        @click="$router.push(`/home/group/${i.sender.group.id}`)"
      ></chatlist-chat>

      <chatlist-chat
        v-if="i.type == 'FriendSyncMessage'"
        :qq="i.subject.id"
        :name="i.subject?.nickname"
        :message="i.messageText"
        avatar-type="member"
        :date="i.date"
        @click="$router.push(`/home/friend/${i.subject.id}`)"
      ></chatlist-chat>

      <chatlist-chat
        v-if="i.type == 'GroupSyncMessage'"
        :qq="i.subject.id"
        :name="i.subject?.name"
        :message="i.messageText"
        avatar-type="group"
        :date="i.date"
        @click="$router.push(`/home/group/${i.subject.id}`)"
      ></chatlist-chat>
    </template>
  </div>
</template>

<style lang="less" scoped>
.chatlist {
  background-color: #fff;
}
</style>
