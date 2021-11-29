<template>
  <div class="login">
    <div class="left">
      <img src="../../assets/image/login/logo.png" alt="" srcset="">
      <div class="banquan">Copyright@2021 REDMOND</div>
    </div>
    <div class="right">
      <div class="login-box">
        <div class="login-bg"></div>
        <div class="login-content">
          <h3>WELCOME BACK</h3>
          <s-form :searchList="searchList" :formField='formField'
           :option="{'label-width': '0px', 'label-position': 'left'}">
            <template #action="{form}">
              <el-button type="primary" class="w-100 btn" @click="login(form)">登录</el-button>
            </template>
          </s-form>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { ref, defineComponent, reactive } from 'vue'
import { useRouter } from 'vue-router'
import { formList } from '@/curd/login'
import request from '@/api'
import { CLogin } from '@/types/common'

export default defineComponent({
  setup() {
    const router = useRouter()

    const formField = reactive(new CLogin())
    
    const searchList = ref(formList)

    function login(form: any) {
      form.validate((valid: boolean) => {
        if (!valid) return
        request.login(formField).then( ({data}) => {
          router.push('/')
        })
      })
    }

    return {
      searchList,
      formField,
      login
    }
  }
})
</script>

<style scoped lang="scss">
.login {
  width: 100%;
  height: 100vh;
  display: flex;
  .left {
    width: 38.5%;
    background: url('../../assets/image/login/left-bg.png');
    background-size: cover;
    .banquan {
      color: white;
      margin-top: 25px;
    }
  }
  .right {
    flex: auto;
    background: url('../../assets/image/login/right-bg.png');
    background-size: cover;
  }
  .right, .left {
    display: flex;
    align-items: center;
    justify-content: center;
    flex-direction: column;
  }
  &-box {
    position: relative;
    width: 600px;
    height: 600px;
    background: linear-gradient(224deg, transparent 80px, rgb(242, 247, 248) 0);
  }
  &-bg {
    opacity: 0.5;
    height: 100%;
    width: 100%;
    position: relative;
    border-radius: 10px;
    box-shadow: 6px 6px 24px 0px rgba(157, 162, 168, 0.28);
  }
  &-content {
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    padding: 100px 80px;
    h3 {
      font-size: 40px;
      color: #292929;
      margin-bottom: 82px;
    }
  }
  ::v-deep .el-form-item {
    margin-bottom: 40px;
  }
  .btn {
    margin-top: 30px;
  }
}
</style>