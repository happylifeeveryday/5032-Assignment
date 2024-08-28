<template>
  <PageHeader />
  <NaviBar />
  <div
    v-html="compiledMarkdown"
    class="col-8 offset-2 my-5"
    style="font-family: 'Inter'; color: white"
  ></div>
</template>

<script setup>
import { ref, computed } from 'vue'
import { useRoute } from 'vue-router'
import { pages } from '../store'
import { marked } from 'marked'
import PageHeader from '@/components/PageHeader.vue'
import NaviBar from '@/components/NaviBar.vue'

const route = useRoute()
const page = computed(() => pages[route.params.id - 1])

const compiledMarkdown = computed(() => {
  return marked(page.value.content)
})
</script>

<style scoped>
p,
h1 {
  text-align: start;
}
</style>
