<!--
 * @Descripttion:
 * @version: 1.0.0
 * @Author: LiuXin
 * @Date: 2021-12-22 16:05:17
 * @LastEditors: LiuXin
 * @LastEditTime: 2021-12-22 17:30:01
-->
<template>
  <div>
    <infinit-list :list="list" :item-height="itemHeight">
      <template scope="data">
        <div>
          {{ data.item.text }}
        </div>
      </template>
    </infinit-list>
  </div>
</template>
<script>
export default {
  name: 'List',
  data() {
    return {
      list: new Array(100).fill({}).map((item, index) => ({
        text: `this is line ${index}`
      })),
      itemHeight: 500
    }
  }
}
</script>
<style lang="less" scoped>

</style>
