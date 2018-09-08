import Vue from 'vue'
import App from './App.vue'
import router from './router'
import iView from 'iview'
import './theme/iview/index.less'

Vue.use(iView)

Vue.config.productionTip = false

new Vue({
  router,
  render: h => h(App)
}).$mount('#app')
