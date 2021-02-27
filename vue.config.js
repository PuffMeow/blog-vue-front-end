module.exports = {
  publicPath: './',
  // productionSourceMap: false,

  chainWebpack: config => {
    // 在这里设置 需要cdn的依赖和插件
    config.set('externals', {
      vue: 'Vue',
      'vue-router': 'VueRouter',
      axios: "axios",
      'moment': "moment",
      'element-ui': 'ELEMENT'
    })
    if (process.env.NODE_ENV === 'production') {
      config
        .plugin('gzip-plugin')
        .use('compression-webpack-plugin', [
          {
            filename: '[path].gz[query]',
            algorithm: 'gzip',
            test: '/\.js$|\.html$|\.json$|\.css$/',
            threshold: 0,//只有大小大于该值才会被处理
            minRatio: 0.8,//只有压缩率小于这个值的资源才会处理
            deleteOriginalAssets: true //删除源文件
          }
        ]).end()
    }
    //这是一个方法,对config进行了操作之后必须要return出来
    return config
  },
};