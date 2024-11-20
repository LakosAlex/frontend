<template>
  <UserProfileCreationComponent />
</template>

<script setup>
import { useUserStore } from 'src/store/userStore';
import UserProfileCreationComponent from 'src/components/users/UserProfileCreationComponent.vue';

const userStore = useUserStore();

</script>