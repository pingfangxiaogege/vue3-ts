<template>
  <el-form ref="form" v-model="formField" @submit.prevent v-bind="option">
    <el-row :gutter="20">
      <el-col v-for="(formItem, index) in searchList" :key="index+'formItem'" :span="formItem.span">
        <el-form-item :prop="formItem.prop" :label="formItem.label">
          <!-- <component :is="getComponent(formItem.tagType)" v-bind="getBind(formItem)" v-on="getEvents(formItem)"></component> -->
          <sFormItem :formField="formField" :formItem="formItem">
            <!-- 传递给子节点的slot -->
            <template #[name] v-for="name in Object.keys($slots)">
              <slot :name="name" v-bind="{formField, prop: formItem.prop}"></slot>
            </template>
          </sFormItem>
        </el-form-item>
      </el-col>
      <el-col :span="24">
        <slot name="action" v-bind="{clearAll, search}" :form='form'>
          <div class="text-right">
            <el-button @click="clearAll">清空</el-button>
            <el-button type="primary" @click="search">查询</el-button>
          </div>
        </slot>
      </el-col>
    </el-row>
  </el-form>
</template>

<script lang="ts">
import { defineComponent, ref  } from 'vue'
import sFormItem from './s-form-item.vue'
export default defineComponent({
  name: 'sForm',
  components: {
    sFormItem
  },
  props: {
    formField: {
      type: Object,
      default: () => ({})
    },
    searchList: {
      type: Array,
      default: () => []
    },
    option: {
      type: Object,
      default: () => ({})
    }
  },
  setup(props, {emit, slots}) {
    console.log(slots, 'slots')
    const form = ref(null)
    return {
      form,
      clearAll() {
        if (form.value) {
          (form.value as any).resetFields()
        }
      },
      search() {
        emit('search', {form, formField: props.formField})
      }
    }
  }
})
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
</style>
