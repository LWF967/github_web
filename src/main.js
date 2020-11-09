// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import axios from 'axios'
import ElementUI  from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import SIdentify from './page/Identify'

Vue.component("SIdentify",SIdentify);

Vue.use(ElementUI)

Vue.config.productionTip = false
Vue.prototype.HOST = 'http://localhost:3000'

window.axios = require('axios');
window.axios.defaults.headers.common['X-Requested-With'] = 'XMLHttpRequest'
Vue.prototype.$http = window.axios

// axios.defaults.withCredentials=true
// Vue.prototype.$http = axios


/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  components: { App },
  template: '<App/>'
})
