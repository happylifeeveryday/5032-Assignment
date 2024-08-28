<template>
  <div>
    <h1>{{ page.title }}</h1>
    <p>{{ page.content }}</p>
  </div>
</template>    

<script setup>
import { computed } from 'vue';
import { useRoute } from 'vue-router';
import {pages} from '../store'


const route = useRoute();
const page = computed(() => pages[route.params.id - 1]);
</script>