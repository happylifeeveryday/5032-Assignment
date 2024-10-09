import { createRouter, createWebHistory } from 'vue-router'
import { auth } from '@/main'
import { useToast } from 'vue-toastification'
import SignInView from '@/views/SignInView.vue'
import SignUpView from '@/views/SignupView.vue'
import HomeView from '@/views/HomeView.vue'
import ResoucesCenterView from '@/views/ResoucesCenterView.vue'
import ResourceCenterArticle from '@/components/ResourceCenterArticle.vue'
import MapBox from '@/components/MapBox.vue'
import ScheduleConsultation from '@/components/ScheduleConsultation.vue'
import GetAllAppointments from '@/components/GetAllAppointments.vue'
import GetAppointments from '@/components/GetAppointments.vue'
import ConsultationView from '@/views/ConsultationView.vue'
import ImmiCenterInfo from '../views/ImmiCenterInfo.vue'
import AdminDashboardView from '@/views/AdminDashboardView.vue'
const toast = useToast()
const routes = [
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
  },
  {
    path: '/resouces-center',
    name: 'ResoucesCenter',
    component: ResoucesCenterView
  },
  {
    path: '/resouces-center/:id',
    component: ResourceCenterArticle
  },
  {
    path: '/faqs',
    component: ScheduleConsultation
  },
  {
    path: '/immigration-consultation',
    meta: { requiresAuth: true },
    component: ConsultationView
  },
  {
    path: '/immi-center-info',
    component: ImmiCenterInfo
  },
  {
    path: '/admin-dashboard',
    component: AdminDashboardView
  }
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

router.beforeEach((to, from, next) => {
  if (to.meta.requiresAuth) {
    const user = auth.currentUser
    if (user) {
      next()
    } else {
      toast.error('You must log in first to access this page.')
      next({ name: 'SignIn' })
    }
  } else {
    next()
  }
})

export default router
