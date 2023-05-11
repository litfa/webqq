<script setup lang="ts">
import { ErrorPicture } from '@icon-park/vue-next'
defineProps<{
  src?: string
  alt?: string
  previewSrcList?: string[]
}>()
</script>

<template>
  <el-image
    class="image"
    :src="src"
    :alt="alt"
    fit="contain"
    :preview-src-list="[src!]"
    lazy
  >
    <template #error>
      <div class="error">
        <error-picture theme="outline" size="24" fill="#999a" />
      </div>
    </template>
  </el-image>
</template>

<style lang="less" scoped>
.image {
  max-width: 80%;
  display: block;
  :deep(img) {
    max-width: 100%;
    max-height: 300px;

    min-width: 50px;
    min-height: 50px;
  }
  .error {
    width: 55px;
    height: 50px;
    display: flex;
    justify-content: center;
    align-items: center;
    background-color: #ffffffaa;
  }
}
</style>
