<script setup lang="ts">
const props = defineProps({
  qq: {
    type: [Number, String],
    required: true
  },
  alt: String,
  type: {
    validator(value: string) {
      return ['member', 'group'].includes(value)
    }
  }
})

const url = (qq: string | number) => {
  if (props.type == 'member') {
    return `https://q1.qlogo.cn/g?b=qq&nk=${qq}&s=160`
  }else if(props.type == 'group') {
    return `http://p.qlogo.cn/gh/${qq}/${qq}/100/`
  }
}
</script>

<template><img :src="url(qq)" :alt="alt" /></template>

<style lang="less" scoped></style>
