'use strict'
const defaultConfig = require('./default')

let customConfig = {}
try {
  customConfig = require('./custom').default
} catch (e) {
  customConfig = {}
}

const config = { ...defaultConfig, ...customConfig }

if (process.env.NODE_ENV !== 'production') {
  console.log('project configuration')
  console.log(config)
}

module.exports = config
