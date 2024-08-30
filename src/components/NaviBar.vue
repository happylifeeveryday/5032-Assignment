<script setup>
import { useRouter } from 'vue-router'

const router = useRouter()
</script>

<template>
  <!-- navi -->
  <div class="row vw-100" style="padding: 0; margin: 0; background-color: #b55e6c">
    <header
      class="d-flex flex-column align-items-center py-3"
      style="justify-content: space-between"
    >
      <ul class="nav">
        <li class="nav-item">
          <router-link to="/" class="nav-link">Homepage</router-link>
        </li>
        <li class="nav-item">
          <router-link to="/resouces-center" class="nav-link">Resouces Center</router-link>
        </li>
        <li class="nav-item">
          <router-link to="/support-donations" class="nav-link">Support and Donations</router-link>
        </li>
        <li class="nav-item">
          <router-link to="/community-forum" class="nav-link">Community Forum</router-link>
        </li>
        <li class="nav-item">
          <router-link to="/activities-projects" class="nav-link"
            >Activities and Projects</router-link
          >
        </li>
        <li class="nav-item">
          <router-link to="/faqs" class="nav-link">FAQS</router-link>
        </li>
        <li class="nav-item">
          <router-link to="/usercenter" class="nav-link">User Center</router-link>
        </li>
      </ul>
    </header>
  </div>
</template>

<style scoped>
@import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;700&display=swap');

.nav-link {
  color: white;
  font-family: 'Inter';
  font-weight: bold;
}

p {
  font-family: 'Inter';
}

span {
  font-family: 'Inter';
}
</style>
