// 所有组件总入口
import test from './test'
import testB from './testB'
export default {
  install(Vue) {
    Vue.use(test)
    Vue.use(testB)
  }
}
