<script setup lang="ts">
import { reactive, ref } from 'vue'
import { login as loginApi, getCode as getCodeApi } from '../apis/login'
import { useRouter } from 'vue-router'
import type { FormInstance, FormRules } from 'element-plus'
import { ElMessage } from 'element-plus'

const router = useRouter()
const form = reactive({
  password: '',
  code: ''
})
let codeid = ''
const svg = ref('')
const formEl = ref<FormInstance>()

const rules = reactive<FormRules>({
  password: [{ required: true, message: '请输入密码', trigger: 'blur' }],
  code: [{ required: true, min: 4, max: 4, message: '请输入验证码' }]
})

const login = async () => {
  const { data: res } = await loginApi(form.password, codeid, form.code)
  if (res.status == 200) {
    localStorage.setItem('token', res.data.token)
    return router.push('/')
  }
  getCode()
  ElMessage.error('登录失败')
}

const getCode = async () => {
  const { data: res } = await getCodeApi()
  codeid = res.data.id
  svg.value = res.data.svg
}
getCode()

const submit = () => {
  if (!formEl) return
  formEl.value?.validate((valid, fields) => {
    if (valid) {
      login()
    } else {
      fields &&
        Object.keys(fields).forEach((e) => {
          ElMessage.warning(fields[e][0].message)
        })
    }
  })
}
</script>

<template>
  <el-form
    label-position="right"
    label-width="5em"
    :rules="rules"
    ref="formEl"
    :model="form"
  >
    <el-form-item label="密码" prop="password">
      <el-input v-model="form.password" type="password" name="password" />
    </el-form-item>
    <el-form-item label="验证码" prop="code">
      <div class="verification_code">
        <el-input v-model="form.code" name="code" />
        <div class="svg" v-html="svg" @click="getCode"></div>
      </div>
    </el-form-item>
    <el-form-item>
      <el-button type="primary" @click="submit">提交</el-button>
    </el-form-item>
  </el-form>
</template>

<style lang="less" scoped>
.el-form {
  padding: 10px;
  box-sizing: border-box;
}
.el-form-item {
  align-items: center;
}
.verification_code {
  display: flex;
  flex-direction: row;
  align-items: center;
 
}
</style>
