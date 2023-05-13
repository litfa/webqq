import { computed, ref } from 'vue'
import { throttle } from '../../utils/throttle'
import { getFriendMessageCount, getGroupMessageCount } from '../../apis/search'
import { Message } from 'typescript-mirai-api-http/src/types/MessageType'
import { FriendMessageType, GroupMessageType } from '../../types/Message'

interface GroupMessageCount extends GroupMessageType {
  count: number
}
interface FriendMessageCount extends FriendMessageType {
  count: number
}

const keyword = ref('')
const groupMessage = ref<GroupMessageCount[] | null>(null)
const friendMessage = ref<FriendMessageCount[] | null>(null)

const getGroupMessage = async () => {
  const { data: res } = await getGroupMessageCount(keyword.value)
  groupMessage.value = res.data
}

const getFriendMessage = async () => {
  const { data: res } = await getFriendMessageCount(keyword.value)
  friendMessage.value = res.data
}

const onInput = throttle(async () => {
  getGroupMessage()
  getFriendMessage()
}, 1500)

const visible = computed(() => {
  return keyword.value.length >= 1
})

export { keyword, onInput, visible, groupMessage, friendMessage }
export type { GroupMessageCount, FriendMessageCount }
