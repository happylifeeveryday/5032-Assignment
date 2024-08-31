<template>
  <div class="row mt-5">
    <div class="col-6 offset-3">
      <router-link
        v-for="(page, index) in resoucesCenterPages"
        :key="index"
        :to="`/resouces-center/${index + 1}`"
        style="color: white; text-decoration: none"
        class="h3"
      >
        <div class="p-3">
          {{ page.title }}
        </div>
      </router-link>
    </div>
  </div>
</template>

<script setup>
import { resoucesCenterPages } from '../store'
</script>

<style scoped>
@media (max-width: 576px) {
  .h3 {
    font-size: 1.2rem;
  }
}

@media (min-width: 576px) and (max-width: 768px) {
  .h3 {
    font-size: 1.4rem;
  }
}

@media (min-width: 992px) and (max-width: 1200px) {
  .h3 {
    font-size: 1.6rem;
  }
}

@media (min-width: 1400px) {
  .h3 {
    font-size: 1.8rem;
  }
}
</style>
