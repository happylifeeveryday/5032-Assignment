<script setup>
import { ref } from 'vue'

const newUser = ref({
  username: '',
  password: '',
  confirmPassword: ''
})

const submitForm = () => {
  validateName(true)
  validatePassword(true)
  validateConfirmPassword(true)
  if (!errors.value.username && !errors.value.password && !errors.value.confirmPassword) {
    // Steps 1 & 2: Check if ‘users’ exists in localStorage and read or create an array accordingly.
    const existingUsers = localStorage.getItem('users')
    let users = existingUsers ? JSON.parse(existingUsers) : []

    // Step 3: Check if a user with the same name already exists in the array
    const userExists = users.some((user) => user.username === newUser.value.username)

    // Step 4: Add a new user if the user name does not exist
    if (!userExists) {
      users.push(newUser.value)

      // Step 5: Convert the updated array to a string and store it back to localStorage
      localStorage.setItem('users', JSON.stringify(users))
      alert('sign up successfully.')
    } else {
      alert('User with this username already exists.')
    }
    clearForm()
  }
}

const clearForm = () => {
  newUser.value = {
    username: '',
    password: '',
    confirmPassword: ''
  }
}

const errors = ref({
  username: null,
  password: null,
  confirmPassword: null
})

const validateName = (blur) => {
  if (newUser.value.username.length < 3) {
    if (blur) errors.value.username = 'Name must be at least 3 characters.'
  } else {
    errors.value.username = null
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
        <div class="col-8 offset-md-3 offset-2">
          <div class="h1 col text-center mb-3">Get Started</div>
          <div class="col text-center mb-3">
            Hey, enter your details to get sign up to your account
          </div>
          <form @submit.prevent="submitForm">
            <!-- USERNAME -->
            <div class="col-8 offset-2 mb-3">
              <label for="username" class="form-label">Username</label>
              <input
                type="text"
                class="form-control"
                id="username"
                @blur="() => validateName(true)"
                @input="() => validateName(false)"
                v-model="newUser.username"
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
