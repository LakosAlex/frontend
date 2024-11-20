<template>
    <i class="pi pi-angle-left" style="font-size: 2rem" @click="goBackToRooms"></i>
    <div class="card">
        <DataView :value="workstations" paginator :rows="5">
            <template #list="slotProps">
                <div class="col-12">
                    <div class="flex flex-column xl:flex-row xl:align-items-start p-4 gap-4">
                        <i class="pi pi-desktop" style="font-size: 2rem; float: left"></i>
                        <div
                            class="flex flex-column sm:flex-row justify-content-between align-items-center xl:align-items-start flex-1 gap-4">
                            <div class="flex flex-column align-items-center sm:align-items-start gap-3">
                                <div class="text-2xl font-bold text-900" style="float: left">{{ slotProps.data.name }}</div>
                                <div class="flex align-items-center gap-3">
                                    <span class="flex align-items-center gap-2">
                                        <RequesterChip v-if="slotProps.data.reservations.length !== 0"
                                            :full-name="slotProps.data.reservations[0]?.requesterFullName"
                                            :email="slotProps.data.reservations[0]?.requesterEmail" style="float: right;" />
                                    </span>
                                </div>
                            </div>
                            <div class="flex sm:flex-column align-items-center sm:align-items-end gap-3 sm:gap-2">
                                <span class="text-2xl font-semibold">$</span>
                                <span v-if="slotProps.data.reservations.length === 0">
                                    <Button label="Reserve" raised size="small" @click="createReservation(slotProps.data)"
                                        style="float: right;" />
                                </span>
                            </div>
                        </div>
                    </div>
                </div>
            </template>
        </DataView>
    </div>
</template>

  
<script setup>
import DataView from 'primevue/dataview';
import { PrimeIcons } from 'primevue/api';
import Button from 'primevue/button';
import DataViewLayoutOptions from 'primevue/dataviewlayoutoptions'
import { defineProps, defineEmits, ref, onMounted, computed } from 'vue';
import { useReservationStore } from 'src/store/reservationStore';
import RequesterChip from '../RequesterChip.vue';

const reservationStore = useReservationStore();

const { selectedRoom, refreshRooms } = defineProps(['selectedRoom', 'refreshRooms']);

const emits = defineEmits(['return']);

const goBackToRooms = () => {
    emits('return');
};

const createReservation = async (workstation) => {
    await reservationStore.createReservation(workstation);
    await refreshRooms();
}

const workstations = computed(() => {
    return reservationStore.rooms.find(room => room.id === selectedRoom.id).workstations;
});
</script>

<style></style>