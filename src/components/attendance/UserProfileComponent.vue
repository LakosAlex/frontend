<template>
    <div class="card">
        <div class="card-content">
            <div class="media">
                <div class="media-left">
                    <figure class="image is-48x48">
                        <img :src="userProfilePicture" alt="Placeholder image">
                    </figure>
                </div>
                <div class="media-content">
                    <p class="title is-4">{{ reservation.requesterFullName }}</p>
                    <p class="subtitle is-6">{{ reservation.requesterEmail }}</p>
                </div>
            </div>

            <div class="content">
                {{ reservation.workstation.room.name }}
                <br>
                {{ reservation.reservationMadeAt }}
            </div>
        </div>
    </div>
</template>

<script setup>
import { defineProps, ref, onMounted, computed } from 'vue';
import { useUserStore } from 'src/store/userStore';

const userStore = useUserStore();

const userProfilePicture = ref("");

const { reservation } = defineProps(['reservation']);

onMounted(async () => {
    userProfilePicture.value = await userStore.getUserProfilePictureByEmail(reservation.requesterEmail);
});
</script>