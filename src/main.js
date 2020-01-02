// Kernel
import Vue from 'vue'
// Official Packages
import VueRouter from 'vue-router'
import router from '@/router'
import store from '@/store'
// 3rd Packages
import Axios from '@/api'
import DayJs from 'dayjs'
import {upperFirst, camelCase} from 'lodash'
import { createProvider } from './vue-apollo'
// Components
import App from '@/App.vue'
import Toast from '@/components/Toast.vue'

Vue.use(VueRouter)

Vue.prototype.$axios = Axios
Vue.prototype.$time = DayJs
Vue.prototype.$apiUrl = (apiUrl) => {
  if (process.env.NODE_ENV === 'production') {
    return apiUrl
  }
  return 'api' + apiUrl
}
Vue.prototype.$toast = {
  info(text, callBack) {
    if (!text) return
    showToast('info', text, callBack)
  },
  success(text, callBack) {
    if (!text) return
    showToast('success', text, callBack)
  },
  error(text, callBack) {
    if (!text) return
    showToast('error', text, callBack)
  },
  warning(text, callBack) {
    if (!text) return
    showToast('warning', text, callBack)
  }
}

Vue.config.productionTip = false

const requireComponent = require.context('./components', false, /[A-Z]\w+\.(vue|js)$/)
requireComponent.keys().forEach(fileName => {
  const componentConfig = requireComponent(fileName)
  const componentName = upperFirst(
    camelCase(
      fileName.replace(/^\.\/(.*)\.\w+$/, '$1')
    )
  )
  Vue.component(
    componentName,
    componentConfig.default || componentConfig
  )
})
const nextComponents = require.context('./components', true, /\.vue$/)
nextComponents.keys().forEach(fileName => {
  const componentConfig = nextComponents(fileName)
  const componentName = upperFirst(
    camelCase(
      fileName.replace(/^\.\/(.*)\.\w+$/, '$1')
    )
  )
  Vue.component(
    componentName,
    componentConfig.default || componentConfig
  )
})

new Vue({
  store,
  router,
  apolloProvider: createProvider(),
  render: h => h(App)
}).$mount('#app')

function showToast(type, text, icon = 'info', duration = 4000, callBack) {
  const ToastConstructor = Vue.extend(Toast)
  const toastDom = new ToastConstructor({
    el: document.createElement('div'),
    data() {
      return {
        type,
        icon,
        text,
        isShow: true
      }
    }
  })
  document.body.appendChild(toastDom.$el)
  setTimeout(() => {
    toastDom.isShow = false
    callBack && (typeof callBack === 'function') && callBack()
  }, duration)
  setTimeout(() => {
    document.body.removeChild(toastDom.$el)
  }, duration + 1000)
}
