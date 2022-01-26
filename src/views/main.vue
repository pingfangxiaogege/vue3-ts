<template>
  <div>
    <div style="width: 199px; height: 20px; background: red;">首页</div>
    <s-form :searchList="searchList" :formField='formField'
      :option="{'label-width': '100px', 'label-position': 'left'}">
      <template #suffix>
        456
      </template>
      <template #prefix2>
        <el-icon class="el-input__icon"><search /></el-icon>
      </template>
    </s-form>
  </div>
</template>

<script  lang="ts">
import { defineComponent, reactive } from 'vue'
import { Calendar, Search } from '@element-plus/icons'

export default defineComponent ({
  components: {
    Search
  },
  setup() {
    return {
      searchList: [
        {
          prop: 'username',
          label: '账号', 
          tagType: 'input',
          suffix: '#suffix',
          prefix: '#prefix2',
          prepend: '#suffix',
          append: '#suffix',
      
        }
      ],
      formField: reactive({
        username: '123'
      })
    }
  }
})
</script>

<style>

</style>