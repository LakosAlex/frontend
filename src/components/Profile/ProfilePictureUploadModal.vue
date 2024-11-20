<template>
    <div class="card flex justify-content-center">
        <Dialog v-model:visible="visible" :draggable="false" modal header="Cropper" maximizable :style="{ width: '50vw' }"
            :breakpoints="{ '960px': '75vw', '641px': '100vw' }" @update:visible="hideHandler">
            <ImageUploader />
        </Dialog>
    </div>
</template>

<script setup>
import { computed, ref } from "vue";
import Dialog from "primevue/dialog";
import { useProfileStore } from "src/store/profileStore";
import ImageUploader from "./ImageUploader.vue";

const profileStore = useProfileStore();

const visible = computed(() => {
    return profileStore.isProfilePictureUploadModalOpen;
});

const hideHandler = () => {
    profileStore.toggleProfilePictureUploadModal();
}
</script>