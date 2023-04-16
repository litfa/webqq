import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router'

const routes: Array<RouteRecordRaw> = [
  {
    path: '/',
    name: 'Home',
    component: () => import(/* webpackChunkName: "home" */ '../pages/Home.vue')
  },
  {
    path: '/group/:qq',
    name: 'GroupChat',
    component: () => import(/* webpackChunkName: "home" */ '../pages/Chat.vue')
  },
  {
    path: '/friend/:qq',
    name: 'FriendChat',
    component: () => import(/* webpackChunkName: "home" */ '../pages/Chat.vue')
  }
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

export default router
