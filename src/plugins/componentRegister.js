import Vue from 'vue'
import {camelCase, upperFirst} from 'lodash'

const ComponentRegisterPlugin = {}
ComponentRegisterPlugin.install = function(Vue, options) {
  const requireComponent = require.context('@/components', false, /[A-Z]\w+\.(vue|js)$/)
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
  const nextComponents = require.context('@/components', true, /\.vue$/)
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
}

export default ComponentRegisterPlugin
