<script setup>
import { ref } from 'vue'
import PageHeader from '@/components/PageHeader.vue'
import NaviBar from '@/components/NaviBar.vue'
import ScheduleConsultation from '@/components/ScheduleConsultation.vue'
import GetAppointments from '@/components/GetAppointments.vue'

const getAppointmentsRef = ref(null)

const onAppointmentScheduled = () => {
  if (getAppointmentsRef.value) {
    getAppointmentsRef.value.fetchAppointments()
  }
}
</script>

<template>
  <PageHeader />
  <NaviBar />
  <ScheduleConsultation @appointment-scheduled="onAppointmentScheduled" />
  <GetAppointments ref="getAppointmentsRef" />
</template>
