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

<style scoped></style>
