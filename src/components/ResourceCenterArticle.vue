<template>
  <PageHeader />
  <NaviBar />
  <div
    v-html="compiledMarkdown"
    class="col-8 offset-2 my-5"
    style="font-family: 'Inter'; color: white"
  ></div>
  <div class="rating text-center">
    <div style="color: white" class="h5">Does this information help you?</div>
    <!-- 创建五个星星，使用循环 -->
    <span v-for="star in 5" :key="star" class="star m-1" @click="setRating(star)">
      <!-- 根据是否选中显示不同的星星 -->
      <i :class="star <= rating ? 'bi bi-star-fill' : 'bi bi-star'"></i>
    </span>
  </div>
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

// 创建响应式数据存储当前评分
const rating = ref(0)

// 设置评分的函数
function setRating(newRating) {
  rating.value = newRating
}
</script>

<style scoped>
p,
h1 {
  text-align: start;
}

.star {
  cursor: pointer;
  color: gold;
  font-size: 50px;
}
</style>
