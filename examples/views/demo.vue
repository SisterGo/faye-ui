<!--
 * @Descripttion:
 * @version: 1.0.0
 * @Author: LiuXin
 * @Date: 2021-10-20 00:47:57
 * @LastEditors: LiuXin
 * @LastEditTime: 2021-12-22 16:05:23
-->
<template>
  <div>
    <!-- <test/>
    <test-b/>
    <Sign ref="myCanvas" class="sign"/>

    <button class="button-render" @click="overwrite">
      重写
    </button>
    <button class="button-render" @click="undo">
      撤销
    </button>
    <button class="button-render" @click="commit">
      提交签名
    </button> -->
  </div>
</template>
<script>
export default {
  methods: {
    overwrite() {
      this.$refs.myCanvas.overwrite()
    },
    undo() {
      this.$refs.myCanvas.undo()
    },
    commit() {
      const imgData = this.$refs.myCanvas.commit()
      console.log(imgData)
    }
  }
}
</script>
<style scoped>
.sign{
  width:100%;
  height: 400px;
  border:1px solid #000;
}
</style>
