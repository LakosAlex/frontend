<template>
    <div class="card">
        <DataTable v-model:expandedRows="expandedRows" :value="reservations" dataKey="requesterEmail"
            tableStyle="min-width: 60rem" paginator :rows="5" :rowsPerPageOptions="[3, 5, 10, 20, 50]">
            <template #header>
                <div class="flex flex-wrap justify-content-end gap-2">
                    <Button raised icon="pi pi-plus" label="Expand All" @click="expandAll" />
                    <Button raised icon="pi pi-minus" label="Collapse All" @click="collapseAll" />
                </div>
            </template>
            <Column expander style="width: 5rem" />
            <Column field="colleague" header="Colleague">
                <template #body="slotProps">
                    <RequesterChip :full-name="slotProps.data.requesterFullName" :email="slotProps.data.requesterEmail" />
                </template>
            </Column>
            <Column header="Email">
                <template #body="slotProps">
                    {{ slotProps.data.requesterEmail }}
                </template>
            </Column>
            

            <template #expansion="slotProps">
                <div class="p-3">
                    <h5>Reservations for {{ slotProps.data.requesterFullName }} at {{ slotProps.data.reservations[0].reservedDay }}</h5>
                    <DataTable :value="slotProps.data.reservations">
                        <Column field="workstation" header="Workstation">
                            <template #body="slotProps">
                                <i class="pi pi-desktop" style="font-size: 1.5rem; float: left; margin-right: 15px;"></i>
                                {{ slotProps.data.workstation.name }}
                            </template>
                        </Column>
                        <Column field="room" header="Room">
                            <template #body="slotProps">
                                {{ slotProps.data.workstation.room.name }}
                            </template>
                        </Column>
                        <Column field="reservedAt" header="Reserved At">
                            <template #body="slotProps">
                                <i class="pi pi-calendar" style="font-size: 1.5rem; float: left; margin-right: 15px;"></i>
                                {{ slotProps.data.reservationMadeAt }}
                            </template>
                        </Column>
                    </DataTable>
                </div>
            </template>
        </DataTable>
    </div>
</template>


<script setup>
import { ref, onMounted, computed } from 'vue';
import { useReservationStore } from 'src/store/reservationStore';
import DataTable from 'primevue/datatable';
import Button from 'primevue/button';
import Column from 'primevue/column';
import RequesterChip from '../reservations/RequesterChip.vue';

const reservationStore = useReservationStore();
const expandedRows = ref([]);

const expandAll = () => {
    expandedRows.value = reservations.value;
};

const collapseAll = () => {
    expandedRows.value = null;
};

const reservations = computed(() => {
    return groupReservationsByRequester(reservationStore.reservationsAtGivenDate);
});

const loading = ref(true);

onMounted(async () => {
    reservations.value = await reservationStore.getReservationsByDate();
    console.log("RESERVATIONS");
    console.log(groupReservationsByRequester(reservations.value));
    loading.value = false;
});

function groupReservationsByRequester(reservationArray) {
    const groupedReservations = {};

    for (const reservation of reservationArray) {
        const key = `${reservation.requesterEmail}-${reservation.requesterFullName}`;

        if (!groupedReservations[key]) {
            groupedReservations[key] = {
                requesterEmail: reservation.requesterEmail,
                requesterFullName: reservation.requesterFullName,
                reservations: [],
            };
        }

        groupedReservations[key].reservations.push(reservation);
    }

    console.log("yooooooo");
    console.log(Object.values(groupedReservations));
    return Object.values(groupedReservations);
}

</script>

<style lang="scss"></style>