<script setup lang="ts">
import { getFriendMessageRecord } from '../apis/getMessageRecord'
import { useRoute } from 'vue-router'
import { onMounted, ref, onDeactivated, onActivated } from 'vue'
import { FriendMessageType, FriendSyncMessageType } from '../types/Message'
import Messagelist from '../components/Messagelist/Messagelist.vue'

const route = useRoute()
const chat = ref<null | HTMLDivElement>(null)
const loading = ref(false)
let lastScroll = 0
const offset = 10

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

const load = async () => {
  await getMessageRecord(list.value.at(0)?.id, list.value.at(0)?.timestamp)
}

const scrollEvent = async (e: Event) => {
  const el = e.target as HTMLElement
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
}

onMounted(() => {
  const el = chat.value
  if (!el) return
  el.addEventListener('scroll', scrollEvent)
})

onDeactivated(() => {
  const el = chat.value
  if (!el) return
  el.removeEventListener('scroll', scrollEvent)
})

onActivated(() => {
  const el = chat.value
  if (!el) return
  el.scrollTop = lastScroll
})
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
