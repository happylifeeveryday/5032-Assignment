<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { useToast } from 'vue-toastification'
import { createUserWithEmailAndPassword } from 'firebase/auth'
import { httpsCallable } from 'firebase/functions'
import { auth, functions } from '@/main'
const setCustomUserClaims = httpsCallable(functions, 'setCustomUserClaims')

const router = useRouter()
const toast = useToast()
const isChecked = ref(false)
const adminCode = ref('')

const newUser = ref({
  email: '',
  password: '',
  confirmPassword: '',
  isAdmin: false
})

const errors = ref({
  email: null,
  password: null,
  confirmPassword: null
})

const clearForm = () => {
  newUser.value = {
    email: '',
    password: '',
    confirmPassword: ''
  }
}

const signUp = async () => {
  validateEmail(true)
  validatePassword(true)
  validateConfirmPassword(true)

  if (!errors.value.email && !errors.value.password && !errors.value.confirmPassword) {
    try {
      const userCredential = await createUserWithEmailAndPassword(
        auth,
        newUser.value.email,
        newUser.value.password
      )
      const user = userCredential.user

      if (isChecked.value && adminCode.value) {
        await user.getIdToken(true)
        await setCustomUserClaims({ userId: user.uid, adminCode: adminCode.value })
          .then((result) => {
            console.log('Cloud function call succeeded:', result)
            toast.success(result.data.message)
            router.push('/')
          })
          .catch((error) => {
            console.error('Error calling cloud function:', error)
            toast.error(`Failed to set admin privileges: ${error.message}`)
          })
      } else {
        toast.success('Registration successful! You can now log in.')
        router.push('/signin')
      }
    } catch (error) {
      console.error('Registration failed:', error)
      toast.error(`Registration failed: ${error.message}`)
    }
  }
}

const validateEmail = (blur) => {
  const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

  if (!emailPattern.test(newUser.value.email)) {
    if (blur) errors.value.email = 'Please enter a valid email address.'
  } else {
    errors.value.email = null
  }
}

const validatePassword = (blur) => {
  const password = newUser.value.password
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

const validateConfirmPassword = (blur) => {
  if (newUser.value.confirmPassword == '') {
    errors.value.confirmPassword = 'Password cannot be empty.'
  } else if (newUser.value.password !== newUser.value.confirmPassword) {
    if (blur) errors.value.confirmPassword = 'Passwords do not match.'
  } else {
    errors.value.confirmPassword = null
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
          <h1 class="text-center m-0">Get Started</h1>
          <span></span>
          <!-- Empty span for layout symmetry -->
        </div>
        <div class="text-center mb-3">
          <p>Hey, enter your details to sign up to your account</p>
        </div>
        <form @submit.prevent="signUp">
          <!-- Email -->
          <div class="mb-3">
            <label for="email" class="form-label">Email</label>
            <input
              type="text"
              class="form-control"
              id="email"
              @blur="() => validateEmail(true)"
              @input="() => validateEmail(false)"
              v-model="newUser.email"
            />
            <div v-if="errors.email" class="text-danger">{{ errors.email }}</div>
          </div>
          <!-- PASSWORD -->
          <div class="mb-3">
            <label for="password" class="form-label">Password</label>
            <input
              type="password"
              class="form-control"
              id="password"
              @blur="() => validatePassword(true)"
              @input="() => validatePassword(false)"
              v-model="newUser.password"
            />
            <div v-if="errors.password" class="text-danger">{{ errors.password }}</div>
          </div>
          <!-- CONFIRM PASSWORD -->
          <div class="mb-4">
            <label for="confirm-password" class="form-label">Confirm password</label>
            <input
              type="password"
              class="form-control"
              id="confirm-password"
              v-model="newUser.confirmPassword"
              @blur="() => validateConfirmPassword(true)"
              @input="() => validateConfirmPassword(false)"
            />
            <div v-if="errors.confirmPassword" class="text-danger">
              {{ errors.confirmPassword }}
            </div>
          </div>
          <!-- SIGN UP AS ADMIN -->
          <div class="d-flex justify-content-center mb-3">
            <div class="form-check form-switch">
              <input
                class="form-check-input"
                type="checkbox"
                id="flexSwitchCheckDefault"
                v-model="isChecked"
              />
              <label class="form-check-label" for="flexSwitchCheckDefault">
                Sign Up as Admin?
              </label>
            </div>
          </div>
          <div v-if="isChecked" class="mb-4">
            <input
              type="password"
              class="form-control"
              placeholder="Enter Admin Code"
              v-model="adminCode"
            />
          </div>
          <!-- BUTTON -->
          <div class="text-center mt-4">
            <button type="submit" class="btn btn-light w-50" style="color: #360026">Sign Up</button>
          </div>
        </form>
        <p class="text-center mt-3">
          Already have an account?
          <strong @click="() => router.push('/signin')" style="cursor: pointer">Sign in!</strong>
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
  overflow-y: auto;
}

strong:hover {
  color: #006400;
  cursor: pointer;
}

.form-check-input:checked {
  background-color: #360026;
  border-color: #360026;
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
