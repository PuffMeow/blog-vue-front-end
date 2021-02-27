# blog-vue

## Project setup
```
yarn install
```

### Compiles and hot-reloads for development
```
yarn serve
```

### Compiles and minifies for production
```
yarn build
```

### 项目加载优化
 - 使用cdn引入常用的库
 - 前端引入compression-webpack-plugin，nginx中也配置gzip压缩
 - 去掉.map文件，vue.config.js中设置productionSourceMap: false,
 - 安装uglifyjs-webpack-plugin，生成环境中去除console.log