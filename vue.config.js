const { defineConfig } = require('@vue/cli-service')
module.exports = defineConfig({
  transpileDependencies: true,
  devServer: {
    allowedHosts: [
      'elb.amazonaws.com', // 允许访问的域名地址，即花生壳内网穿透的地址
      '.elb.amazonaws.com'   // .是二级域名的通配符   
    ],
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
