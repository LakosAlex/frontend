<template>
    <div class="navbar-dropdown is-boxed is-right">
        <router-link :to="{ name: 'profile' }" class="navbar-item">
            <div class="icon">
                <font-awesome-icon :icon="['fas', 'user']" />
            </div>
            <span>{{ t('shell.pfpMenu.profile') }}</span>
        </router-link>

        <div class="navbar-item">
            <font-awesome-icon :icon="['fas', 'language']" />
            <LanguageSelector />
        </div>

        <hr class="navbar-divider">
        <a class="navbar-item" @click="logout()">
            <div class="icon">
                <font-awesome-icon :icon="['fas', 'right-from-bracket']" />
            </div>
            <span>{{ t('shell.pfpMenu.log_out') }}</span>
        </a>
    </div>
</template>

<script setup>
import { useUserSessionStore } from '../../store/userSessionStore';
import { useI18n } from 'vue-i18n';
import { library } from '@fortawesome/fontawesome-svg-core';
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';
import { faLanguage, faUser, faRightFromBracket } from '@fortawesome/free-solid-svg-icons';
import LanguageSelector from 'src/view/LanguageSelector.vue';
library.add(faLanguage, faUser, faRightFromBracket);

const { t } = useI18n();

const userSessionStore = useUserSessionStore();

const logout = async () => {
    await userSessionStore.logoutUserAndRedirectToLoginPage();
}
</script>

<style lang="scss" scoped>
.navbar-item {
    display: flexbox;
}

.navbar-dropdown {
    width: 180px;

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
</style>