<template>
    <div class="card flex justify-content-center p-fluid">
        <div class="profile-creation-container" style="max-width: 20rem">
            <div class="field">
                <i class="pi pi-id-card" />
                <InputText id="input" v-model="id" type="text" placeholder="User ID from Keycloak" autofocus />
            </div>
            <div class="field">
                <i class="pi pi-user" />
                <InputText id="input" v-model="fullName" type="text" placeholder="Full Name" autofocus />
            </div>
            <div class="field">
                <i class="pi pi-envelope" />
                <InputText id="email" v-model="email" type="email" placeholder="Email" />
            </div>
            <div class="field">
                <i class="pi pi-phone" />
                <InputText id="email" v-model="phoneNumber" type="text" placeholder="Phone Number" />
            </div>
            
            <Button label="Create Profile" class="mt-2" @click="createUserProfile()"/>
        </div>
    </div>
</template>

<script setup>
import Button from 'primevue/button';
import InputText from 'primevue/inputtext';
import { ref } from 'vue';
import { useUserStore } from 'src/store/userStore';
import { useToast } from 'primevue/usetoast';

const toast = useToast();
const userStore = useUserStore();

const id = ref("");
const fullName = ref("");
const email = ref("");
const phoneNumber = ref("");

const createUserProfile = async () => {
    const userProfileObject = {
        id: id.value,
        fullName: fullName.value,
        email: email.value,
        phoneNumber: phoneNumber.value
    };
    const { data } = await userStore.createUserProfile(userProfileObject);
    console.log(data);
    data.code === 201 ? handleSuccessfulProfileCreation(data.message) : handleFailedProfileCreation();
}

const handleSuccessfulProfileCreation = (message) => {
    toast.add({ severity: 'success', summary: 'Success', detail: message, life: 3000 });
    resetInputs();
}

const resetInputs = () => {
    id.value = "";
    fullName.value = "";
    email.value = "";
    phoneNumber.value = "";
}

const handleFailedProfileCreation = () => {
    toast.add({ severity: 'error', summary: 'Error', detail: "We could not create the profile", life: 3000 })
}
</script>

<style #scoped>
.profile-creation-container {
    margin-left: auto;
    margin-right: auto;
    padding-bottom: 40px;
}
</style>