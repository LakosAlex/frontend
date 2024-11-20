<template>
    <RequestManagementList />
</template>

<script setup>
import { useRequestStore } from 'src/store/requestStore';
import RequestManagementList from 'src/components/requests/RequestManagementList.vue'
import { onMounted } from 'vue';

const requestStore = useRequestStore();

onMounted(async () => {
    await requestStore.fetchAllRequests();
})
</script>