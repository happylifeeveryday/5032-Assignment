<template>
  <PageHeader />
  <NaviBar />
  <ResourceCenterLinks />

  <div v-if="isAdmin" class="admin-ratings-section mt-5 mx-5 p-4">
    <h2 style="color: white">Admin Ratings Overview</h2>
    <ul class="mt-4">
      <li
        v-for="page in resoucesCenterPages"
        :key="page.title"
        style="color: white; margin-bottom: 10px"
      >
        {{ page.title }} got <strong>{{ getRatingsCount(page.title) }}</strong> rating with an
        average score of <strong>{{ getAverageRating(page.title) }}</strong>
      </li>
    </ul>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'
import PageHeader from '@/components/PageHeader.vue'
import NaviBar from '@/components/NaviBar.vue'
import ResourceCenterLinks from '@/components/ResourceCenterLinks.vue'
import { resoucesCenterPages, getCurrentUser } from '../store'

const currentUser = getCurrentUser()
const isAdmin = computed(() => currentUser && currentUser.isAdmin)
function getRatingsCount(title) {
  const ratings = JSON.parse(localStorage.getItem('ratings')) || []
  return ratings.filter((rating) => rating.title === title).length
}
function getAverageRating(title) {
  const ratings = JSON.parse(localStorage.getItem('ratings')) || []
  const titleRatings = ratings.filter((rating) => rating.title === title)
  if (titleRatings.length === 0) return 0

  const totalScore = titleRatings.reduce((sum, rating) => sum + rating.rating, 0)
  return (totalScore / titleRatings.length).toFixed(1) // 保留一位小数
}
</script>

<style scoped>
.admin-ratings-section {
  background-color: #2c2c2c;
}
strong {
  color: #b55e6c;
}
</style>
