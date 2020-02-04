// Kernel
import Vue from 'vue'
// Official Packages
import VueRouter from 'vue-router'
import router from '@/router'
import store from '@/store'
// 3rd Packages
import DayJs from 'dayjs'
import {upperFirst, camelCase} from 'lodash'
import { createProvider } from './vue-apollo'
import VueI18n from 'vue-i18n'
// Plugins
import Axios from '@/plugins/axios'
import Toast from '@/plugins/toast'
import ComponentRegister from '@/plugins/componentRegister'
import VTransfer from '@/plugins/v-transfer'
// Components
import App from '@/App.vue'

Vue.use(VueRouter)
Vue.use(VueI18n)
Vue.use(Toast)
Vue.use(ComponentRegister)
Vue.use(VTransfer)

Vue.prototype.$axios = Axios
Vue.prototype.$time = DayJs
Vue.prototype.$apiUrl = (apiUrl) => {
  if (process.env.NODE_ENV === 'production') {
    return apiUrl
  }
  return 'api' + apiUrl
}

Vue.directive('focus', {
  inserted: function(el,binding = true) {
    if(binding.value) {
    el.focus()
    }
  }
})

Vue.config.productionTip = false

new Vue({
  store,
  router,
  apolloProvider: createProvider(),
  render: h => h(App)
}).$mount('#app')
