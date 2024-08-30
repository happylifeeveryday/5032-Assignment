<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { useToast } from 'vue-toastification'

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

const signUp = () => {
  validateName(true)
  validatePassword(true)
  validateConfirmPassword(true)
  if (!errors.value.email && !errors.value.password && !errors.value.confirmPassword) {
    if (isChecked.value && adminCode.value !== 'ADMIN') {
      toast.error('Admin Code Invalid! Please Try Again.')
      return
    }
    // Steps 1 & 2: Check if ‘users’ exists in localStorage and read or create an array accordingly.
    const existingUsers = localStorage.getItem('users')
    let users = existingUsers ? JSON.parse(existingUsers) : []

    // Step 3: Check if a user with the same name already exists in the array
    const userExists = users.some((user) => user.email === newUser.value.email)

    // Step 4: Add a new user if the user name does not exist
    if (!userExists) {
      newUser.value.isAdmin = isChecked.value && adminCode.value === 'ADMIN'
      users.push(newUser.value)

      // Step 5: Convert the updated array to a string and store it back to localStorage
      localStorage.setItem('users', JSON.stringify(users))
      toast.success('Sign up successfully! Now you can Sign in.')
      router.push('/signin')
    } else {
      toast.error('User with this email already exists! Please try again.')
    }
    clearForm()
  }
}

const validateName = (blur) => {
  if (newUser.value.email.length < 3) {
    if (blur) errors.value.email = 'Name must be at least 3 characters.'
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
          <div class="h1 col text-center mb-3">Get Started</div>
          <div class="col text-center mb-3">
            Hey, enter your details to get sign up to your account
          </div>
          <form @submit.prevent="signUp">
            <!-- Email -->
            <div class="col-8 offset-2 mb-3">
              <label for="email" class="form-label">Email</label>
              <input
                type="text"
                class="form-control"
                id="email"
                @blur="() => validateName(true)"
                @input="() => validateName(false)"
                v-model="newUser.email"
              />
              <div v-if="errors.email" class="text-danger">{{ errors.email }}</div>
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
                v-model="newUser.password"
              />
              <div v-if="errors.password" class="text-danger">{{ errors.password }}</div>
            </div>
            <!-- CONFIRM PASSWORD -->
            <div class="col-8 offset-2 mb-4">
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
            <div class="col-8 offset-2 d-flex justify-content-center">
              <div class="form-check form-switch">
                <input class="form-check-input" type="checkbox" id="flexSwitchCheckDefault" v-model="isChecked"/>
                <label class="form-check-label" for="flexSwitchCheckDefault"
                  >Sign Up as Admin?</label
                >
              </div>
            </div>

            <div v-if="isChecked" class="col-6 offset-3 mb-4">
              <input 
                type="text" 
                class="form-control" 
                placeholder="Enter Admin Code" 
                v-model="adminCode"
              />
            </div>

            <!-- BUTTON -->
            <div class="text-center mt-4">
              <button
                type="submit"
                class="btn btn-light col-md-3 col-5 mb-4"
                style="color: #360026"
              >
                Sign Up
              </button>
            </div>
          </form>
          <p class="mb-4 text-center">
            Already have an account?
            <strong
              @click="
                () => {
                  router.push('/signin')
                }
              "
              >Sign in!</strong
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

.form-check-input:checked {
  background-color: #360026;
  border-color: #360026;
}
</style>