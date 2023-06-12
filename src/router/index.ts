import { createRouter, createWebHashHistory } from 'vue-router'


const router = createRouter({
  history: createWebHashHistory(),
  routes: [
    {
      path: '/user',
      component: () => import('../views/user.vue')
    },
    {
      path: '/',
      component: () => import('../views/login.vue')
    },
  ]
})

export default router
