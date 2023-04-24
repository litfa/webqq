<script setup lang="ts">
import Bubble from '../components/Bubble/Bubble.vue'
import { getFriendMessageRecord } from '../apis/getMessageRecord'
import { useRoute } from 'vue-router'
import { onMounted, ref } from 'vue'
import { FriendMessageType, FriendSyncMessageType } from '../types/Message'
import { messageTime } from '../utils/dayjs'

const route = useRoute()
const chat = ref<null | HTMLDivElement>(null)
const loading = ref(false)

const qq = Number(route.params?.qq)
const list = ref<(FriendMessageType | FriendSyncMessageType)[]>([])

const getMessageRecord = async (lastId?: number, maxTimestamp?: number) => {
  if (loading.value) return
  loading.value = true
  const { data: res } = await getFriendMessageRecord(qq, lastId, maxTimestamp)
  if (res.status == 200) {
    list.value.unshift(...res.data)
  }
  loading.value = false
}

const init = async () => {
  await getMessageRecord()
  const el = chat.value
  if (!el) return
  el.scrollTop = el.scrollHeight
}
init()

const display = (
  i: number,
  e: FriendMessageType | FriendSyncMessageType
): { info: boolean; date: string | null } => {
  if (i == 0) {
    return { info: true, date: null }
  }

  const lastMessage = list.value[i - 1]

  const date = messageTime(lastMessage.timestamp, e.timestamp)

  if (date) {
    return { info: true, date }
  }

  if (lastMessage.type == e.type) {
    if (lastMessage.type == 'FriendMessage' && e.type == 'FriendMessage') {
      if (lastMessage.sender.id == e.sender.id) {
        return { info: false, date: null }
      }
    } else if (lastMessage.type == 'FriendSyncMessage' && e.type == 'FriendSyncMessage') {
      // sync都是自己的消息，可以直接隐藏
      return { info: false, date: null }
    }
  }

  return { info: true, date: null }
}

const load = async () => {
  await getMessageRecord(list.value.at(0)?.id, list.value.at(0)?.timestamp)
}

onMounted(() => {
  const el = chat.value
  const offset = 10
  if (!el) return
  let lastScroll = 0
  el.addEventListener('scroll', async () => {
    const { scrollTop, scrollHeight } = el
    const _lastScroll = lastScroll
    lastScroll = scrollTop
    // 仅向上滚动触发
    if (_lastScroll < scrollTop) return
    if (scrollTop <= offset) {
      await load()
      const afterScrollHeight = el.scrollHeight
      el.scrollTop = afterScrollHeight - scrollHeight
    }
  })
})
</script>

<template>
  <div class="chat" ref="chat">
    <template v-for="(i, index) in list">
      <div class="date" v-if="display(index, i).date">
        {{ display(index, i).date }}
      </div>
      <bubble
        v-if="i.type == 'FriendMessage'"
        :qq="i.sender.id"
        :message-chain="i.messageChain"
        :name="i.sender.remark || i.sender.nickname"
        :info-display="display(index, i).info"
      />
      <bubble
        v-if="i.type == 'FriendSyncMessage'"
        :message-chain="i.messageChain"
        :avatar-display="'hidden'"
        reverse
      />
    </template>
  </div>
</template>

<style lang="less" scoped>
.chat {
  height: 100vh;
  overflow: auto;
  display: flex;
  flex-direction: column;
  .date {
    text-align: center;
    margin: 15px 0;
  }
}
</style>
