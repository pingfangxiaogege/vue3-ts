import { createRouter, createWebHistory, RouteComponent, RouteLocationNormalized, RouteRecordName, RouteRecordRaw } from 'vue-router'
import layouts from '../layouts/index.vue'
import store from '@/store'
import { ElMessage } from 'element-plus'
import { common } from '@/api'
import { IMenu } from '@/api/response-type'

let hasDynamic: boolean = false
// 开发环境不使用懒加载, 因为懒加载页面太多的话会造成webpack热更新太慢, 所以只有生产环境使用懒加载
const _import = require('./import-' + (process.env.NODE_ENV === 'development' ? 'development' : 'production') );

// 子路由添加到children
const mianRoutes: RouteRecordRaw = {
  path: '/',
  name: 'layouts',
  component: layouts,
  children: [],
  // beforeEnter(to, from, next) {
  //   if (!store.state.token) {
  //     next({path: '/login'})
  //     ElMessage({type: 'warning', message: 'Oops, 登录状态已失效，请重新登录。。。'})
  //     return false
  //   }
  //   return true
  // }
}

// 全局路由免token
const globalRoutes: Array<RouteRecordRaw> = [
  {path: '/login', name: 'login', component: () => import(/* webpackChunkName: "login" */ '../views/common/login.vue')}
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes: [...globalRoutes, mianRoutes],
  scrollBehavior(to, from, savedPosition) {
    // return { top: 0 } // 始终滚动到顶部
    if (savedPosition) {
      return savedPosition
    } else {
      return { top: 0 }
    }
  }
})

// 路由拦截
router.beforeEach( (to, from, next) => {
  if (isGlobalRoutes(to) || hasDynamic) {
    next()
  } else {
    common.getMenuList().then( ({data}) => {
      hasDynamic = true  // 避免重复调用接口
      mianRoutes.children = addMenuAndRoute(data as IMenu[])
      router.addRoute(mianRoutes)
      next({...to, replace: true})
    })
  }

})

function isGlobalRoutes(route: RouteLocationNormalized) {
  return !!globalRoutes.find(it => it.path === route.path || it.name === route.name)
}

function addMenuAndRoute(data: IMenu[]): RouteRecordRaw[] {
  if (!data || !data.length) return []
  return data.map(it => {
    return {
      path: setRoutePath(it.url),
      name: it.name,
      component: getComponent(it.url),
      meta: {
        menuId: it.id || null,
        title: it.name || null,
        isDynamic: true,
        isTab: it.type === 2 ? true : false
      },
      children: addMenuAndRoute(it.children)
    }
  })
}

function setRoutePath(url: string): string {
  if (url) {
    return url.startsWith('/') ? url : ('/' + url)
  }
  return ''
} 

function getComponent(url: string) {
  if (url) {
    const fullUrl = url.startsWith('/') ? url.slice(1) : url
    try {
      return _import(fullUrl)
    } catch (e) {console.log(e, 'e') }
  }
  return null
}

console.log(router, 'router')

export default router
