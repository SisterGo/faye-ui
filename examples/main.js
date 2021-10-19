import Vue from 'vue'
import App from './App.vue'
import router from './router'
import test from '@/index'

Vue.config.productionTip = false
Vue.use(test)
new Vue({
  router,
  render: h => h(App)
}).$mount('#app')