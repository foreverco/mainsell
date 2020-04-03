module.exports = {
   devServer: {
      proxy: {
        '/api': {
          target: 'http://127.0.0.1:9001',
          ws: true,
          changeOrigin: true,
          pathRewrite: {
            '^/api': ''  //通过pathRewrite重写地址，将前缀/api转为/
          }
        },
        '/hurui': {
          target: 'http://192.168.1.142:8080',
          changeOrigin: true,
          pathRewrite: {
            '^/hurui': ''  //通过pathRewrite重写地址，将前缀/api转为/
          }
        }
      }
    }
 }
 // .env.development
// VUE_APP_BASE_API='/api'