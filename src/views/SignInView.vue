<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { useToast } from 'vue-toastification'
import { getAuth, signInWithEmailAndPassword } from 'firebase/auth'

const router = useRouter()
const toast = useToast()
const auth = getAuth()

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

const loginFunc = async () => {
  validateEmail(true)
  validatePassword(true)
  if (!errors.value.email && !errors.value.password) {
    try {
      // Sign in with email and password using Firebase Authentication
      const userCredential = await signInWithEmailAndPassword(
        auth,
        loginData.value.email,
        loginData.value.password
      )
      const user = userCredential.user
      console.log(user)
      // Get ID token result to access custom claims
      const idTokenResult = await user.getIdTokenResult()
      const claims = idTokenResult.claims

      // Determine if user is an admin based on custom claims
      const isAdmin = claims.admin === true

      // Store current user info in localStorage if needed
      const currentUser = {
        email: user.email,
        isAdmin: isAdmin
      }
      localStorage.setItem('currentUser', JSON.stringify(currentUser))

      const idToken = await user.getIdToken()
      sessionStorage.setItem('idToken', idToken)

      // Display appropriate success message
      if (isAdmin) {
        toast.success('WELCOME ADMIN!')
      } else {
        toast.success('Login Successfully.')
      }

      clearForm()
      router.push('/')
    } catch (error) {
      // Handle errors
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
    <div class="col-12 col-md-6 d-flex align-items-center justify-content-center">
      <div
        class="container p-4 p-md-5 rounded shadow-lg"
        style="background-color: #6d3a5e; max-width: 500px"
      >
        <div class="d-flex justify-content-between align-items-center mb-3">
          <i
            class="bi bi-arrow-return-left fs-4"
            @click="() => router.push('/')"
            style="cursor: pointer"
          ></i>
          <h1 class="text-center m-0">Hello There</h1>
          <span></span>
          <!-- Empty span for layout symmetry -->
        </div>
        <div class="text-center mb-3">
          <p>Hey, enter your details to sign in to your account</p>
        </div>
        <form @submit.prevent="loginFunc">
          <!-- Email -->
          <div class="mb-3">
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
          <div class="mb-4">
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
          <div class="text-center mb-4">
            <button type="submit" class="btn btn-light w-50" style="color: #360026">Sign In</button>
          </div>
        </form>
        <p class="text-center">
          Don't have an account?
          <strong @click="() => router.push('/signup')" style="cursor: pointer">Sign up!</strong>
        </p>
      </div>
    </div>
    <div class="col-md-6 d-none d-md-flex align-items-center justify-content-center">
      <img src="../assets/pic.png" class="img-fluid col-10 col-lg-7" alt="Image" />
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

@media (max-width: 575.98px) {
  .container {
    padding: 20px;
  }
}

@media (min-width: 576px) and (max-width: 767.98px) {
  .container {
    padding: 30px;
  }
}

@media (min-width: 992px) and (max-width: 1199.98px) {
  .container {
    max-width: 600px;
  }
}

@media (min-width: 1400px) {
  .container {
    max-width: 700px;
  }
}
</style>
