import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router'

const routes: Array<RouteRecordRaw> = [
  {
    path: '/',
    name: 'Home',
    component: () => import(/* webpackChunkName: "home" */ '../pages/Home.vue')
  },
  {
    path: '/login',
    name: 'Login',
    component: () => import(/* webpackChunkName: "login" */ '../pages/Login.vue')
  },
  {
    path: '/group/:qq',
    name: 'GroupChat',
    component: () => import(/* webpackChunkName: "group" */ '../pages/Group.vue')
  },
  {
    path: '/friend/:qq',
    name: 'FriendChat',
    component: () => import(/* webpackChunkName: "friend" */ '../pages/Friend.vue')
  }
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

export default router
