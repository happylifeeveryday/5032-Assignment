<script setup>
import { useRouter } from 'vue-router'
import { useToast } from 'vue-toastification'
import { getCurrentUser, removeCurrentUser } from '../store'
const router = useRouter()
const toast = useToast()
const isLoggedIn = getCurrentUser()

function showToastAndRefresh() {
  return new Promise((resolve) => {
    toast.success('Sign out successfully.')
    setTimeout(resolve, 2000)
  })
}
</script>

<template>
  <div class="d-md-flex flex-md-row col-12" style="background-color: #f1ede9">
    <div class="me-auto mx-5 h3">Immigrant<br />Support</div>
    <div class="d-flex flex-row align-items-center mx-3">
      <div class="col text-center" v-if="!isLoggedIn">
        <button
          class="px-5 py-2 btn mx-md-4 mx-2"
          @click="
            () => {
              router.push('/signin')
            }
          "
        >
          Sign In
        </button>
        <button
          class="px-5 py-2 btn"
          @click="
            () => {
              router.push('/signup')
            }
          "
        >
          Sign Up
        </button>
      </div>

      <div class="col text-center" v-if="isLoggedIn">
        <button
          class="px-5 py-2 btn mx-md-4 mx-2"
          @click="
            () => {
              router.push('/')
            }
          "
        >
          User Center
        </button>
        <button
          class="px-5 py-2 btn"
          @click="
            () => {
              removeCurrentUser()
              showToastAndRefresh().then(() => {
                router.go(0)
              })
            }
          "
        >
          Sign out
        </button>
      </div>
    </div>
  </div>
</template>
<style scoped>
@import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;700&display=swap');

button {
  font-family: Inter;
  background-color: #a19a8d;
  color: white;
}
</style>
