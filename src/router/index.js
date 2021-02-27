import Vue from 'vue';
import VueRouter from 'vue-router';
import store from '../store/index'

Vue.use(VueRouter);
import NProgress from 'nprogress';
import 'nprogress/nprogress.css';

const routes = [{
  path: '/',
  name: 'Navigation',
  component: () => import('../views/Navigation.vue'),
},
{
  path: '/blog',
  name: 'blog',
  component: () => import('../views/Blog.vue'),
  meta: {
    keepAlive: true,
  },
},
{
  path: '/blogDetail/:id',
  name: 'blogDetail',
  component: () => import('../views/BlogDetail.vue'),
  props: true,
},
{
  path: '/messageBoard',
  name: 'messageBoard',
  component: () => import('../views/MessageBoard.vue'),
},
{
  path: '/img',
  name: 'img',
  component: () => import('../views/Img.vue'),
  meta: {
    keepAlive: true,
  },
},
{
  path: '/imgDetail/:id',
  name: 'imgDetail',
  component: () => import('../views/ImgDetail.vue'),
  props: true,
},
{
  path: '*',
  name: 'error',
  component: () => import('../views/Error.vue'),
},
{
  path: '/music',
  name: 'music',
  component: () => import('../views/Music.vue'),
  meta: {
    keepAlive: true,
  },
},
];

const router = new VueRouter({
  base: process.env.BASE_URL,
  routes,
});

router.beforeEach((to, from, next) => {
  // console.log(to)
  if (to.path !== '/music') {
    store.commit('changePlayerState', false)
  } else {
    store.commit('changePlayerState', true)
  }
  NProgress.start();
  next();
});

router.afterEach(() => {
  NProgress.done();
});

export default router;