<template>
    <div class="card">
        <DataTable v-model:filters="filters" :value="workstations" paginator :rows="10" dataKey="id" filterDisplay="row"
            :loading="loading" :globalFilterFields="['name', 'country.name', 'representative.name', 'status']">
            <template #header>
                <div class="flex justify-content-center" style="color:white; font-size: 30px;">
                    <i class="pi pi-angle-left" style="font-size: 2rem" @click="goBackToRooms"></i>
                    <span style="padding-top:20px;">{{ selectedRoom.name }}</span>
                </div>
            </template>
            <template #empty> No asset found. </template>
            <template #loading> Loading assets. Please wait. </template>

            <Column field="name" header="Workstation" style="min-width: 8rem">
                <template #body="{ data }">
                    {{ data.name }}
                </template>
                <template v-if="isFilteringActive" #filter="{ filterModel, filterCallback }">
                    <InputText v-model="filterModel.value" type="text" @input="filterCallback()" class="p-column-filter"
                        placeholder="Search by name" />
                </template>
            </Column>

            <Column field="requester" header="Reserved by" style="min-width: 8rem">
                <template #body="{ data }">
                    <div class="flex align-items-center gap-2">
                        <RequesterChip v-if="data.reservations.length !== 0"
                            :full-name="data.reservations[0]?.requesterFullName"
                            :email="data.reservations[0]?.requesterEmail" />
                    </div>
                </template>
                <template v-if="isFilteringActive" #filter="{ filterModel, filterCallback }">
                    <InputText v-model="filterModel.value" type="text" @input="filterCallback()" class="p-column-filter"
                        placeholder="Search by name" />
                </template>
            </Column>

            <Column field="status" header="Status" :showFilterMenu="false" :filterMenuStyle="{ width: '14rem' }"
                style="min-width: 8rem">
                <template #body="{ data }">
                    <Tag :value="data.status" :severity="getSeverity(data.status)" />
                </template>
                <template v-if="isFilteringActive" #filter="{ filterModel, filterCallback }">
                    <Dropdown v-model="filterModel.value" @change="filterCallback()" :options="statuses"
                        placeholder="Select One" class="p-column-filter" style="min-width: 8rem" :showClear="true">
                        <template #option="slotProps">
                            <Tag :value="slotProps.option" :severity="getSeverity(slotProps.option)" />
                        </template>
                    </Dropdown>
                </template>
            </Column>

            <Column field="reserve" header="" style="min-width: 8rem">
                <template #body="{ data }">
                    <div class="flex align-items-center gap-2">
                        <span v-if="data.reservations.length === 0"><Button label="Reserve" raised
                                @click="createReservation(data)" /></span>
                    </div>
                </template>
            </Column>
        </DataTable>
    </div>
</template>
  
<script setup>
import { defineProps, defineEmits, ref, onMounted, computed } from 'vue';
import { FilterMatchMode } from 'primevue/api';
import DataTable from 'primevue/datatable';
import Column from 'primevue/column';
import InputText from 'primevue/inputtext';
import Dropdown from 'primevue/dropdown';
import Button from 'primevue/button';
import Tag from 'primevue/tag';
import RequesterChip from 'src/components/reservations/RequesterChip.vue';
import { useReservationStore } from 'src/store/reservationStore';


const reservationStore = useReservationStore();


const { selectedRoom, refreshRooms } = defineProps(['selectedRoom', 'refreshRooms']);

const emits = defineEmits(['return']);

const goBackToRooms = () => {
    emits('return');
};

const isFilteringActive = computed(() => {
    return reservationStore.isFilteringActive;
})

const createReservation = async (workstation) => {
    await reservationStore.createReservation(workstation);
    await refreshRooms();
}

const workstations = computed(() => {
    return reservationStore.rooms.find(room => room.id === selectedRoom.id).workstations;
});

const filters = ref({
    global: { value: null, matchMode: FilterMatchMode.CONTAINS },
    name: { value: null, matchMode: FilterMatchMode.STARTS_WITH },
    requester: { value: null, matchMode: FilterMatchMode.CONTAINS },
    representative: { value: null, matchMode: FilterMatchMode.IN },
    status: { value: null, matchMode: FilterMatchMode.EQUALS },
    verified: { value: null, matchMode: FilterMatchMode.EQUALS }
});

const statuses = ref(['available', 'reserved']);
const loading = ref(true);


const getSeverity = (status) => {
    console.log(status);
    console.log(workstations.value)
    switch (status) {
        case 'reserved':
            return 'danger';

        case 'available':
            return 'success';
    }
}

onMounted(() => {
    console.log(workstations);
    loading.value = false;
});
</script>

<style></style>