<template>
  <div>
    <el-button  @click="openDialog">切换主题</el-button>
    <el-dialog
      center
      v-model="dialogVisible"
      :title="'选择主题'"
      width="400px">
      <el-form
        :model="colors"
        ref="form"
        class="theme-form"
        label-position="top"
        label-width="70px">
        <el-form-item label="主题色" prop="primary">
          <el-color-picker v-model="colors.primary" ></el-color-picker>
        </el-form-item>
        <el-form-item class="color-buttons">
          <el-button type="primary" @click="submitForm">切换</el-button>
          <el-button @click="resetForm">重置</el-button>
        </el-form-item>
      </el-form>
    </el-dialog>
  </div>
  
</template>

<script lang="ts">
import { Options, Vue } from 'vue-class-component';

@Options({
  props: {

  }
})
export default class HelloWorld extends Vue {
  colors: {primary: string} = {primary: '#409eff'};

  dialogVisible: boolean = false;
  openDialog() {
    this.dialogVisible = true;
  }
  submitForm() {
    const attribute = `--systemThemeColor: ${this.colors.primary};`
    document.querySelector(':root')?.setAttribute('style', attribute)
    console.log(this.colors, 'asdasdads');
  }
  resetForm() {
    this.colors.primary = '#409eff';
  }
}
</script>

<style>

</style>