import { defineStore } from 'pinia';

export const useShellStore = defineStore('useShellStore', {
    state: () => ({
        isMenuActive: false,
    }),

    actions: {
        toggleMenu() {
            this.isMenuActive = !this.isMenuActive;
        },
    }
})