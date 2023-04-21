<script setup lang="ts">
import { ref } from 'vue'
import { login as loginApi } from '../apis/login'

const password = ref('')
const login = () => {
  loginApi(password.value)
}
</script>

<template>
  <input type="text" v-model="password" />
  <button @click="login">登录</button>
</template>

<style lang="less" scoped></style>
