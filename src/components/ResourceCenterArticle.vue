<template>
  <PageHeader />
  <NaviBar />
  <div v-html="compiledMarkdown" class="col-8 offset-2 my-5" style="font-family: 'Inter'"></div>
  <div class="rating text-center">
    <div class="h5">Does this information help you?</div>
    <!-- 创建五个星星，使用循环 -->
    <span
      v-for="star in 5"
      :key="star"
      class="star m-1"
      @click="setRating(star)"
      @mouseover="hoverRating(star)"
      @mouseleave="resetHoverRating"
    >
      <!-- 根据是否选中显示不同的星星 -->
      <i :class="star <= (hoveredRating || rating) ? 'bi bi-star-fill' : 'bi bi-star'"></i>
    </span>
    <!-- 显示当前的评分 -->
    <div v-if="rating > 0 || hoveredRating > 0" class="h3" style="font-size: 20px">
      {{ hoveredRating || rating }}/5
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'
import { useRoute } from 'vue-router'
import { resoucesCenterPages, getCurrentUser } from '../store'
import { marked } from 'marked'
import PageHeader from '@/components/PageHeader.vue'
import NaviBar from '@/components/NaviBar.vue'
import { useToast } from 'vue-toastification'
import router from '@/router'

const toast = useToast()
const route = useRoute()
const page = computed(() => resoucesCenterPages[route.params.id - 1])

const compiledMarkdown = computed(() => {
  return marked(page.value.content)
})

// 创建响应式数据存储当前评分
const rating = ref(0)
const hoveredRating = ref(0)
// 设置评分的函数
function setRating(newRating) {
  const currentUser = getCurrentUser()
  if (!currentUser) {
    toast.warning('Please sign in first.')
    router.push('/signin')
    return
  }

  let ratings = JSON.parse(localStorage.getItem('ratings')) || []

  // 检查是否已经评分
  const existingRating = ratings.find(
    (rating) => rating.useremail === currentUser.email && rating.title === page.value.title
  )

  if (existingRating) {
    toast.warning('You have already rated.')
    return
  }

  // 添加新的评分
  ratings.push({
    useremail: currentUser.email,
    title: page.value.title,
    rating: newRating
  })

  // 更新 localStorage
  localStorage.setItem('ratings', JSON.stringify(ratings))
  rating.value = newRating
  toast.success('Rating successfully.')
}
function hoverRating(star) {
  hoveredRating.value = star
}
function resetHoverRating() {
  hoveredRating.value = 0
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
