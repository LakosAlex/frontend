<template>
    <div class="card">   
        <DataTable :value="reservationStore.loggedInUserReservations" paginator :rows="5" :rowsPerPageOptions="[5, 10, 20, 50]" tableStyle="min-width: 50rem"
        sort-field="reservedDay" sort-order="1">
            <template #empty> No have not yet made any reservations. </template>
            <template #loading> Loading your reservations. Please wait. </template>
            <Column field="workstation" header="Workstation" style="width: 25%"> 
                <template #body="{ data }">
                    <i class="pi pi-desktop" style="font-size: 1.5rem; float: left; margin-right: 15px;"></i>
                    {{ data.workstation.name }}
                </template>
            </Column>
            <Column field="room" header="Room" style="width: 25%"> 
                <template #body="{ data }">
                    {{ data.workstation.room.name }}
                </template>
            </Column>
            <Column field="reservedDay" header="Date of the Reservation" sortable style="width: 25%"> 
                <template #body="{ data }">
                    <i class="pi pi-calendar" style="font-size: 1.5rem; float: left; margin-right: 15px;"></i>
                    {{ convertUnixDateToISO(data.reservedDay) }}
                </template>
            </Column>
            <Column field="cancel" header="">
                <template #body="{ data }">
                    <Button raised icon="pi pi-minus" label="Cancel"
                        @click="cancelReservation(data.id)" />
                </template>
            </Column>
        </DataTable>
    </div>
</template>

<script setup>
import { useReservationStore } from 'src/store/reservationStore';
import DataTable from 'primevue/datatable';
import Column from 'primevue/column';
import Button from 'primevue/button';
import { DateUtils } from 'src/utils/dateUtils';
import { useToast } from 'primevue/usetoast';

const toast = useToast();
const reservationStore = useReservationStore();

const dateUtils = new DateUtils();

const convertUnixDateToISO = (timestamp) => {
    return dateUtils.convertUnixDateToISOStringFormat(timestamp).substr(0, 10);
}

const cancelReservation = async (reservationId) => {
    const response = await reservationStore.cancelReservation(reservationId);
    await reservationStore.fetchLoggedInUserReservations();
    if (response.code === 200) {
        toast.add({ severity: 'success', summary: 'Success', detail: response.message, life: 3000 });
    } else {
        toast.add({ severity: 'error', summary: 'Error', detail: "We could not cancel your reservation", life: 3000 });
    }
}
</script>

<style lang="css" scoped></style>