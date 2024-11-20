<template>
    <ReservationSettings />
    <div class="container">
        <div class="content">
            <RoomList v-if="!selectedRoom" :rooms="reservationStore.rooms" :selectRoom="selectRoom"
                :refresh-rooms="refreshRooms" />
            <WorkstationList v-if="selectedRoom && !isMobile" :selectedRoom="selectedRoom" :refresh-rooms="refreshRooms" @return="goBackToRooms" />
            <WorkstationListMobile v-if="selectedRoom && isMobile" :selectedRoom="selectedRoom" :refresh-rooms="refreshRooms" @return="goBackToRooms" />
        </div>
    </div>
</template>
  

<script setup>
import { onMounted, ref, computed, onBeforeUnmount } from 'vue';
import { useReservationStore } from 'src/store/reservationStore';
import RoomList from 'src/components/reservations/RoomList.vue';
import WorkstationList from 'src/components/reservations/WorkstationList.vue';
import WorkstationListMobile from 'src/components/reservations/mobile/WorkstationListMobile.vue';
import ReservationSettings from 'src/components/reservations/ReservationSettings.vue';

const reservationStore = useReservationStore();

const selectedRoom = ref(null);
const windowWidth = ref(window.innerWidth);

const isMobile = computed(() => {
    return windowWidth.value <= 1024;
});

const handleResize = () => {
    windowWidth.value = window.innerWidth;
}

const goBackToRooms = () => {
    selectedRoom.value = null;
};

const refreshRooms = async () => {
    await reservationStore.fetchData();
};

const selectRoom = (room) => {
    selectedRoom.value = room;
    window.scrollTo({ top: 0, behavior: 'smooth' });
};

onMounted(async () => {
    await refreshRooms();
    window.addEventListener('resize', handleResize);
});

onBeforeUnmount(() => {
    window.removeEventListener('resize', handleResize);
});
</script>

<style scoped>
.container {
    display: grid;
    grid-template-rows: auto 1fr;
    gap: 20px;
    align-items: center;
}

@media (max-width: 1024px) {
    .container {
        grid-template-rows: auto auto auto;
        align-items: left;
    }

    .content {
        grid-row: auto;
    }
}

@media (min-width: 1600px) {
    .container {
        max-width: 1600px;
        margin: 0 auto;
    }
}
</style>
