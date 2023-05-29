import { createRouter, createWebHashHistory } from 'vue-router'


const router = createRouter({
  history: createWebHashHistory(),
  routes: [
    {
      path: '/user',
      component: () => import('../components/user.vue')
    },
    {
      path: '/',
      component: () => import('../components/login.vue')
    },
  ]
})

export default router
