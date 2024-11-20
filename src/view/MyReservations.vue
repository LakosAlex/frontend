<template>
    <MyReservationsList />
</template>

<script setup>
import { useReservationStore } from 'src/store/reservationStore';
import MyReservationsList from 'src/components/reservations/MyReservationsList.vue'

import { onMounted } from 'vue';

const reservationStore = useReservationStore();

onMounted(async () => {
    await reservationStore.fetchLoggedInUserReservations();
})
</script>
