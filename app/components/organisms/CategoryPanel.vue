<template>
	<div class="authbuttons">
		<AuthButtons v-if="!isLoggedIn" />
		<button v-else id="main-control-logout" class="mainheader__control--login" @click="$emit('logout')"></button>
	</div>
	</template>
<script setup lang="ts">
import AuthButtons from '~/components/atoms/AuthButtons.vue'
const props = defineProps({ isLoggedIn: { type: Boolean, default: false } });
</script>
<style scoped>
.authbuttons { display:flex; align-items:center; gap:.5rem; }
</style>