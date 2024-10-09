<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'

const router = useRouter()
const isCollapsed = ref(true)

const toggleNavbar = () => {
  isCollapsed.value = !isCollapsed.value
}
</script>

<template>
  <!-- Navigation -->
  <nav class="navbar navbar-expand-lg" style="background-color: #f1ede9">
    <div class="container-fluid">
      <!-- Toggler Button -->
      <button
        class="navbar-toggler"
        type="button"
        @click="toggleNavbar"
        aria-controls="navbarSupportedContent"
        aria-expanded="!isCollapsed"
        aria-label="Toggle navigation"
      >
        <span class="navbar-toggler-icon"></span>
      </button>

      <!-- Collapsible Content -->
      <div
        :class="['collapse navbar-collapse', { show: !isCollapsed }]"
        id="navbarSupportedContent"
      >
        <ul class="navbar-nav mb-2 mb-lg-0 w-100 justify-content-center">
          <li class="nav-item">
            <router-link to="/" class="nav-link px-3">Homepage</router-link>
          </li>
          <li class="nav-item">
            <router-link to="/resources-center" class="nav-link px-3">Resources Center</router-link>
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
      </div>
    </div>
  </nav>
</template>

<style scoped>
@import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;700&display=swap');

.nav-link {
  color: black;
  font-family: 'Inter', sans-serif;
  font-weight: bold;
  transition: color 0.3s ease;
}

.nav-link:hover {
  color: #e0e0e0;
}

.navbar-toggler {
  border-color: rgba(0, 0, 0, 0.1);
  margin-left: auto;
  margin-right: auto;
}

.navbar-toggler-icon {
  background-image: url("data:image/svg+xml;charset=utf8,%3Csvg viewBox='0 0 30 30' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath stroke='rgba%280, 0, 0, 0.5%29' stroke-width='2' stroke-linecap='round' stroke-miterlimit='10' d='M4 7h22M4 15h22M4 23h22'/%3E%3C/svg%3E");
}

@media (max-width: 991.98px) {
  .navbar-nav {
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
