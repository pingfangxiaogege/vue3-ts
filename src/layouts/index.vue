<template>
  <el-container>
    <slider></slider>
    <el-container class="is-vertical">
      <v-header></v-header>
      <content></content>
      <v-footer></v-footer>
    </el-container>
  </el-container>
</template>

<script lang="ts">
import { Options, Vue } from 'vue-class-component';
import header from './header/index.vue';
import footer from './footer/index.vue';
import slider from './slider/index.vue';
import content from './content/index.vue';

@Options({
  components: {
    'v-header': header,
    'v-footer': footer,
    slider,
    content
  }
})

export default class Home extends Vue {}
</script>

<style lang="scss" scoped>
.el-header,
.el-footer {
  background-color: #b3c0d1;
  text-align: center;
}

.el-aside {
  background-color: #d3dce6;
  text-align: center;
  height: 100vh;
}

.el-main {
  background-color: #e9eef3;
  text-align: center;
  line-height: 160px;
}

body > .el-container {
  margin-bottom: 40px;
}
// color: var(--el-text-color-primary);
</style>