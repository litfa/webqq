import { useRoute } from 'vue-router'
import { onActivated, onDeactivated, onMounted, ref } from 'vue'
import type { Response } from '../../utils/request'
import SearchMessage from '../../components/SearchMessage/SearchMessage.vue'

export { SearchMessage }

export const useMessage = <T>(
  getRecord: (qq: number, lastId?: number, maxTimestamp?: number) => Response<T>
) => {
  const route = useRoute()
  const chat = ref<null | HTMLDivElement>(null)
  const loading = ref(false)
  let lastScroll = 0
  const offset = 10

  const qq = Number(route.params?.qq)
  // @ts-ignore
  const list = ref<T>([])

  const getMessageRecord = async (lastId?: number, maxTimestamp?: number) => {
    if (loading.value) return
    loading.value = true
    const { data: res } = await getRecord(qq, lastId, maxTimestamp)
    if (res.status == 200 && Array.isArray(res.data)) {
      list.value.unshift(...res.data)
    }
    loading.value = false
  }

  const init = async () => {
    await getMessageRecord()
    const el = chat.value
    console.log(el)

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

  return {
    list,
    chat,
    qq
  }
}
