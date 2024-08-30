<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { isAuthenticated } from '../store'
import { useToast } from 'vue-toastification'

const router = useRouter()
const toast = useToast()

const loginData = ref({
  email: '',
  password: ''
})

const errors = ref({
  email: null,
  password: null
})

const clearForm = () => {
  loginData.value = {
    email: '',
    password: ''
  }
}

const loginFunc = () => {
  validateEmail(true)
  validatePassword(true)
  if (!errors.value.email && !errors.value.password) {
    const existingUsers = localStorage.getItem('users')
    let users = existingUsers ? JSON.parse(existingUsers) : []

    const user = users.find(
      (user) => user.email === loginData.value.email && user.password === loginData.value.password
    )

    if (user) {
      const currentUser = {
        email: user.email,
        isAdmin: user.isAdmin
      }
      localStorage.setItem('currentUser', JSON.stringify(currentUser))

      toast.success('Login Successfully.')
      clearForm()
      router.push('/')
    } else {
      toast.error('Email and Password do not match!')
      clearForm()
    }
  }
}

const validateEmail = (blur) => {
  const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

  if (!emailPattern.test(loginData.value.email)) {
    if (blur) errors.value.email = 'Please enter a valid email address.'
  } else {
    errors.value.email = null
  }
}

const validatePassword = (blur) => {
  const password = loginData.value.password
  const minLength = 8
  const hasUppercase = /[A-Z]/.test(password)
  const hasLowercase = /[a-z]/.test(password)
  const hasNumber = /\d/.test(password)
  const hasSpecialChar = /[!@#$%^&*(),.?":{}|<>]/.test(password)

  if (password.length < minLength) {
    if (blur) errors.value.password = `Password must be at least ${minLength} characters long.`
  } else if (!hasUppercase) {
    if (blur) errors.value.password = 'Password must contain at least one uppercase letter.'
  } else if (!hasLowercase) {
    if (blur) errors.value.password = 'Password must contain at least one lowercase letter.'
  } else if (!hasNumber) {
    if (blur) errors.value.password = 'Password must contain at least one number.'
  } else if (!hasSpecialChar) {
    if (blur) errors.value.password = 'Password must contain at least one special character.'
  } else {
    errors.value.password = null
  }
}
</script>

<template>
  <div class="row vh-100 vw-100 custom-background text-white">
    <div class="col-md-6 d-flex align-items-center col-12">
      <div class="container">
        <div
          class="col-10 offset-md-3 offset-1 col-md-8 offset-md-2"
          style="border-radius: 30px; background-color: #6d3a5e"
        >
          <div class="h1 col offset-1 mb-3">
            <i
              class="bi bi-arrow-return-left"
              @click="
                () => {
                  router.push('/')
                }
              "
              style="cursor: pointer"
            ></i>
          </div>
          <div class="h1 col text-center mb-3">Hello There</div>
          <div class="col text-center mb-3">
            Hey, enter your details to get sign in to your account
          </div>
          <form @submit.prevent="loginFunc">
            <!-- Email -->
            <div class="col-8 offset-2 mb-3">
              <label for="email" class="form-label">Email</label>
              <input
                type="text"
                class="form-control"
                id="email"
                @blur="() => validateEmail(true)"
                @input="() => validateEmail(false)"
                v-model="loginData.email"
              />
              <div v-if="errors.email" class="text-danger">{{ errors.email }}</div>
            </div>
            <!-- PASSWORD -->
            <div class="col-8 offset-2 mb-4">
              <label for="password" class="form-label">Password</label>
              <input
                type="password"
                class="form-control"
                id="password"
                @blur="() => validatePassword(true)"
                @input="() => validatePassword(false)"
                v-model="loginData.password"
              />
              <div v-if="errors.password" class="text-danger">{{ errors.password }}</div>
            </div>
            <!-- BUTTON -->
            <div class="text-center col-12">
              <button
                type="submit"
                class="btn btn-light col-md-3 col-5 mb-4"
                style="color: #360026"
              >
                Sign In
              </button>
            </div>
          </form>
          <p class="mb-4 text-center">
            Don't have an account?
            <strong
              @click="
                () => {
                  router.push('/signup')
                }
              "
              >Sign up!</strong
            >
          </p>
          <p><br /></p>
        </div>
      </div>
    </div>
    <div class="col-md-6 align-items-center d-none d-md-flex">
      <!-- <div class="container"> -->
      <div class="col d-flex justify-content-center align-items-center">
        <img src="../assets/pic.png" class="img-fluid col-7" alt="Image" />
      </div>
      <!-- </div> -->
    </div>
  </div>
</template>

<style scoped>
.custom-background {
  background-color: #360026;
  margin: 0;
  padding: 0;
}

strong:hover {
  color: #006400;
  cursor: pointer;
}
</style>
