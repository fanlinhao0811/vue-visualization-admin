import Vue from 'vue';
import Router from 'vue-router';

Vue.use(Router);

const VueRouterPush = Router.prototype.push
Router.prototype.push = function push (to) {
  return VueRouterPush.call(this, to).catch(err => err)
}

export const constantRouterMap = [
  {
    path: '/',
    component: () => import('@/views/home.vue'),
    children: [
      {
        path: '',
        name: 'home',
        component: () => import('@/views/big-tree-test.vue')
      },
      {
        path: '/rappid',
        name: 'rappid',
        component: () => import('@/views/rappid-demo.vue')
      }
    ]
  }
]

const router = new Router({
  mode: 'hash',
  routes: constantRouterMap
})

router.beforeEach((to, from, next) => {
  document.documentElement.scrollTop = 0;
  next()
})

export default router;
