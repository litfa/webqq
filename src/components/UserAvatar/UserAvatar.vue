<script setup lang="ts">
const props = withDefaults(
  defineProps<{
    qq: number | string
    alt?: string
    type?: 'member' | 'group'
  }>(),
  {
    type: 'member'
  }
)

const url = (qq: string | number) => {
  if (props.type == 'member') {
    return `https://q1.qlogo.cn/g?b=qq&nk=${qq}&s=160`
  } else if (props.type == 'group') {
    return `http://p.qlogo.cn/gh/${qq}/${qq}/100/`
  }
}
</script>

<template><img :src="url(qq)" :alt="alt" /></template>

<style lang="less" scoped></style>
