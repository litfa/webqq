<script setup lang="ts">
defineProps<{
  src?: string
  alt?: string
}>()
</script>

<template>
  <el-image :src="src" :alt="alt" lazy />
</template>

<style lang="less" scoped></style>
