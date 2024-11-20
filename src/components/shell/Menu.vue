<template>
    <div class="menu">
        <aside v-if="!isMobile || isMenuActive" :style="isMobile ? {
            transform: isMenuActive ? 'translateX(0%) rotateY(-5deg)' : 'translateX(-100%)',
            opacity: isMenuActive ? 1 : 0
        } : { opacity: 1 }" class="column is-narrow sidebar p-3">

            <div class="is-hidden-desktop">
                <PfpDropdown />
            </div>

            <p class="menu-label">
                {{ t('shell.menu.reservations') }}
            </p>
            <ul class="menu-list">
                <router-link :to="{ name: 'reservations' }">
                    <li><a>{{ t('shell.menu.reserve') }}</a></li>
                </router-link>
                <router-link :to="{ name: 'my_reservations' }">
                    <li><a>{{ t('shell.menu.my_reservations') }}</a></li>
                </router-link>
                <router-link :to="{ name: 'office_attendance' }">
                    <li><a>{{ t('shell.menu.list_of_colleagues') }}</a></li>
                </router-link>
            </ul>

            <p class="menu-label">
                {{ t('shell.menu.requests') }}
            </p>

            <ul class="menu-list">
                <router-link :to="{ name: 'user_requests' }">
                    <li><a>{{ t('shell.menu.my_requests') }}</a></li>
                </router-link>
                <router-link v-if="userSessionStore.userHasRole('hr')" :to="{ name: 'manage_requests' }">
                    <li><a>{{ t('shell.menu.manage_home_office_requests') }}</a></li>
                </router-link>
            </ul>

            <p class="menu-label" v-if="userSessionStore.userHasRole('admin')">
                {{ t('shell.menu.users') }}
            </p>

            <ul class="menu-list">
                <router-link v-if="userSessionStore.userHasRole('admin')" :to="{ name: 'user_profile_management' }">
                    <li><a>{{ t('shell.menu.user_profile_management') }}</a></li>
                </router-link>
            </ul>
        </aside>
    </div>
</template>

<script setup>
import { ref, computed, onMounted, onBeforeUnmount } from 'vue';
import { useI18n } from 'vue-i18n';
import { useShellStore } from 'src/store/shellStore';
import PfpDropdown from 'src/components/shell/PfpDropdown.vue';
import { useUserSessionStore } from 'src/store/userSessionStore';

const { t } = useI18n();
const shell = useShellStore();
const userSessionStore = useUserSessionStore();

const windowWidth = ref(window.innerWidth);

const isMenuActive = computed(() => {
    return shell.isMenuActive;
});

const isMobile = computed(() => {
    return windowWidth.value <= 1024;
});

const handleResize = () => {
    windowWidth.value = window.innerWidth;
}

onMounted(async () => {
    window.addEventListener('resize', handleResize);
    console.log(userSessionStore.userHasRole('hr'));
});

onBeforeUnmount(() => {
    window.removeEventListener('resize', handleResize);
});
</script>

<style lang="scss" scoped>
.sidebar {
    width: 250px;
    height: 100vh;
    background-color: white;
    z-index: 10;
    box-shadow: 2px 0px 5px rgba(0, 0, 0, 0.1);
    transition: transform 0.3s;
    opacity: 0;
    transform-origin: left center;
}

.menu {
    padding-top: 10px;
    margin: 8px 10px 0px 30px;
    height: auto;
}

@media (max-width: 1024px) {

    .sidebar {
        max-width: 250px;
        position: absolute;
        top: 52px;
        left: 0;
    }
}
</style>
