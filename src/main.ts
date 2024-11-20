import './style/main.scss';

import { createApp } from 'vue';
import { RouterView } from 'vue-router';
import { i18n, router } from './vue-setup';
import { createPinia } from 'pinia';
import ToastService from 'primevue/toastservice';
import "vue-toastification/dist/index.css";
import PrimeVue from 'primevue/config';


const pinia = createPinia();

createApp(RouterView)
	.use(i18n)
	.use(router)
	.use(ToastService)
	.use(pinia)
	.use(PrimeVue)
	.mount(document.body);
