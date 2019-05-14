const merge = require('webpack-merge')
const dev = require('./config.dev')

module.exports = merge(dev, {
  API_BASE: '',
  APP_BASE: '',
  PORT: 3002,
})
