import { createApp } from 'vue'
import App from './App.vue'
import router from './config/router'
import { createPinia } from 'pinia'
import './assets/style/main.less'
// el-message
import 'element-plus/theme-chalk/el-message.css'
import 'element-plus/theme-chalk/el-loading.css'

const pinia = createPinia()
const app = createApp(App)

app.use(pinia)
app.use(router)
app.mount('#app')
