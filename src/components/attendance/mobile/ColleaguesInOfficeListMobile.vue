<template>
    <div class="reservations">
        <div v-for="reservation in reservations">
            <UserProfileComponent :reservation="reservation" />
        </div>
    </div>
</template>

<script setup>
import { useReservationStore } from 'src/store/reservationStore';
import UserProfileComponent from 'src/components/attendance/UserProfileComponent.vue';
import { ref, onMounted, computed } from 'vue';

const reservationStore = useReservationStore();

const reservations = computed(() => {
    return reservationStore.reservationsAtGivenDate;
})

onMounted(async () => {
    reservations.value = await reservationStore.getReservationsByDate();
    console.log("DATA");
    console.log(reservations.value);
})
</script>

<style scoped>
.reservations {
    display: flex;
    flex-direction: column-reverse;
}
</style>