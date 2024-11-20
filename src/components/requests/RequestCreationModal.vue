<template>
<Dialog v-model:visible="requestStore.isRequestCreationModalVisible" modal header="Make a Request" :style="{ width: '25rem' }" @update:visible="resetDialog()">
    <Message severity="error" v-if="requestStore.isRequestCreationModalConflictMessageVisible" :closable="false">You already have a Request for the selected day</Message>
    <span class="p-text-secondary block mb-5">Select the day you are working from home.</span>
    <div class="content">
        <Calendar class="custom-size-datepicker" v-model="chosenDate" showIcon showButtonBar dateFormat="yy-mm-dd"/>
    </div>
    <span class="p-text-secondary block mb-5">Provide a short reason for requesting a home office below. (optional)</span>
    <div class="content">
        <Textarea v-model="reason" autoResize rows="5" cols="30" />
    </div>
    <div class="buttons">
        <Button type="button" label="Save" @click="createRequest"></Button>
    </div>
</Dialog>
</template>

<script setup> 
import Dialog from 'primevue/dialog';
import Calendar from 'primevue/calendar';
import Button from 'primevue/button';
import Textarea from 'primevue/textarea';
import Message from 'primevue/message'
import { ref } from 'vue';
import { useRequestStore } from 'src/store/requestStore';
import { useToast } from 'primevue/usetoast';

const toast = useToast();
const requestStore = useRequestStore();

const chosenDate = ref(new Date());
const reason = ref("");

const createRequest = async () => {
    const response = await requestStore.createUserRequest(chosenDate.value, reason.value);
    response.code === 201 ? handleSuccessfulRequestCreation(response.message) : handleFailedRequestCreation(response);
    await requestStore.fetchUserRequests();
};

const handleSuccessfulRequestCreation = (message) => {
    toast.add({ severity: 'success', summary: 'Success', detail: message, life: 3000 });
    requestStore.toggleRequestModalVisibility();
    requestStore.hideRequestModalConflictMessageVisibility();
}

const handleFailedRequestCreation = (response) => {
    response.errorCode === 409 
        ? requestStore.showRequestModalConflictMessageVisibility()
        : toast.add({ severity: 'error', summary: 'Error', detail: "We could not create your Request", life: 3000 })
}

const resetDialog = () => {
    requestStore.hideRequestModalConflictMessageVisibility();
}
</script>

<style lang="css" scoped>
.buttons {
    display: flex;
    flex-direction: row-reverse;
    gap: 20px;
}

.content {
    display: flex;
    flex-direction: row;
    justify-content: center;
    gap: 3px;
}

</style>