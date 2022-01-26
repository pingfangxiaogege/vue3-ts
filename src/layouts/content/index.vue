<template>
  <el-main>
    <router-view></router-view>
  </el-main>
</template>

<script>
import { defineComponent } from 'vue'

export default defineComponent ({
  setup() {
    return {
      searchList: [
        {
          prop: 'username', 
          label: '账号', 
          tagType: 'el-select', 
          config: {
            placeholder: '账号',
            options: [
              {label: '平凡', value: '123'}
            ]
          }
        }
      ],
      formField: {}
    }
  }
})
</script>

<style>

</style>