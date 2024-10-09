<template>
  <div class="container">
    <h2 class="mt-4">Schedule an In-person Consultation</h2>
    <form @submit.prevent="submitAppointment" class="mt-3">
      <div class="mb-3">
        <label for="date" class="form-label">Select Date</label>
        <input
          type="date"
          id="date"
          v-model="appointmentDate"
          class="form-control"
          :min="today"
          required
        />
      </div>
      <div class="mb-3">
        <label for="time" class="form-label">Select Time</label>
        <select id="time" v-model="appointmentTime" class="form-control" required>
          <option disabled value="">Please select a time</option>
          <option v-for="time in availableTimes" :key="time" :value="time">
            {{ time }}
          </option>
        </select>
      </div>
      <button type="submit" class="btn btn-primary">Schedule Appointment</button>
    </form>
  </div>
</template>

<script setup>
import { ref, watch } from 'vue'
import { useToast } from 'vue-toastification'
import { httpsCallable } from 'firebase/functions'
import { auth, functions } from '@/main'

const appointmentDate = ref('')
const appointmentTime = ref('')
const availableTimes = ref([])
const today = new Date().toISOString().split('T')[0]
const toast = useToast()

const isWeekday = (dateString) => {
  const date = new Date(dateString)
  const day = date.getDay() // 0 (Sun) to 6 (Sat)
  return day !== 0 && day !== 6 // True if Monday to Friday
}

const updateAvailableTimes = () => {
  const times = []
  const morningTimes = ['09:00', '10:00', '11:00']
  const afternoonTimes = ['14:00', '15:00', '16:00']
  times.push(...morningTimes, ...afternoonTimes)
  availableTimes.value = times
}

watch(appointmentDate, () => {
  if (appointmentDate.value) {
    if (!isWeekday(appointmentDate.value)) {
      availableTimes.value = []
      toast.error('Please select a weekday (Monday to Friday).')
    } else {
      updateAvailableTimes()
    }
  }
})

const submitAppointment = async () => {
  if (!appointmentDate.value || !appointmentTime.value) {
    toast.error('Please select both date and time.')
    return
  }

  if (!isWeekday(appointmentDate.value)) {
    toast.error('Please select a weekday (Monday to Friday).')
    return
  }

  const user = auth.currentUser
  if (!user) {
    toast.error('You must be logged in to schedule an appointment.')
    return
  }

  const data = {
    uid: user.uid,
    userEmail: user.email,
    appointmentDate: appointmentDate.value,
    appointmentTime: appointmentTime.value
  }

  try {
    const scheduleAppointment = httpsCallable(functions, 'scheduleAppointment')
    await scheduleAppointment(data)
    toast.success('Appointment scheduled successfully!')
    // Clear the form
    appointmentDate.value = ''
    appointmentTime.value = ''
    availableTimes.value = []
  } catch (error) {
    console.error(error)
    toast.error('Failed to schedule appointment.')
  }
}
</script>
