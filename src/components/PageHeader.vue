<script setup>
import { useRouter } from 'vue-router'
const router = useRouter()
</script>
<template>
  <div class="d-md-flex flex-md-row col-12" style="background-color: #b55e6c">
    <div class="me-auto mx-5 h3" style="color: #5b5361">Immigrant<br />Support</div>
    <div class="d-flex flex-row align-items-center mx-3">
      <div class="col text-center">
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
    </div>
  </div>
</template>
<style scoped>
@import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;700&display=swap');

button {
  font-family: Inter;
  background-color: #692642;
  color: white;
}
</style>
