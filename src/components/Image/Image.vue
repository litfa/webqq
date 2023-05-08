<script setup lang="ts">
defineProps<{
  src?: string
  alt?: string
  previewSrcList?: string[]
}>()
</script>

<template>
  <el-image :src="src" :alt="alt" fit="contain" :preview-src-list="[src!]" lazy />
</template>

<style lang="less" scoped></style>
