<script lang="ts">
import { defineComponent, h, toRefs, resolveComponent, VNode, Slot } from 'vue'
import { firstUppcase } from '@/utils'

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

    const { formItem, formField} = toRefs(props)
    const { config, tagType , on } = formItem.value

    function getSlotsContent() {
      const defaultSlot: {[key: string]: Slot} = {}
      const { slotNamesByTemplate, childSlot } = config
      if (slotNamesByTemplate ) {
        if ( Array.isArray(slotNamesByTemplate) && slotNamesByTemplate.length) {
          slotNamesByTemplate.forEach( name => {
            if (slots && slots[name]) {
              defaultSlot[name] = slots[name] as Slot
            }
          })
        } else {
          throw 'slotNamesByTemplate接收字符串类型的数组'
        }
      }

      if (childSlot && JSON.stringify(childSlot) !== '{}') {
        for (const name in childSlot) {
          if (Object.prototype.hasOwnProperty.call(childSlot, name)) {
            const element = childSlot[name]
            defaultSlot[name] = element
          }
        }
      }
      return defaultSlot
    }

    function translateEventName(name: string): string {
      // 如果不以on开头的，把首字母大写然后拼接on，否则从on后面截取字符并大写首字母拼接on
      return 'on' + !(name.toLowerCase().startsWith('on')) ? firstUppcase(name) : firstUppcase(name.substr(2))
    }

    function resolveOn(bindOn: {[key: string]: Function}) {
      const defaultEventName = 'onInput'
      if (tagType === 'el-input') {
        bindOn[defaultEventName] = (e: string | number | Array<unknown> | Date) => {
          formField.value[formItem.value.prop] = e
        }
      }
      if (on) {
        for (const name in on) {
          if (Object.prototype.hasOwnProperty.call(on, name)) {
            const eventName = translateEventName(name)
            bindOn[eventName] = on[name]
          }
        }
      }
    }

    function renderDynamicComponent() {
      const comp = resolveComponent(tagType) as VNode
 
      // 结构事件以及options
      const {options, ...compProps} = config
      
      const bindOn: {[key: string]: Function} = {}
      const bindProps = {
        modelValue: formField.value[formItem.value.prop],
        ...compProps
      }
      resolveOn(bindOn)
      
      return h(comp, {...bindOn, ...bindProps }, getSlotsContent())
    }
    
    return () => renderDynamicComponent()
  }
})
</script>

<style>

</style>