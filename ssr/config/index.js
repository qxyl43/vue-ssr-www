let config
const isProd = process.env.NODE_ENV === 'production'

if (isProd) {
  config = require('./config.prod.js')
} else {
  try {
    config = require('./config.dev.js')
  } catch (e) {
    console.log(e);
    console.error('请在本地项目中创建配置文件 config/config.dev.js', '\n')
    process.exit(0)
  }
}

module.exports = config
