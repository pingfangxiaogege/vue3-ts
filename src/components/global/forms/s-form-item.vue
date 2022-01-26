<script lang="ts">
import { defineComponent, h, resolveDynamicComponent, Slot, VNode } from 'vue'
import { firstUppcase } from '@/utils'
import {resolveFormComp} from './s-form-item'
export default defineComponent({
  props: {
    formItem: {
      type: Object,
      default: () => {}
    },
    formField: {
      type: Object,
      default: () => {}
    }
  },
  setup(props, {slots, attrs, emit, expose}) {
    const { formItem, formField} = props
    const { tagType , config, on } = formItem

    function translateEventName(name: string): string {
      // 如果不以on开头的，把首字母大写然后拼接on，否则从on后面截取字符并大写首字母拼接on
      return 'on' + !(name.toLowerCase().startsWith('on')) ? firstUppcase(name) : firstUppcase(name.substr(2))
    }

    function resolveOn() {
      const bind: {[key: string]: Function} = {}
      let eventName = 'onInput'
      if (tagType === 'select' || tagType === 'checkbox ' || tagType === 'radio') {
        eventName = 'onChange'
      }
      bind[eventName] = (e: string | number | Array<unknown> | Date) => {
        formField[formItem.prop] = e
        emit('changeForm', formField, formItem)
      }
      return bind
    }

    function resolveBind() {
      const bindProps = {
        modelValue: formField[formItem.prop],
        ...config
      }
      return bindProps
    }

    // 渲染slot，要区分输入框前后缀，选择框下拉选项
    function renderChildren() {
      const defineSlots: {[name: string]: Slot; } = {}
      // suffix, prefix 前后缀区分#号，分为直接写名称（内部自动slot）和外部手动slot。
      // options 主要为自动遍历生成子节点
      const {options} = formItem
      const inputSlots = ['suffix', 'prefix', 'prepend', 'append']
      inputSlots.forEach( (name: string) => {
        if (formItem[name]) {
          defineSlots[name] = formItem[name] && discriminantSign(formItem[name])
        }
      })
   
      if (options) {
        // if (Array.isArray(options)) {
        // }
        // let childName = 'el-option';
        // if (tagType === 'select' || tagType === 'checkbox ' || tagType === 'radio') {
        // }
      }
      
      return defineSlots
    }

    function discriminantSign(slot: string | Function | any ) {
      if (typeof slot === 'string') {
        const [nameType, ...rest] = slot
        // #号为手动slot  只需要从html中获取
        if (nameType === '#' ) {
          const name = rest.join('')
          if (slots[name]) {
            return slots[name]
          }
          console.error(`${slot}没有相应的模板`) 
        }
      } else if (typeof slot === 'function') {
        if (slot('asdsad').render) return () => slot('asdsad').render()
        return () => slot('asdsad')
      } else if (slot.render) {
        return () => slot.render()
      } else {
        return () => slot
      }
    }


    function renderDynamicComponent() {
      if (!resolveFormComp[tagType]) {
        throw 'tagType有误，请查看form-item.ts适配正确的tagType'
      }
      const comp = resolveDynamicComponent(resolveFormComp[tagType]) as VNode
      return h(comp, {...resolveOn(), ...resolveBind() }, { ...renderChildren()} )
    }
    
    return () => renderDynamicComponent()
  }
})
</script>

<style>

</style>