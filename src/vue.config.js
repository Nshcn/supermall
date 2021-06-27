module.exports = {
  configureWebpack:{
    resolve:{
      alias:{
        // 默认有一个 'src':'@' 的配置
        'assets':'@/assets',
        'common':'@/common',
        'components':'@/components',
        'views':'@/views',
      }
    }
  }
}