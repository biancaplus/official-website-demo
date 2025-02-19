import { createApp } from 'vue'
import App from '@/App.vue'
import axios from './config/ajax'
import VueAxios from 'vue-axios'
import router from '@/config/router'
import { createPinia } from 'pinia'

import '@/utils/map/MapProvider'

import SvgLocation from './utils/marker/svg-location.js'

// // Toast、Dialog
// import { Toast, Dialog } from 'vant'
// import 'vant/es/toast/style'
// import 'vant/es/dialog/style'

import '@/assets/style.scss'
import '@/assets/vant-variables.scss'

// import * as echarts from "echarts";

import dataInit from '@/config/data-init.js'

const app = createApp(App)

app.use(SvgLocation)

// 挂载模块
app.use(VueAxios, axios)
app.use(router)
app.use(createPinia())

// app.use(Toast, Dialog)

app.config.globalProperties.dataInit = dataInit
// app.config.globalProperties.$echarts = echarts;

// 深拷贝
const copy = (e) => {
  return JSON.parse(JSON.stringify(e))
}
app.config.globalProperties.$copy = copy

app.mount('#app')
