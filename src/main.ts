import { createApp } from 'vue'
import App from './App.vue'
import router from './config/router'
import './assets/style/main.less'
// el-message
import 'element-plus/theme-chalk/el-message.css'
import 'element-plus/theme-chalk/el-loading.css'

createApp(App).use(router).mount('#app')
