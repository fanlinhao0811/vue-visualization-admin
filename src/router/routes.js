import Home from '../view/Home.vue';

export default [
  {
    path: '/',  // 重定向到home页面
    redirect: '/home'
  },
  {
    path: '/home',
    component: Home
  }
]