<script setup lang="ts">
import { ref } from 'vue'
import Chatlist from '../components/Chatlist/Chatlist.vue'

const isPc = ref<boolean>()

const getSize = () => {
  isPc.value = document.body.clientWidth > 500
}
getSize()

addEventListener('resize', getSize)
</script>

<template>
  <div class="home">
    <chatlist v-show="isPc || $route.path == '/home/'"></chatlist>
    <router-view v-slot="{ Component }">
      <keep-alive>
        <component :is="Component" />
      </keep-alive>
    </router-view>
  </div>
</template>

<style lang="less" scoped>
.home {
  display: flex;
  height: 100vh;
  .chatlist {
    width: 100%;
    max-width: v-bind('isPc ? ' 400px ' : ' none '');
  }
  .chat {
    min-width: 300px;
    flex: 1;
  }
}
</style>
