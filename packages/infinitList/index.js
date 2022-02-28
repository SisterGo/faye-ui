import infinitList from './index.vue'
infinitList.install = function(Vue) {
  Vue.component(infinitList.name, infinitList)
}
export default infinitList
