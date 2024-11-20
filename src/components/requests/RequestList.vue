<template>
    <div class="card">
        <DataTable v-model:filters="filters" :value="requests" sort-field="requestedDay" sort-order="1" paginator
            :rows="5" dataKey="id" filterDisplay="row" :loading="loading">
            <template #header>
                <div class="flex justify-content-center" style="color:white; font-size: 30px;">
                    <span style="padding-top:20px;">Home Office Requests</span>
                </div>
                <div>
                    <Button raised icon="pi pi-plus" label="Make a new Request"
                        @click="requestStore.toggleRequestModalVisibility" />
                </div>
            </template>
            <template #empty> You have not yet made any requests. </template>
            <template #loading> Loading your requests. Please wait. </template>

            <Column field="requestedDay" header="Requested day" sortable style="min-width: 8rem">
                <template #body="{ data }">
                    {{ convertDate(data.requestedDay) }}
                </template>
            </Column>

            <Column field="requestedAt" header="Requested at" style="min-width: 8rem">
                <template #body="{ data }">
                    {{ convertDate(data.requestMadeAt) }}
                </template>
            </Column>

            <Column field="reason" header="Reason" style="min-width: 8rem">
                <template #body="{ data }">
                    {{ data.reason }}
                </template>
            </Column>

            <Column field="status" header="Status" :showFilterMenu="false" :filterMenuStyle="{ width: '14rem' }"
                style="min-width: 8rem">
                <template #body="{ data }">
                    <Tag :value="data.status" :severity="getSeverity(data.status)" />
                </template>
            </Column>

            <Column field="cancel" header="" :showFilterMenu="false" :filterMenuStyle="{ width: '14rem' }"
                style="min-width: 8rem">
                <template #body="{ data }">
                    <Button v-if="isStatusPending(data.status)" raised icon="pi pi-minus" label="Cancel"
                        @click="cancelRequest(data.id)" />
                </template>
            </Column>
        </DataTable>
    </div>
</template>

<script setup>
import DataTable from 'primevue/datatable';
import Column from 'primevue/column';
import Button from 'primevue/button';
import Tag from 'primevue/tag';
import { useRequestStore } from 'src/store/requestStore';
import { computed } from 'vue';
import { DateUtils } from 'src/utils/dateUtils';
import { useToast } from 'primevue/usetoast';

const toast = useToast();
const dateUtils = new DateUtils();
const requestStore = useRequestStore();


const getSeverity = (status) => {
    console.log(status);
    switch (status) {
        case 'Rejected':
            return 'danger';

        case 'Accepted':
            return 'success';

        case 'Pending':
            return 'info'
    }
}

const requests = computed(() => {
    console.log(requestStore.userRequests);
    return requestStore.userRequests;
})

const convertDate = (timestamp) => {
    return dateUtils.convertUnixDateToISOStringFormat(timestamp).substr(0, 10);
}

const isStatusPending = (status) => {
    return status === "Pending";
}

const cancelRequest = async (requestId) => {
    const response = await requestStore.cancelRequest(requestId);
    await requestStore.fetchUserRequests();
    if (response.code === 200) {
        toast.add({ severity: 'success', summary: 'Success', detail: response.message, life: 3000 });
    } else {
        toast.add({ severity: 'error', summary: 'Error', detail: "We could not cancel your request", life: 3000 });
    }
}
</script>

<style lang="css" scoped></style>