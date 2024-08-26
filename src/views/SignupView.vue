<script setup>
import { ref } from 'vue'

const formData = ref({
  username: '',
  password: '',
  confirmPassword: ''
})

const submittedCards = ref([])

const submitForm = () => {
  validateName(true)
  validatePassword(true)
  validateConfirmPassword(true)
  if (!errors.value.username && !errors.value.password && !errors.value.confirmPassword) {
    submittedCards.value.push({ ...formData.value })
    clearForm()
  }
}

const clearForm = () => {
  formData.value = {
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
  if (formData.value.username.length < 3) {
    if (blur) errors.value.username = 'Name must be at least 3 characters.'
  } else {
    errors.value.username = null
  }
}

const validatePassword = (blur) => {
  const password = formData.value.password
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
  if (formData.value.password !== formData.value.confirmPassword) {
    if (blur) errors.value.confirmPassword = 'Passwords do not match.'
  } else {
    errors.value.confirmPassword = null
  }
  if (formData.value.confirmPassword == '') {
    errors.value.confirmPassword = 'Password cannot be empty.'
  } else {
    errors.value.confirmPassword = null
  }
}
</script>

<template>
  <div class="container">
    <div class="col-8 offset-2">
      <h1 class="text-center">Signup</h1>
      <form @submit.prevent="submitForm">
        <div class="col">
          <label for="username" class="form-label">Username</label>
          <input
            type="text"
            class="form-control"
            id="username"
            @blur="() => validateName(true)"
            @input="() => validateName(false)"
            v-model="formData.username"
          />
          <div v-if="errors.username" class="text-danger">{{ errors.username }}</div>
        </div>

        <div class="col">
          <label for="password" class="form-label">Password</label>
          <input
            type="password"
            class="form-control"
            id="password"
            @blur="() => validatePassword(true)"
            @input="() => validatePassword(false)"
            v-model="formData.password"
          />
          <div v-if="errors.password" class="text-danger">{{ errors.password }}</div>
        </div>

        <div class="col">
          <label for="confirm-password" class="form-label">Confirm password</label>
          <input
            type="password"
            class="form-control"
            id="confirm-password"
            v-model="formData.confirmPassword"
            @blur="() => validateConfirmPassword(true)"
          />
          <div v-if="errors.confirmPassword" class="text-danger">
            {{ errors.confirmPassword }}
          </div>
        </div>

        <div class="text-center">
          <button type="submit" class="btn btn-primary me-2">Submit</button>
          <button type="button" class="btn btn-secondary" @click="clearForm">Clear</button>
        </div>
      </form>
    </div>
  </div>
</template>
