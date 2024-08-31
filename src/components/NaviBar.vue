<script setup>
import { useRouter } from 'vue-router'

const router = useRouter()
</script>

<template>
  <!-- Navigation -->
  <div class="container-fluid p-0" style="background-color: #b55e6c">
    <header class="d-flex flex-column flex-md-row align-items-center justify-content-between py-3">
      <ul class="nav flex-column flex-md-row justify-content-center w-100">
        <li class="nav-item">
          <router-link to="/" class="nav-link px-3">Homepage</router-link>
        </li>
        <li class="nav-item">
          <router-link to="/resouces-center" class="nav-link px-3">Resources Center</router-link>
        </li>
        <li class="nav-item">
          <router-link to="/support-donations" class="nav-link px-3"
            >Support and Donations</router-link
          >
        </li>
        <li class="nav-item">
          <router-link to="/community-forum" class="nav-link px-3">Community Forum</router-link>
        </li>
        <li class="nav-item">
          <router-link to="/activities-projects" class="nav-link px-3"
            >Activities and Projects</router-link
          >
        </li>
        <li class="nav-item">
          <router-link to="/faqs" class="nav-link px-3">FAQs</router-link>
        </li>
        <li class="nav-item">
          <router-link to="/usercenter" class="nav-link px-3">User Center</router-link>
        </li>
      </ul>
    </header>
  </div>
</template>

<style scoped>
@import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;700&display=swap');

.nav-link {
  color: white;
  font-family: 'Inter', sans-serif;
  font-weight: bold;
  transition: color 0.3s ease;
}

.nav-link:hover {
  color: #e0e0e0;
}

@media (max-width: 575.98px) {
  .nav {
    flex-direction: column;
    align-items: center;
  }
}

@media (min-width: 576px) and (max-width: 767.98px) {
  .nav-link {
    padding: 0.5rem 1rem;
  }
}

@media (min-width: 992px) and (max-width: 1199.98px) {
  .nav-link {
    padding: 0.5rem 1.5rem;
  }
}

@media (min-width: 1400px) {
  .nav-link {
    padding: 0.5rem 2rem;
  }
}
</style>
