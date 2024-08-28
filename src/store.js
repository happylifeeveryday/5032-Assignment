import { ref } from 'vue'

export const isAuthenticated = ref(false)

export const pages = [
  {
    title: 'Basic Information and Guide for Migrants to Australia',
    content: `这是页面 1 的内容...`
  },
  {
    title: 'Success Stories and Personal Experiences of Migrants',
    content: '这是页面 2 的内容...'
  },
  { title: 'Community Resources and Support Services', content: '这是页面 3 的内容...' },
  { title: 'Legal Aid and Rights Protection', content: '这是页面 4 的内容...' },
  { title: 'Language Learning and Career Development Resources', content: '这是页面 5 的内容...' }
]
