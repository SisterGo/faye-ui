import Vue from 'vue'
import App from './App.vue'
import router from './router'
import packages from '@/index'

Vue.config.productionTip = false
Vue.use(packages)
new Vue({
  router,
  render: h => h(App)
}).$mount('#app')
