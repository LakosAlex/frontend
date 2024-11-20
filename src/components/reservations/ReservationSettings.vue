<template>
    <div class="card flex justify-content-center p-2 mb-4">
        <Toolbar>
            <template #start>
                <Calendar class="custom-size-datepicker" v-model="date" showIcon showButtonBar dateFormat="yy-mm-dd"
                    @date-select="setChoosenDate()" />
            </template>

            <template #end>
                <i class="pi pi-filter" style="font-size: 1.2rem; margin-right: 10px"></i>
                <InputSwitch v-model="isFilteringActive" @click="toggleFiltering()" />
            </template>
        </Toolbar>
    </div>
</template>
    
<script setup>
import Calendar from 'primevue/calendar';
import InputSwitch from 'primevue/inputswitch';
import Toolbar from 'primevue/toolbar';
import { computed, ref, onMounted } from "vue";
import { useReservationStore } from 'src/store/reservationStore';
import { useDateStore } from 'src/store/dateStore';

const reservationStore = useReservationStore();
const dateStore = useDateStore();

const date = ref(new Date());

const setChoosenDate = async () => {
    dateStore.setChoosenDate(date.value);
    await reservationStore.fetchData();
    await reservationStore.getReservationsByDate();
}

const toggleFiltering = () => {
    reservationStore.toggleIsFilteringActive();
}

const isFilteringActive = computed(() => {
    return reservationStore.isFilteringActive;
})

onMounted(() => {
    setChoosenDate();
})
</script>

<style scoped >
.custom-size-datepicker {
    width: 170px;
    height: 35px;
}
</style>