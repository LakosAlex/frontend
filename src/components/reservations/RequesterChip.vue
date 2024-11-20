<template>
        <Chip :label="userFullName" :image="userProfilePicture" />
</template>
  
<script setup>
import { defineProps, ref, onMounted, computed } from 'vue';
import { useUserStore } from 'src/store/userStore';
import Chip from 'primevue/chip';

const userStore = useUserStore();

const userFullName = ref("");
const userProfilePicture = ref("");

const { fullName, email } = defineProps(['fullName', 'email']);

onMounted(async () => {
    userFullName.value = fullName;
    userProfilePicture.value = await userStore.getUserProfilePictureByEmail(email);
});
</script>

<style>

</style>