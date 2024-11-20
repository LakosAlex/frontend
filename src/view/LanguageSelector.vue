<template>
    <div class="language-dropdown is-small">
        <select v-model="language" @change="changeLanguage">
            <option value="en">English</option>
            <option value="hu">Magyar</option>
        </select>
    </div>
</template>

<script setup>
import { library } from '@fortawesome/fontawesome-svg-core';
import { faEnvelope, faLock } from '@fortawesome/free-solid-svg-icons';
import { useI18n } from 'vue-i18n';
import { ref } from 'vue';
import { fetchTranslations, setI18nLanguage } from 'src/vue-setup';
import Cookies from 'js-cookie';

library.add(faEnvelope, faLock);

const { t } = useI18n();
const language = ref(Cookies.get('language'));


const changeLanguage = () => {
    // Fetch translations and set i18n language
    fetchTranslations({ locale: `${language.value}-${language.value}`, languageCode: language.value })
        .then(() => {
            setI18nLanguage(language.value)
        });
}

</script>

<!-- scaffolding-disable unless keepExamples -->
<style lang="scss" scoped>
.language-dropdown {
    padding-left: 10px;
    select {
        padding: 5px 10px;
        border: none;
        border-radius: 5px;
        box-shadow: 0 1px 3px rgba(0, 0, 0, 0.2);
        background: rgba(255, 255, 255, 0.9);
        color: #333;
        font-size: 16px;
        transition: box-shadow 0.3s ease;

        &:focus {
            box-shadow: 0 2px 6px rgba(0, 0, 0, 0.2);
            outline: none;
        }

        option {
            color: #333;
        }
    }
}
</style>

