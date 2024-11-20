import { defineStore } from 'pinia';
import { UserApi } from 'src/api/userApi';

const userApi = UserApi();

export const useProfileStore = defineStore('useProfileStore', {
    state: () => ({
        isProfilePictureUploadModalOpen: false,
    }),

    actions: {
        toggleProfilePictureUploadModal() {
            this.isProfilePictureUploadModalOpen = !this.isProfilePictureUploadModalOpen;
        },
        async uploadProfilePicture(pfp) {
            return await userApi.uploadProfilePicture(pfp);
        }
    }
})