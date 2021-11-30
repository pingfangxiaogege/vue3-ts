<template>
  <el-sub-menu
    v-if="menu.children && menu.children.length >= 1"
    :index="menu.id + ''"
  >
    <template #title>
      <span>{{ menu.name }}</span>
    </template>
    <sub-menu v-for="item in menu.children" :key="item.id" :menu="item"></sub-menu>
  </el-sub-menu>
  <el-menu-item v-else :index="menu.id + ''" @click="gotoRouteHandle(menu)">
    <span>{{ menu.name }}</span>
  </el-menu-item>
</template>

<script lang="ts">
import { IMenu } from '@/api/response-type'
import { defineComponent, toRefs } from 'vue'

export default defineComponent({
  props: {
    menu: {
      type: Object,
      default: () => ({})
    }
  },
  setup(props) {

    function gotoRouteHandle(menu: IMenu) {
      console.log(menu, 'menu')
    }
    return {
      gotoRouteHandle
    }
  }
})
</script>