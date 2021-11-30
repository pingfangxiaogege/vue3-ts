<template>
  <el-header height="60px">
    <el-row justify="space-between" align="middle" class="h-100">
      <el-col :span="2">
        <div class="logo">
          <a href="/">PINGFAN</a>
        </div>
      </el-col>
      <el-col :span="2">
        <div class="menu">
          <el-dropdown :show-timeout="0" placement="bottom">
            <span class="el-dropdown-link">
              {{ userName }}
              <el-icon class="el-icon--right"><i-caret-bottom /></el-icon>
            </span>
            <template #dropdown>
              <el-dropdown-menu >
                <el-dropdown-item @click="logoutHandle()">退出</el-dropdown-item>
              </el-dropdown-menu>
            </template>
          </el-dropdown>
        </div>
      </el-col>
    </el-row>
  </el-header>
</template>

<script>
import { defineComponent } from 'vue';
import { useRouter } from 'vue-router';
import { useStore } from 'vuex';
export default defineComponent ({

  setup() {
    const store = useStore()
    const router = useRouter()

    function logoutHandle() {
      store.commit('REMOVE_TOKEN')
      store.commit('SET_DYNAMICROUTER', false)
      router.push({path: '/login'})
    }

    return {
      logoutHandle,
      userName:  'pingfan'
    }
  }
})
</script>

<style scoped>
</style>