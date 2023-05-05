<script setup lang="ts">
import { ref } from 'vue'
import { Down, Up } from '@icon-park/vue-next'

defineProps<{
  title?: string
}>()

const visible = ref(false)
</script>

<template>
  <h3>{{ title }}</h3>
  <collapse :height="70 * 3" :visible="visible">
    <slot />
  </collapse>
  <div class="more" @click="visible = !visible">
    <div v-show="visible">收起 <up /></div>
    <div v-show="!visible">查看更多 <down /></div>
  </div>
</template>

<style lang="less" scoped>
.more {
  cursor: pointer;
}
</style>
