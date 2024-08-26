import { createRouter, createWebHistory } from 'vue-router'

import SignInView from '../views/SignInView.vue'
import SignUpView from '../views/SignUpView.vue'
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
    path: '/signin',
    name: 'SignIn',
    component: SignInView
  },
  {
    path: '/signup',
    name: 'SignUp',
    component: SignUpView
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
