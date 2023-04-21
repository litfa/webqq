<script setup lang="ts">
import Bubble from '../components/Bubble/Bubble.vue'
import { getGroupRecord } from '../apis/getMessageRecord'
import { useRoute } from 'vue-router'
import { onMounted, ref } from 'vue'
import { GroupMessageType, GroupSyncMessageType } from '../types/Message'
import { messageTime } from '../utils/dayjs'

const route = useRoute()
const chat = ref<null | HTMLDivElement>(null)
const loading = ref(false)

const qq = Number(route.params?.qq)
const list = ref<(GroupMessageType | GroupSyncMessageType)[]>([])

const getMessageRecord = async (lastId?: number) => {
  if (loading.value) return
  loading.value = true
  const { data: res } = await getGroupRecord(qq, lastId)
  if (res.status == 200) {
    list.value.unshift(...res.data)
  }
  loading.value = false
}

const init = async () => {
  await getMessageRecord()
  const el = chat.value
  console.log(el)

  if (!el) return
  console.log(el.scrollTop, el.scrollHeight, el.clientHeight)

  el.scrollTop = el.scrollHeight
  console.log(el.scrollTop, el.scrollHeight)
}
init()

const display = (
  i: number,
  e: GroupMessageType | GroupSyncMessageType
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
    if (lastMessage.type == 'GroupMessage' && e.type == 'GroupMessage') {
      if (lastMessage.sender.id == e.sender.id) {
        return { info: false, date: null }
      }
    } else if (lastMessage.type == 'GroupSyncMessage' && e.type == 'GroupSyncMessage') {
      // sync都是自己的消息，可以直接隐藏
      return { info: false, date: null }
    }
  }

  return { info: true, date: null }
}

const load = async () => {
  await getMessageRecord(list.value.at(0)?.id)
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
        v-if="i.type == 'GroupMessage'"
        :qq="i.sender.id"
        :message-chain="i.messageChain"
        :name="i.sender.memberName"
        :info-display="display(index, i).info"
      />
      <bubble
        v-if="i.type == 'GroupSyncMessage'"
        :message-chain="i.messageChain"
        name="XING"
        :avatar-display="'hidden'"
        :info-display="display(index, i).info"
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
