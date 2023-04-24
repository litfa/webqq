import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'

import pptv from 'postcss-px-to-viewport-8-plugin'
import AutoImport from 'unplugin-auto-import/vite'
import Components from 'unplugin-vue-components/vite'
import { ElementPlusResolver } from 'unplugin-vue-components/resolvers'

const load_pptv = pptv({
  viewportWidth: 375, // 设计稿的视口宽度,如传入函数
  propList: ['*'],
  unitPrecision: 6, // 转换后的精度，即小数点位数
  minPixelValue: 1, // 默认值1，小于或等于1px则不进行转换
  replace: true // 是否转换后直接更换属性值
})

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    vue(),
    AutoImport({
      resolvers: [ElementPlusResolver()]
    }),
    Components({
      resolvers: [ElementPlusResolver()]
    })
  ],
  css: {
    postcss: {
      plugins: [load_pptv]
    }
  }
})
