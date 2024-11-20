<template>
    <div class="roomContainer">
        <div class="notification is-primary" v-for="room in rooms" :key="room.id" @click="selectRoom(room)">
            <h2 style="color: white; text-align: center;">{{ room.name }}</h2>
            <div class="colorDivider">
                <div class="progressContainer">
                    <progress class="progress" :class="progressClass(room.progress)" :value="room.progress" max="100">
                        {{ room.progress }}%
                    </progress>
                </div>
            </div>
        </div>
    </div>
</template>
  
<script setup>
import { defineProps, onMounted } from 'vue';

const { rooms, selectRoom, refreshRooms } = defineProps(['rooms', 'selectRoom', 'refreshRooms']);

const progressClass = (progress) => {
    if (progress < 50) {
        return 'is-success';
    } else if (progress < 80) {
        return 'is-warning';
    } else {
        return 'is-danger';
    }
};

onMounted(async () => {
    await refreshRooms();
})
</script>

<style scoped>
.roomContainer {
    display: flex;
    flex-wrap: wrap;
    justify-content: space-between;
    align-items: center;
    flex-direction: row;
    color: white;
    /* Existing styles for roomContainer */

    /* Set a maximum height for the container */
    max-height: calc(100vh - 50px);
    /* Adjust the value as needed */

    /* Enable vertical scrolling when content overflows */
    overflow-y: auto;

    /* Add padding to the bottom for space */
    padding-bottom: 20px;
}

.notification {
    width: calc(33.33% - 10px);
    margin-bottom: 20px;
    box-sizing: border-box;
    height: auto;
    padding-bottom: 20px;
}

.progress.is-success::-webkit-progress-value {
    background-color: rgb(162, 231, 145);
}

.progress.is-warning::-webkit-progress-value {
    background-color: rgb(233, 205, 130);
}

.colorDivider {
    display: flex;
    flex-direction: column;
    /* Stack the leftColor and rightColor vertically */
    align-items: flex-start;
    /* Align items to the left */
    padding: 10px 20px;
    /* Adjust padding as needed */
}

.buttonContainer {
    width: 100%;
    /* Make buttonContainer span the full width */
    margin-top: 10px;
    /* Add margin to move the button down */
    display: flex;
    justify-content: center;
    /* Center the buttons horizontally */
}

.progressContainer {
    width: 100%;
    /* Make progressContainer span the full width */
    margin-top: 10px;
    /* Add margin to move the progress bar down */
}

/* Media query for screens with a maximum width of 1024 pixels */
@media (max-width: 1024px) {
    .roomContainer {
        /*flex-direction: column;*/
        align-items: stretch;
        padding-right: 20px;
        /* Stretch items to fill the width */
    }

    .notification {
        width: 100%;
        /* Make each notification take up full width */
    }
}
</style>