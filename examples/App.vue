<!--
 * @Descripttion: 
 * @version: 1.0.0
 * @Author: LiuXin
 * @Date: 2021-10-19 22:11:17
 * @LastEditors: LiuXin
 * @LastEditTime: 2021-10-19 23:25:01
-->
<template>
  <div id="app">
    <router-view/>
  </div>
</template>

<style lang="less">
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

#nav {
  padding: 30px;

  a {
    font-weight: bold;
    color: #2c3e50;

    &.router-link-exact-active {
      color: #42b983;
    }
  }
}
</style>
