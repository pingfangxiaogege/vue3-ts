import { IMenu } from '@/api/response-type'
import { createStore } from 'vuex'

export default createStore({
  state: {
    token: localStorage.getItem('token') || '',
    menuList: [] as IMenu[],
    hasDynamicRouter: false
  },
  mutations: {
    SET_TOKEN(state, token: string) {
      state.token = token
      localStorage.setItem('token', token)
    },
    REMOVE_TOKEN(state) {
      state.token = ''
      localStorage.removeItem('token')
    },
    SET_MENULIST(state, list: IMenu[]) {
      state.menuList = list
    },
    SET_DYNAMICROUTER(state, hasDynamic: boolean) {
      state.hasDynamicRouter = hasDynamic
    }
  },
  actions: {
  },
  modules: {
  }
})
