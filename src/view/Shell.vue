<template>
	<Toast />
	<div>
		<Navbar />
		<div class="columns">
			<Menu />
			<section class="column content-section" style="margin-top: 8px;">
				<div class="overlay" :class="{ active: isMenuActive }"></div>
				<router-view></router-view>
			</section>
		</div>

		<footer class="footer">
			<div class="content has-text-centered">
				<p>Officer 2024</p>
			</div>
		</footer>
	</div>
</template>

<script setup>
import { computed, onMounted } from 'vue';
import { AuthorizationApi } from 'src/api/authorizationApi';
import { useUserSessionStore } from 'src/store/userSessionStore';
import { useShellStore } from 'src/store/shellStore';
import Toast from 'primevue/toast';
import Navbar from 'src/components/shell/Navbar.vue';
import Menu from "src/components/shell/Menu.vue"

const authorizationApi = AuthorizationApi();
const userSessionStore = useUserSessionStore();
const shell = useShellStore();

const isMenuActive = computed(() => {
	return shell.isMenuActive;
});

const checkUserLoginStatus = async () => {
	await authorizationApi.getLoggedInUserInfo();
}

onMounted(async () => {
	checkUserLoginStatus();
	await userSessionStore.getLoggedInUserInfoAndSetStates();
});
</script>


<style lang="scss" scoped>
.overlay {
	position: fixed;
	top: 0;
	left: 0;
	width: 100%;
	height: 100%;
	background-color: rgba(0, 0, 0, 0.322);
	backdrop-filter: blur(3px);
	pointer-events: none;
	z-index: 9;
	opacity: 0;
	transition: opacity 0.3s;
}

.overlay.active {
	opacity: 1;
}

.content-section {
	overflow-y: auto;
	padding: 20px;
}
</style>
