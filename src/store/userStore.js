import { defineStore } from 'pinia';
import { UserApi } from 'src/api/userApi';

const userApi = UserApi();

export const useUserStore = defineStore('useUserStore', {
    state: () => ({
    }),

    actions: {
        async getUserProfilePictureByEmail(email) {
            return await userApi.getUserProfilePictureByEmail(email);
        },
        
        async createUserProfile(userProfileObject) {
            return await userApi.createUserProfile(userProfileObject);
        }
    }
})