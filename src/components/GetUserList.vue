<template>
  <div class="container">
    <h2 class="mt-4 d-flex align-items-center">
      All Users
    </h2>
    <Button
        label="Notify all users by email"
        @click="openNotificationDialog"
      ></Button>
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
        :value="users"
        @filter="onFilter"
        paginator
        :rows="5"
        :filters="filters"
        :globalFilterFields="['email', 'uid', 'createdAt', 'lastLogin']"
        responsiveLayout="scroll"
        :loading="loading"
        :filter-display="'row'"
        :rowHover="true"
        showGridlines
        class="mb-3"
      >
        <Column
          field="email"
          header="Email"
          sortable
          filter
          filterPlaceholder="Search by email"
        ></Column>
        <Column field="uid" header="UID" sortable filter filterPlaceholder="Search by UID"></Column>
        <Column
          field="createdAt"
          header="Created At"
          sortable
          filter
          filterPlaceholder="Search by creation date"
        ></Column>
        <Column
          field="lastLogin"
          header="Last Login"
          sortable
          filter
          filterPlaceholder="Search by last login"
        ></Column>
      </DataTable>
      <div class="mt-3">
        <Button label="Export CSV" icon="pi pi-file" @click="exportCSV" class="me-2"></Button>
        <Button label="Export PDF" icon="pi pi-file-pdf" @click="exportPDF"></Button>
      </div>
    </div>

    <!-- Notification Dialog -->
    <Dialog
      header="Send Notification to All Users"
      v-model:visible="notificationDialogVisible"
      :modal="true"
      :closable="false"
    >
      <div class="p-field">
        <label for="notificationMessage">Message</label>
        <Textarea
          id="notificationMessage"
          v-model="notificationMessage"
          rows="5"
          cols="30"
          autoResize
        ></Textarea>
      </div>
      <div class="mt-3 d-flex justify-content-end">
        <Button
          label="Cancel"
          class="p-button-text"
          @click="notificationDialogVisible = false"
        ></Button>
        <Button
          label="Send"
          :disabled="!notificationMessage"
          @click="sendNotification"
          class="ms-2"
        ></Button>
      </div>
    </Dialog>
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
import Dialog from 'primevue/dialog'
import Textarea from 'primevue/textarea'

// Import jsPDF for PDF export
import jsPDF from 'jspdf'
import autoTable from 'jspdf-autotable'

const users = ref([])
const loading = ref(false)
const toast = useToast()
const filters = ref({})
const globalFilter = ref('')
const dt = ref(null) // Reference to DataTable
const filteredData = ref(null) // Holds the filtered data

// Variables for notification dialog
const notificationDialogVisible = ref(false)
const notificationMessage = ref('')

const fetchAllUsers = async () => {
  loading.value = true
  try {
    const getUsers = httpsCallable(functions, 'getUsers')
    const result = await getUsers()
    users.value = result.data.users.map((user) => {
      return {
        email: user.email,
        uid: user.uid,
        createdAt: new Date(user.metadata.creationTime).toLocaleString(),
        lastLogin: new Date(user.metadata.lastSignInTime).toLocaleString()
      }
    })
  } catch (error) {
    console.error('Error fetching users:', error)
    toast.error('Failed to fetch users.')
  } finally {
    loading.value = false
  }
}

const openNotificationDialog = () => {
  notificationMessage.value = ''
  notificationDialogVisible.value = true
}

const sendNotification = async () => {
  if (!notificationMessage.value) {
    toast.error('Please enter a message.')
    return
  }

  loading.value = true
  try {
    const sendNotificationToAllUsers = httpsCallable(functions, 'sendNotificationToAllUsers')
    await sendNotificationToAllUsers({ message: notificationMessage.value })
    toast.success('Notification sent to all users.')
    notificationDialogVisible.value = false
  } catch (error) {
    console.error('Error sending notification:', error)
    toast.error('Failed to send notification.')
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
    filteredData.value && filteredData.value.length ? filteredData.value : users.value

  autoTable(doc, {
    head: [['Email', 'UID', 'Created At', 'Last Login']],
    body: exportData.map((user) => [user.email, user.uid, user.createdAt, user.lastLogin])
  })
  doc.save('all_users.pdf')
}

onMounted(() => {
  fetchAllUsers()
})
</script>

<style scoped>
.container {
  max-width: 1000px;
}
</style>
