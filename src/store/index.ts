import { createStore } from 'vuex'

export default createStore({
  state: {
    token: localStorage.getItem('token') || ''
  },
  mutations: {
    SET_TOKEN(state, token: string) {
      state.token = token
      localStorage.setItem('token', token)
    },
    REMOVE_TOKEN(state) {
      state.token = ''
      localStorage.removeItem('token')
    }
  },
  actions: {
  },
  modules: {
  }
})
