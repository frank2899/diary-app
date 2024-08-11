import { createRouter, createWebHistory } from '@ionic/vue-router';
import { RouteRecordRaw } from 'vue-router';

const routes: Array<RouteRecordRaw> = [
  {
    path: '/',
    component: () => import('@/views/Home.vue')
  },
  {
    path: '/panel',
    component: () => import('@/views/Panel.vue')
  },
  // {
  //   path: 'tab2',
  //   component: () => import('@/views/Tab2Page.vue')
  // },
  // {
  //   path: 'tab3',
  //   component: () => import('@/views/Tab3Page.vue')
  // }
]

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes
})

export default router
