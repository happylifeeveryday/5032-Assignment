<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import isAuthenticated from '../store'

const router = useRouter()

const loginData = ref({
  username: '',
  password: ''
})

const loginFunc = () => {
  validateName(true)
  validatePassword(true)
  validateAuthenticated()
  if (!errors.value.username && !errors.value.password && isAuthenticated.value) {
    alert('Login Successfully.')
    clearForm()
  } else if (!errors.value.username && !errors.value.password) {
    alert('Username and Password do not match!')
    clearForm()
  }
}

const clearForm = () => {
  loginData.value = {
    username: '',
    password: ''
  }
}

const errors = ref({
  username: null,
  password: null
})

const validateName = (blur) => {
  if (loginData.value.username.length < 3) {
    if (blur) errors.value.username = 'Name must be at least 3 characters'
  } else {
    errors.value.username = null
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

const validateAuthenticated = () => {
  const existingUsers = localStorage.getItem('users')
  let users = existingUsers ? JSON.parse(existingUsers) : []
  isAuthenticated.value = users.some((user) => {
    return user.username === loginData.value.username && user.password === loginData.value.password
  })
}
</script>

<template>
  <div class="row vh-100 vw-100 custom-background text-white">
    <div class="col-md-6 d-flex align-items-center col-12">
      <div class="container">
        <div class="col-8 offset-md-3 offset-2">
          <div class="h1 col text-center mb-3">Hello There</div>
          <div class="col text-center mb-3">
            Hey, enter your details to get sign in to your account
          </div>
          <form @submit.prevent="loginFunc">
            <!-- USERNAME -->
            <div class="col-8 offset-2 mb-3">
              <label for="username" class="form-label">Username</label>
              <input
                type="text"
                class="form-control"
                id="username"
                @blur="() => validateName(true)"
                @input="() => validateName(false)"
                v-model="loginData.username"
              />
              <div v-if="errors.username" class="text-danger">{{ errors.username }}</div>
            </div>
            <!-- PASSWORD -->
            <div class="col-8 offset-2 mb-3">
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
            <div class="text-center">
              <button type="submit" class="btn btn-primary me-2">Submit</button>
              <button type="button" class="btn btn-secondary" @click="clearForm">Clear</button>
            </div>
          </form>
        </div>
      </div>
    </div>
    <div class="col-md-6 d-flex align-items-center d-none d-md-flex">
      <!-- <div class="container"> -->
      <div class="col d-flex justify-content-center align-items-center">
        <img src="../assets/pic.png" class="img-fluid col-6" alt="Image" />
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
</style>
