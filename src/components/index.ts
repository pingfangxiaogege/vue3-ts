// 注册全局组件
import { createApp } from 'vue'
import { components } from './global'

export function registeGlobalComponent(
  app: ReturnType<typeof createApp>
): void {
  components.forEach( ({name, component}) => {
    app.component(name, component)
  })
}