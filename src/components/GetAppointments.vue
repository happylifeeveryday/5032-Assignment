<template>
  <div class="container">
    <h2 class="mt-4">My Appointments</h2>
    <div class="card mt-3">
      <!-- Global Search Input -->
      <div class="input-group mb-3">
        <span class="input-group-text">
          <i class="pi pi-search"></i>
        </span>
        <input
          type="text"
          class="form-control"
          placeholder="Global Search"
          v-model="globalFilter"
        />
      </div>
      <DataTable
        ref="dt"
        :value="appointments"
        @filter="onFilter"
        paginator
        :rows="5"
        :filters="filters"
        :globalFilterFields="['appointmentDate', 'appointmentTime', 'createdAt']"
        responsiveLayout="scroll"
        :loading="loading"
        :filter-display="'row'"
        :rowHover="true"
        showGridlines
        class="mb-3"
      >
        <Column
          field="appointmentDate"
          header="Date"
          sortable
          filter
          filterPlaceholder="Search by date"
        ></Column>
        <Column
          field="appointmentTime"
          header="Time"
          sortable
          filter
          filterPlaceholder="Search by time"
        ></Column>
        <Column
          field="createdAt"
          header="Created At"
          sortable
          filter
          filterPlaceholder="Search by created at"
        ></Column>
        <Column header="Actions">
          <template #body="slotProps">
            <Button
              label="Cancel"
              class="p-button-danger"
              @click="cancelAppointment(slotProps.data)"
            />
          </template>
        </Column>
      </DataTable>
      <div class="mt-3">
        <Button label="Export CSV" icon="pi pi-file" @click="exportCSV" class="me-2"></Button>
        <Button label="Export PDF" icon="pi pi-file-pdf" @click="exportPDF"></Button>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, watch } from 'vue'
import { useToast } from 'vue-toastification'
import { httpsCallable } from 'firebase/functions'
import { auth, functions } from '@/main'

// Import PrimeVue components
import DataTable from 'primevue/datatable'
import Column from 'primevue/column'
import Button from 'primevue/button'

// Import jsPDF for PDF export
import jsPDF from 'jspdf'
import autoTable from 'jspdf-autotable'

const appointments = ref([])
const loading = ref(false)
const toast = useToast()
const filters = ref({})
const globalFilter = ref('')
const dt = ref(null) // Reference to DataTable
const filteredData = ref(null) // Holds the filtered data

const fetchAppointments = async () => {
  loading.value = true
  try {
    const getAppointments = httpsCallable(functions, 'getAppointments')
    const result = await getAppointments()
    appointments.value = result.data.appointments.map((appointment) => {
      return {
        ...appointment,
        createdAt: new Date(appointment.createdAt._seconds * 1000).toLocaleString()
      }
    })
  } catch (error) {
    console.error('Error fetching appointments:', error)
    toast.error('Failed to fetch appointments.')
  } finally {
    loading.value = false
  }
}

const cancelAppointment = async (appointment) => {
  try {
    loading.value = true
    const deleteAppointment = httpsCallable(functions, 'deleteAppointment')
    await deleteAppointment({ appointmentId: appointment.id })
    // Refresh the appointments list
    await fetchAppointments()
    toast.success('Appointment cancelled successfully.')
  } catch (error) {
    console.error('Error cancelling appointment:', error)
    toast.error('Failed to cancel appointment.')
  } finally {
    loading.value = false
  }
}

// Watch the globalFilter and update filters accordingly
watch(globalFilter, (newValue) => {
  filters.value['global'] = {
    value: newValue,
    matchMode: 'contains'
  }
})

// Update filteredData whenever the table is filtered
const onFilter = (event) => {
  filteredData.value = event.filteredValue
}

const exportCSV = () => {
  dt.value.exportCSV({ selectionOnly: false })
}

const exportPDF = () => {
  const doc = new jsPDF()
  // Use the filtered data if filters are applied
  const exportData =
    filteredData.value && filteredData.value.length ? filteredData.value : appointments.value

  autoTable(doc, {
    head: [['Date', 'Time', 'Created At']],
    body: exportData.map((appointment) => [
      appointment.appointmentDate,
      appointment.appointmentTime,
      appointment.createdAt
    ])
  })
  doc.save('appointments.pdf')
}

onMounted(() => {
  fetchAppointments()
})

defineExpose({
  fetchAppointments
})
</script>

<style scoped>
.container {
  max-width: 800px;
}
</style>
