import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import '@/assets/css/reset.css'
import '@/assets/js/rem.js'
import Vant from 'vant'
import 'vant/lib/index.css'
import axios from 'axios'
import './assets/icon/iconfont.css'
Vue.use(Vant)

Vue.config.productionTip = false
Vue.prototype.$http = axios

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
