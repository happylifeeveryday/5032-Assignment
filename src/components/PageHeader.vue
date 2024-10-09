<script setup>
import { ref, onMounted, onUnmounted } from 'vue'
import { useRouter } from 'vue-router'
import { useToast } from 'vue-toastification'
import { auth } from '@/main' // Ensure correct import of Firebase Auth instance
import { signOut, onAuthStateChanged } from 'firebase/auth'

const router = useRouter()
const toast = useToast()

// Define a reactive variable to track user login status
const isLoggedIn = ref(false)

// Listen to authentication state changes in Firebase Auth
const unsubscribe = onAuthStateChanged(auth, (user) => {
  isLoggedIn.value = !!user
})

onMounted(() => {})

onUnmounted(() => {
  unsubscribe()
})

// Define the sign-out function
const handleSignOut = async () => {
  try {
    await signOut(auth)
    toast.success('Successfully signed out.')
    router.push('/') // Navigate to another page as needed
  } catch (error) {
    console.error('Sign out failed:', error)
    toast.error('Sign out failed, please try again later.')
  }
}
</script>

<template>
  <div class="d-md-flex flex-md-row col-12" style="background-color: #f1ede9">
    <div class="me-auto mx-5 h3">Immigrant<br />Support</div>
    <div class="d-flex flex-row align-items-center mx-3">
      <div class="col text-center" v-if="!isLoggedIn">
        <button class="px-5 py-2 btn mx-md-4 mx-2" @click="() => router.push('/signin')">
          Sign In
        </button>
        <button class="px-5 py-2 btn" @click="() => router.push('/signup')">Sign Up</button>
      </div>

      <div class="col text-center" v-if="isLoggedIn">
        <button class="px-5 py-2 btn mx-md-4 mx-2" @click="() => router.push('/user-center')">
          User Center
        </button>
        <button class="px-5 py-2 btn" @click="handleSignOut">Sign Out</button>
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
  border: none;
  border-radius: 4px;
  transition: background-color 0.3s;
}

button:hover {
  background-color: #8c8177;
  cursor: pointer;
}
</style>
