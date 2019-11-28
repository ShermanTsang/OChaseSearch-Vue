import Vue from 'vue'
import App from './App.vue'

import VueRouter from 'vue-router'
import router from './router'
import Axios from './api'
import {upperFirst,camelCase,kebabCase} from 'lodash'

Vue.use(VueRouter)

Vue.prototype.$axios=Axios

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
  const componentName = kebabCase(
    fileName.replace(/^\.\/(.*)\.\w+$/, '$1')
  )
  Vue.component(
    componentName,
    componentConfig.default || componentConfig
  )
})

new Vue({
  router,
  render: h => h(App),
}).$mount('#app')
