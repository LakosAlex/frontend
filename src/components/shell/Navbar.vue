<template>
    <header class="navbar">
        <div class="navbar-brand">
            <a class="navbar-item" href="#">
                <div class="navbar-item">
                    <img src="../../public/logo.png" alt="" width="112" height="28">
                </div>
            </a>

            <a role="button" class="navbar-burger" @click="toggleMenu" :class="{ 'is-active': isMenuActive }"
                aria-label="menu" aria-expanded="false">
                <span aria-hidden="true"></span>
                <span aria-hidden="true"></span>
                <span aria-hidden="true"></span>
            </a>
        </div>

        <div class="custom-navbar-item has-dropdown is-hoverable lang-dropdown" style="margin-right: 50px">
            <div class="navbar-item has-dropdown is-hoverable lang-dropdown">
                <a class="navbar-link">
                    <figure class="image">
                        <img class="is-rounded" :src="userSessionStore.profilePicture">
                    </figure>
                </a>
                <PfpDropdown />
            </div>
        </div>

    </header>
</template>

<script setup>
import { useUserSessionStore } from '../../store/userSessionStore';
import { computed } from 'vue';
import { useShellStore } from 'src/store/shellStore';
import PfpDropdown from './PfpDropdown.vue';

const userSessionStore = useUserSessionStore();
const shell = useShellStore();

const isMenuActive = computed(() => {
    return shell.isMenuActive;
});

const toggleMenu = () => {
    shell.toggleMenu();
};
</script>

<style lang="scss" scoped>
.custom-navbar-item {
    margin-left: auto;
    margin-top: 5px;
}

.navbar {
    background-color: #efefef;
    box-shadow: 2px 2px 5px rgba(0, 0, 0, 0.1);
    border: 1px solid #dee2e6;
    max-height: 50px;
}

.navbar-item {
    display: flexbox;
}

.lang-dropdown {
    .navbar-item {
        display: flex;
        align-items: center;

        img {
            display: block;
            height: 26px;
            width: 26px;
            min-width: 26px;
        }

        span {
            display: block;
            margin-left: 10px;
        }
    }
}

@media (max-width: 1024px) {
    .custom-navbar-item {
        visibility: hidden;
    }
}
</style>