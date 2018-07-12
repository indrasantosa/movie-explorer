const webpack = require('webpack')
require('dotenv').config()

module.exports = {
  serverRuntimeConfig: { // Will only be available on the server side
    mySecret: 'secret'
  },
  publicRuntimeConfig: { // Will be available on both server and clie
    apiUrl: process.env.API_URL,
    apiKey: process.env.API_KEY,
    staticFolder: '/static'
  }
}