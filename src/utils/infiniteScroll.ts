import type { Directive } from 'vue'

const handleScroll = (
  el: HTMLElement,
  config: {
    offset: number
  },
  cb: () => void,
  type?: 'removeListen'
) => {
  const onScroll: EventListener = (e) => {
    const { scrollTop, scrollHeight, clientHeight } = e.target as HTMLElement
    const { offset = 0 } = config
    const shouldTrigger =
      scrollHeight - (scrollTop + clientHeight) <= offset ||
      scrollHeight - (scrollTop * -1 + clientHeight) <= offset

    if (shouldTrigger) {
      cb()
    }
  }
  if (type == 'removeListen') {
    el.removeEventListener('scroll', onScroll)
  }
  el.addEventListener('scroll', onScroll)
}

export default {
  mounted(el: HTMLElement, binding, vnode, prevVnode) {
    console.log({ el }, binding)

    if (typeof binding.value.cb != 'function') {
      throw new Error(`'v-infinite-scroll' binding value must be a function`)
    }

    handleScroll(el, { offset: binding.value.offset }, () => {
      binding.value.cb()
    })
  }
} as Directive
