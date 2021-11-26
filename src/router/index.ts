import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router'
import layouts from '../layouts/index.vue'
import main from '../views/main.vue'

const routes: Array<RouteRecordRaw> = [
  {
    path: '',
    component: layouts,
    children: [
      {
        path: '',
        component: main
      },
      {
        path: '/about',
        name: 'about',
        component: () => import(/* webpackChunkName: "about" */ '../views/About.vue')   // 懒加载路由
      },
      {
        path: '/home',
        name: 'home',
        component: () => import(/* webpackChunkName: "home" */ '../views/Home.vue')  // 懒加载路由
      }
    ]
  },
  {
    path: '/login',
    component: () => import(/* webpackChunkName: "login" */ '../views/common/login.vue')  // 懒加载路由
  }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
