<!--
 * @Descripttion: 
 * @version: 1.0.0
 * @Author: LiuXin
 * @Date: 2021-10-19 22:11:35
 * @LastEditors: LiuXin
 * @LastEditTime: 2021-10-20 16:15:53
-->
# faye-ui
## 快速上手
> 介绍 通过本文你可以了解到 faye 的安装方法和基本使用姿势。

## 安装
### 通过npm安装
```
  npm i faye-ui -S
```
### 通过yarn安装
```
  yarn add faye-ui
```
## 引入组件
### 方式一. 自动按需引入组件 (推荐)
babel-plugin-import 是一款 babel 插件，它会在编译过程中将 import 的写法自动转换为按需引入的方式。

```
# 安装插件
npm i babel-plugin-import -D
```
```
// 在.babelrc 中添加配置
// 注意：webpack 1 无需设置 libraryDirectory
{
  "plugins": [
    ["import", {
      "libraryName": "faye-ui",
      "camel2DashComponentName": false,
      "camel2UnderlineComponentName": false
    }]
  ]
}
```

```
// 接着你可以在代码中直接引入 faye-ui 组件
// 插件会自动将代码转化为方式二中的按需引入形式
import { Test } from 'faye-ui';
```
### 方式二 手动按需引入组件
在不使用插件的情况下，可以手动引入需要的组件。
```
import Test from 'faye-ui/lib/test';
```
### 方式三. 导入所有组件
faye-ui 支持一次性导入所有组件，引入所有组件会增加代码包体积，因此不推荐这种做法。
```
import Vue from 'vue';
import Faye from 'faye-ui';

Vue.use(Faye);
```