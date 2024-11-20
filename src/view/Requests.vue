<template>
    <RequestList />
    <RequestCreationModal />
</template>

<script setup>
import { useRequestStore } from 'src/store/requestStore';
import RequestCreationModal from 'src/components/requests/RequestCreationModal.vue';
import RequestList from 'src/components/requests/RequestList.vue';

import { onMounted } from 'vue';

const requestStore = useRequestStore();

onMounted(async () => {
    await requestStore.fetchUserRequests();
})
</script>