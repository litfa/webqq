<script setup lang="ts">
import { ref } from 'vue'
import Chatlist from '../components/Chatlist/Chatlist.vue'

const isPc = ref<boolean>()

addEventListener('resize', () => {
  // console.log(document.body.clientWidth)
  isPc.value = document.body.clientWidth > 500
  console.log(document.body.clientWidth > 500)
})
</script>

<template>
  <div class="home">
    <chatlist v-show="isPc || $route.path == '/home/'"></chatlist>
    <div class="chat">
      <router-view v-slot="{ Component }">
        <keep-alive>
          <component :is="Component" />
        </keep-alive>
      </router-view>
    </div>
  </div>
</template>

<style lang="less" scoped>
.home {
  display: flex;
  height: 100vh;
  .chatlist {
    width: 300px;
  }
  .chat {
    flex: 1;
  }
}
</style>
