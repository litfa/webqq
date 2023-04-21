<script setup lang="ts">
import { ref } from 'vue'
import { login as loginApi, getCode as getCodeApi } from '../apis/login'

const password = ref('')
const code = ref('')
let codeid = ''
const svg = ref('')
const login = () => {
  loginApi(password.value, codeid, code.value)
}

const getCode = async () => {
  const { data: res } = await getCodeApi()
  codeid = res.data.id
  svg.value = res.data.svg
}
getCode()
</script>

<template>
  <input type="text" v-model="password" placeholder="密码" />
  <input type="text" v-model="code" placeholder="验证码" />
  <div class="svg" v-html="svg"></div>
  <button @click="login">登录</button>
</template>

<style lang="less" scoped></style>
