const { defineConfig } = require('@vue/cli-service')
module.exports = defineConfig({
  transpileDependencies: true,
  devServer: {
    proxy: {
      '/api_url': {
        target: 'https://api-bee-system-cluster01.iems-acl.wise-insightapm.com',
        changeOrigin: true,
        pathRewrite: { '^/api_url': '' }
      },
      '/portal_url': {
        target: 'https://portal-apm-system-cluster01.iems-acl.wise-insightapm.com',
        changeOrigin: true,
        pathRewrite: { '^/portal_url': '' }
      },
      '/nelson_api': {
        target: 'https://k4pk01yup7.execute-api.us-west-2.amazonaws.com',
        changeOrigin: true,
        pathRewrite: { '^/nelson_api': '' }
      },
    }
  }
})
