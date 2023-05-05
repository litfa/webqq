<script setup lang="ts">
import { ref, watch } from 'vue'

const props = defineProps<{
  visible: boolean
  height: number
}>()

const content = ref<HTMLElement>()
const clientHeight = ref(props.height)

watch(
  () => props.visible,
  (visible) => {
    if (!content.value) {
      return
    }
    if (visible) {
      clientHeight.value = content.value.clientHeight
    } else {
      clientHeight.value = props.height
    }
  },
  {
    immediate: true
  }
)
</script>

<template>
  <div class="collapse" :style="{ height: clientHeight + 'px' }">
    <div class="collapse_content" ref="content">
      <slot />
    </div>
  </div>
</template>

<style lang="less" scoped>
.collapse {
  transition: height 0.4s;
  overflow: hidden;
}
</style>
