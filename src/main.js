import Vue from 'vue'
import App from './App'
import store from './store'

import api from '@/lib/api/plugin'
import boot from './config/boot'
import uView from 'uview-ui'

import AppPage from '@/components/AppPage/ui/MPAppPage/index.vue'
import tabbar from '@/components/TabBar/index.vue'

Vue.use(api)
Vue.use(uView)

Vue.component('AppPage', AppPage)
Vue.component('tab-bar', tabbar)

boot.configVue()
boot.configUtil()

App.mpType = 'app'

const app = new Vue({
  store,
  ...App
})
app.$mount()
