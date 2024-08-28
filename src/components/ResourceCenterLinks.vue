<template>
      <router-link v-for="(page, index) in pages" :key="index" :to="`/resouces-center/${index + 1}`" style="color: black;text-decoration: none;">
        <div>
         Article title: {{ page.title }}
        </div>
      </router-link>

  </template>
  
  <script setup>
 import {pages} from '../store'
  </script>