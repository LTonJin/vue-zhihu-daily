// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import './assets/base.css'
import Vue from 'vue'
import App from './App'
import router from './router'

import 'mint-ui/lib/style.css'
import Mint from 'mint-ui';
Vue.use(Mint);

import axios from 'axios'
Vue.prototype.$http = axios

import $ from 'jquery'

Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  components: { App },
  template: '<App/>'
})
