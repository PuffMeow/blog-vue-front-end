import Vue from 'vue';
import App from './App.vue';
import router from './router';
import store from './store';
import './plugins/element'
import infiniteScroll from 'vue-infinite-scroll';
Vue.use(infiniteScroll);
import './utils/canvas-nest.min'
// 定义全局的时间过滤器
Vue.filter('dateFormat', function (dateStr, formatStr = 'YYYY-MM-DD HH:mm') {
  return moment(dateStr).format(formatStr);
});



new Vue({
  router,
  store,
  render: h => h(App),
}).$mount('#app');