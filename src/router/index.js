import { createRouter, createWebHistory } from 'vue-router'

import LoginView from '../views/LoginView.vue'
import SignupView from '../views/SignupView.vue'
import HomeView from '@/views/HomeView.vue'

const routes = [
  // {
  //   path: '/',
  //   name: 'Home',
  //   component: HomeView
  // },
  // {
  //   path: '/about',
  //   name: 'About',
  //   component: AboutView,
  //   meta: { requiresAuth: true }
  // },
  {
    path: '/',
    name: 'Home',
    component: HomeView
  },
  {
    path: '/login',
    name: 'Login',
    component: LoginView
  },
  {
    path: '/signup',
    name: 'Signup',
    component: SignupView
  }
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

// router.beforeEach((to, from, next) => {
//   if (to.meta.requiresAuth && !isAuthenticated.value) {
//     alert('You Must Login First!')
//     next({ name: 'Login' })
//   } else {
//     next()
//   }
// })

export default router
