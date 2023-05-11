<script setup lang="ts">
import { nextTick, ref, watch } from 'vue'
import { useRoute } from 'vue-router'
import { throttle } from '../../utils/throttle'
import { searchGroupMessage, searchFriendMessage } from '../../apis/search'
import ChatlistChat from '../ChatlistChat/ChatlistChat.vue'
import {
  FriendMessageType,
  FriendSyncMessageType,
  GroupMessageType,
  GroupSyncMessageType
} from '../../types/Message'

const props = defineProps<{
  type: 'friend' | 'group'
  qq: number
}>()

const route = useRoute()
const open = ref(false)
const keyword = ref('')
const result = ref<
  (GroupMessageType | GroupSyncMessageType | FriendMessageType | FriendSyncMessageType)[]
>([])
const loading = ref(false)
const disabled = ref(false)

const searchApi = (type: 'friend' | 'group') => {
  if (type == 'friend') {
    return searchFriendMessage
  } else {
    return searchGroupMessage
  }
}

const search = async (lastId?: number, viewLoading = true) => {
  if (viewLoading) {
    loading.value = true
  }

  const { data: res } = await searchApi(props.type)(keyword.value, props.qq, lastId)
  if (res.data.length == 0) {
    disabled.value = true
  }
  result.value.push(...res.data)
  nextTick(() => {
    loading.value = false
  })
}

const onInput = throttle(() => {
  result.value = []
  search()
  console.log('onInput')
}, 2000)

const init = () => {
  if (route.query.search) {
    keyword.value = route.query.search as string
    open.value = true
    console.log('init')
    search()
  }
}
init()

const log = () => {
  search(result.value.at(-1)?.id, false)
}
</script>

<template>
  <el-drawer
    ref="drawerRef"
    v-model="open"
    @input="onInput"
    :title="`查找${props.type == 'group' ? '群聊的' : ''}聊天记录`"
    direction="rtl"
  >
    <div class="search">
      <el-input v-model="keyword" placeholder="关键词"></el-input>
      <div
        class="result"
        v-infinite-scroll="log"
        :infinite-scroll-disabled="loading || disabled"
        v-loading="loading"
      >
        <div v-for="i in result">
          <chatlist-chat
            v-if="i.type == 'FriendMessage'"
            :qq="i.sender.id"
            :name="i.sender.remark || i.sender.nickname"
            :message="i.messageText"
            avatar-type="member"
            :date="i.date"
          />
          <chatlist-chat
            v-if="i.type == 'FriendSyncMessage'"
            :qq="0"
            name="我"
            :message="i.messageText"
            avatar-type="member"
            :date="i.date"
          />
          <chatlist-chat
            v-if="i.type == 'GroupMessage'"
            :qq="i.sender.id"
            :name="i.sender.memberName"
            :message="i.messageText"
            avatar-type="member"
            :date="i.date"
          />
          <chatlist-chat
            v-if="i.type == 'GroupSyncMessage'"
            :qq="0"
            name="我"
            :message="i.messageText"
            avatar-type="member"
            :date="i.date"
          />
        </div>
        <div class="tips">{{ disabled ? '没有更多了' : '正在加载……' }}</div>
      </div>
    </div>
  </el-drawer>
</template>

<style lang="less" scoped>
.el-drawer__body {
  overflow: hidden;
}
.search {
  height: 100%;
  display: flex;
  flex-direction: column;
  .result {
    flex: 1;
    overflow: auto;
    .tips {
      width: 100%;
      text-align: center;
      margin: 20px 0;
      font-size: 14px;
    }
  }
}
</style>
