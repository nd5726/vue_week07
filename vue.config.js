const { defineConfig } = require('@vue/cli-service')
module.exports = defineConfig({
  transpileDependencies: true,
  publicPath: process.env.NODE_ENV === 'production'
    ? '/vue_cli01/' // 這裡要換成你的儲存庫名稱
    : '/'
})
