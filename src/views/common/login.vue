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
          <s-form :searchList="searchList" :formField='formField' :option="{'label-width': '70px', 'label-position': 'left'}"></s-form>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { ref, defineComponent, reactive } from 'vue'

export default defineComponent({
  setup() {
    const searchList = ref([
      {
        prop: 'username', 
        label: '用户名', 
        tagType: 'el-input', 
        config: {
          placeholder: '请输入用户名'
        }
      },
      {
        prop: 'password', 
        label: '密码', 
        tagType: 'el-input', 
        config: {
          placeholder: '请输入密码',
          'show-password': true
        },
      }
    ])
    return {
      searchList,
      formField: reactive(
        {
          username: ''
        }
      ) 
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
}
</style>