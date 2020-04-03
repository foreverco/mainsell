/**
 * 项目统一配置项
 */

const config = {
    //项目名
    project_name: '国草园后台管理系统',
  
    //文件上传路径
    file: {
      UPLOAD: '/file/upload/',
      DELETE: '/file/del/',
      DOWNLOAD: '/file/download/'
    },
    //代理路径设置
    proxy: {
      default: '/api',
      hur:'/hurui'
    }
  }
  
  export const METHOD = {
    GET: 'GET',
    POST: 'POST',
    PUT: 'PUT',
    DELETE: 'DELETE'
  }
  
  export default config
  
  