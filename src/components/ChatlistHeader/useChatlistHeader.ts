import { computed, ref } from 'vue'
import { throttle } from '../../utils/throttle'
import { groupMessageCount } from '../../apis/search'
import { Message } from 'typescript-mirai-api-http/src/types/MessageType'
import { GroupMessageType } from '../../types/Message'

interface MessageCount extends GroupMessageType {
  count: number
}

const keyword = ref('')
const data = ref<MessageCount[]>([])

const onInput = throttle(async () => {
  const { data: res } = await groupMessageCount(keyword.value)
  data.value = res.data
}, 1500)

const visible = computed(() => {
  return keyword.value.length >= 1
})

export { keyword, onInput, visible, data }
