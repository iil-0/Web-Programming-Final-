<template>
	<section class="event-list">
		<div class="list">
			<EventListItem v-for="it in events" :key="it.id" :item="it" />
		</div>
	</section>
</template>

<script setup lang="ts">
import EventListItem from '~/components/molecules/EventListItem.vue'
defineProps({ events: { type: Array, default: () => [] } })
</script>

<style scoped>
.event-list{ max-width:1260px; margin:24px auto; font-family:'Poppins', system-ui, Arial, sans-serif }
.section-title{ font-size:24px; margin:8px 0 16px; color:#111827; }
.list{ display:flex; flex-direction:column; gap:12px }
</style>


