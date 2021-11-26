<template>
  <el-form ref="form" :model="formField" @submit.prevent v-bind="option">
    <el-row :gutter="20">
      <el-col v-for="(formItem, index) in searchList" :key="index+'formItem'" :span="formItem.span">
        <el-form-item :prop="formItem.prop" :label="formItem.label" v-bind="formItem">
          <form-comp :formItem="formItem" :formField="formField" v-if="formItem.tagType !== 'slot'">
            <template #[name] v-for="name in Object.keys($slots)">
              <slot :name="name" v-bind="{formField, prop: formItem.prop}"></slot>
            </template>
          </form-comp>
          <slot v-else :name="formItem.prop" v-bind="{formField, prop: formItem.prop}"></slot>
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
import { defineComponent, ref } from 'vue'
import formComp from './form-comp.vue'
import ItemTsx from './item-tsx.vue'
export default defineComponent({
  name: 'sForm',
  inheritAttrs: false,
  components: {
    formComp,
    ItemTsx
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
  setup(props, {emit}) {
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
