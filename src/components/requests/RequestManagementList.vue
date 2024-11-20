<template>
    <div class="card">
        <DataTable :value="requestStore.allRequests" paginator :rows="5" :rowsPerPageOptions="[5, 10, 20, 50]"
            tableStyle="min-width: 50rem">
            <template #empty>There are no Requests.</template>
            <template #loading>Loading the Requests. Please wait.</template>

            <Column field="requester" header="Requester" style="min-width: 8rem">
                <template #body="{ data }">
                    <span>{{ requestStore.getRequesterNameById(data.userId) }}</span>
                </template>
            </Column>

            <Column field="requesterEmail" header="Requester Email" style="min-width: 8rem">
                <template #body="{ data }">
                    <span>{{ requestStore.getRequesterEmailById(data.userId) }}</span>
                </template>
            </Column>

            <Column field="requestedDay" header="Requested day" sortable style="min-width: 8rem">
                <template #body="{ data }">
                    {{ convertUnixDateToISO(data.requestedDay) }}
                </template>
            </Column>

            <Column field="requestedAt" header="Requested at" style="min-width: 8rem">
                <template #body="{ data }">
                    {{ convertUnixDateToISO(data.requestMadeAt) }}
                </template>
            </Column>

            <Column field="reason" header="Reason" style="min-width: 8rem">
                <template #body="{ data }">
                    {{ data.reason }}
                </template>
            </Column>

            <Column field="status" header="Status" sortable style="min-width: 8rem">
                <template #body="{ data }">
                    <Tag :value="data.status" :severity="getSeverity(data.status)" />
                </template>
            </Column>

            <Column field="menu" header="Manage" style="min-width: 8rem">
                <template #body="{ data }">
                    <div @click="selectRequestForAction(data.id)">
                        <Button type="button" icon="pi pi-ellipsis-v" @click="toggle" aria-haspopup="true"
                            aria-controls="overlay_menu" />
                        <Menu ref="menu" id="overlay_menu" :model="items" :key="data.id" :ref_key="data.id"
                            :popup="true" />
                    </div>
                </template>
            </Column>
        </DataTable>
    </div>
</template>

<script setup>
import { ref, watch, onMounted, computed } from 'vue';
import { useRequestStore } from 'src/store/requestStore';
import { useUserSessionStore } from 'src/store/userSessionStore';
import DataTable from 'primevue/datatable';
import Column from 'primevue/column';
import Button from 'primevue/button';
import Tag from 'primevue/tag';
import Menu from 'primevue/menu';
import { DateUtils } from 'src/utils/dateUtils';
import { useToast } from 'primevue/usetoast';


const toast = useToast();
const requestStore = useRequestStore();
const userSessionStore = useUserSessionStore();
const dateUtils = new DateUtils();
const loading = ref(false);
const selectedRequestId = ref("none");

const selectRequestForAction = (requestId) => {
    selectedRequestId.value = requestId;
}

const menu = ref();
const items = ref([
    {
        label: 'Options',
        items: [
            {
                label: 'Accept',
                icon: 'pi pi-check',
                command: async () => {
                    await acceptRequest();
                }
            },
            {
                label: 'Reject',
                icon: 'pi pi-times',
                command: async () => {
                    await denyRequest();
                }
            }
        ]
    }
]);

const acceptRequest = async () => {
    await requestStore.acceptRequest(selectedRequestId.value);
    await requestStore.fetchAllRequests();
}

const denyRequest = async () => {
    await requestStore.rejectRequest(selectedRequestId.value);
    await requestStore.fetchAllRequests();

}


const toggle = (event) => {
    menu.value.toggle(event);
};

const convertUnixDateToISO = (timestamp) => {
    return dateUtils.convertUnixDateToISOStringFormat(timestamp).substr(0, 10);
}

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

onMounted(() => {
    console.log(requestStore.allRequests);
})

</script>

<style lang="css" scoped></style>