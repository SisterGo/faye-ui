// 所有组件总入口
import test from './test'
import testB from './testB'
import sign from './sign'
import infinitList from './infinitList'
export default {
  install(Vue) {
    Vue.use(test)
    Vue.use(testB)
    Vue.use(sign)
    Vue.use(infinitList)
  }
}
