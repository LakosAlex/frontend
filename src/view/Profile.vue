<template>
    <div class="container">
        <div class="content">
            <div class="card-container">
                <div class="card">
                    <div class="card-content">
                        <div class="media">
                            <div class="media-left">
                                <figure class="image is-128x128">
                                    <img :src="userSessionStore.profilePicture" alt="Profile image">
                                </figure>
                            </div>
                            <div class="media-content">
                                <p class="title is-4">{{ userSessionStore.fullName }}</p>
                                <button v-if="!isEditing" class="button is-primary is-small" @click="toggleEditMode">Edit
                                    profile</button>
                            </div>
                        </div>
                        <div class="content">
                            <button v-if="isEditing" class="button is-primary is-small" style="margin-left:43px"
                                @click="profileStore.toggleProfilePictureUploadModal()">Set avatar</button>
                            <ProfilePictureUploadModal />
                        </div>
                        <div class="content" style="align-items: center;">
                            <table class="table is-narrow">
                                <tr>
                                    <td>Full Name</td>
                                    <td>
                                        <template v-if="!isEditing">{{ userSessionStore.fullName }}</template>
                                        <template v-else>
                                            <input v-model="userSessionStore.fullName" class="input" />
                                        </template>
                                    </td>
                                </tr>
                                <tr>
                                    <td>Email</td>
                                    <td>
                                        <template v-if="!isEditing">{{ userSessionStore.email }}</template>
                                        <template v-else>
                                            <input v-model="editedEmail" class="input" />
                                        </template>
                                    </td>
                                </tr>
                                <tr>
                                    <td>Phone Number</td>
                                    <td>
                                        <template v-if="!isEditing">{{ userSessionStore.phoneNumber }}</template>
                                        <template v-else>
                                            <input v-model="editedPhoneNumber" class="input" />
                                        </template>
                                    </td>
                                </tr>
                                <tr>
                                    <td>Department</td>
                                    <td>
                                        <template v-if="!isEditing">{{ userSessionStore.department }}</template>
                                        <template v-else>
                                            <input v-model="editedDepartment" class="input" />
                                        </template>
                                    </td>
                                </tr>
                                <tr v-if="!isEditing">
                                    <td>Roles</td>
                                    <td>
                                        <template v-if="!isEditing">{{ userSessionStore.roles }}</template>
                                    </td>
                                </tr>
                            </table>
                            <div v-if="isEditing">
                                <button class="button is-small is-primary" @click="saveChanges">Save</button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup>
import { onMounted, onBeforeUnmount, watch, ref } from 'vue';
import { useUserSessionStore } from 'src/store/userSessionStore';
import { useProfileStore } from 'src/store/profileStore';
import { UserApi } from 'src/api/userApi';
import ProfilePictureUploadModal from 'src/components/Profile/ProfilePictureUploadModal.vue';

const hasUnsavedChanges = ref(false);
const isEditing = ref(false);
const editedFullName = ref('');
const editedEmail = ref('');
const editedPhoneNumber = ref('');
const editedDepartment = ref('');

const loggedInUserProfilePicture = ref("");
const userApi = UserApi();

const userSessionStore = useUserSessionStore();
const profileStore = useProfileStore();

watch(isEditing, (newValue) => {
    hasUnsavedChanges.value = newValue;
});

const unloadListener = (event) => {
    if (hasUnsavedChanges.value) {
        event.returnValue = "You have unsaved changes. Are you sure you want to leave?";
    }
};

window.addEventListener("beforeunload", unloadListener);

onBeforeUnmount(() => {
    window.removeEventListener("beforeunload", unloadListener);
});

onMounted(async () => {
    await userSessionStore.getLoggedInUserInfoAndSetStates();
    editedFullName.value = userSessionStore.fullName;
    editedEmail.value = userSessionStore.email;
    editedPhoneNumber.value = userSessionStore.phoneNumber;
    editedDepartment.value = userSessionStore.department;
    loggedInUserProfilePicture.value = await userApi.getLoggedInUserProfilePicture();
})

const toggleEditMode = () => {
    isEditing.value = !isEditing.value;
};

const saveChanges = () => {
    isEditing.value = false;
};

</script>

<style scoped>
.container {
    display: grid;
    grid-template-rows: auto 1fr;
    gap: 20px;
    align-items: center;
}

.right-section {
    display: flex;
    justify-content: flex-end;
}

@media (max-width: 1024px) {
    .container {
        grid-template-rows: auto auto auto;
        align-items: left;
    }

    .content {
        grid-row: auto;
    }
}

@media (min-width: 1600px) {
    .container {
        max-width: 1600px;
        margin: 0 auto;
    }
}
</style>
