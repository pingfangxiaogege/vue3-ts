<template>
  <el-aside width="250px">
    <el-menu>
      <sub-menu v-for="menu in menuList" :key="menu.id" :menu="menu"></sub-menu>
    </el-menu>
  </el-aside>
</template>

<script lang="ts">
import { IMenu } from '@/api/response-type'
import { computed, defineComponent } from 'vue'
import { useStore } from 'vuex'
import subMenu from './sub-menu.vue'

export default defineComponent({
  components: {
    subMenu
  },
  setup() {
    const store = useStore()
    const menuList = computed<IMenu[]>(() => store.state.menuList)

    return {
      menuList
    }
  }
})
</script>

<style>

</style>