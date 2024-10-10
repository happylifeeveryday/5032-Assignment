<template>
  <div class="container mt-5">
    <h2 class="mb-4">AI Immigration Consultation</h2>
    <div class="mb-3">
      <label for="userInput" class="form-label">Enter a prompt for the AI:</label>
      <input
        type="text"
        id="userInput"
        v-model="userInput"
        class="form-control"
        placeholder="Input your question"
      />
    </div>
    <button class="btn btn-primary" @click="sendToAI" :disabled="loading">Generate Answer</button>
    <div v-if="loading" class="mt-3">
      <div class="spinner-border text-primary" role="status">
        <span class="visually-hidden">Loading...</span>
      </div>
      <span class="ms-2">Generating answer...</span>
    </div>
    <div v-if="responseContent" class="mt-4">
      <h4>AI Response:</h4>
      <div v-html="responseContent"></div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { httpsCallable } from 'firebase/functions'
import { functions } from '@/main'
import { useToast } from 'vue-toastification'
import { marked } from 'marked' // Import the markdown parser

const userInput = ref('')
const responseContent = ref('')
const loading = ref(false)
const toast = useToast()

const sendToAI = async () => {
  if (!userInput.value) return
  loading.value = true
  responseContent.value = ''

  const callAI = httpsCallable(functions, 'callAI')

  try {
    const aiResponse = await callAI({
      input: {
        messages: [
          {
            role: 'system',
            content:
              'You are a friendly AI that provides advice on immigration to Australia for people from all around the world.'
          },
          {
            role: 'user',
            content: userInput.value
          }
        ]
      }
    })

    console.log('AI Response:', aiResponse)

    // Update this line to correctly access the nested response
    responseContent.value = marked(aiResponse.data.result.result.response)
  } catch (error) {
    console.error('Error calling AI function:', error)
    toast.error('An error occurred while generating the answer.')
  } finally {
    loading.value = false
  }
}
</script>

<style scoped></style>
