import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router'

const routes: Array<RouteRecordRaw> = [
  {
    path: '/',
    redirect: '/home'
  },
  {
    path: '/home',
    name: 'Home',
    component: () => import(/* webpackChunkName: "home" */ '../pages/Home.vue'),
    children: [
      {
        path: 'group/:qq',
        name: 'GroupChat',
        meta: {
          keepAlive: true
        },
        component: () => import(/* webpackChunkName: "group" */ '../pages/Home/Group.vue')
      },
      {
        path: 'friend/:qq',
        name: 'FriendChat',
        meta: {
          keepAlive: true
        },
        component: () => import(/* webpackChunkName: "friend" */ '../pages/Home/Friend.vue')
      }
    ]
  },
  {
    path: '/login',
    name: 'Login',
    component: () => import(/* webpackChunkName: "login" */ '../pages/Login.vue')
  }
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

export default router
