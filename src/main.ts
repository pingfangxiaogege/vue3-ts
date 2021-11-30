import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'

import ElementPlus from 'element-plus'
// 需要放在下面
import 'element-plus/dist/index.css'
import './assets/styles/index.scss'


import { registeGlobalComponent } from '@/components/index'

const app = createApp(App)
registeGlobalComponent(app)
app
.use(ElementPlus)
.use(store)
.use(router)
.mount('#app')
