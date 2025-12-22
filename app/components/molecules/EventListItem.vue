<template>
	<router-link :to="`/performance/${item.id}`" class="eli">
		<div class="date-box">
			<div class="day">{{ item.day }}</div>
			<div class="month">{{ item.month }}</div>
		</div>

		<div class="content">
			<div class="top-row">
				<span class="title">{{ item.title }}</span>
				<span class="status" :class="item.status === 'Satışta' ? 'on-sale' : 'sold'">{{ item.status }}</span>
			</div>
			<div class="venue">{{ item.venue }}</div>
		</div>

		<div class="chev">›</div>
	</router-link>
</template>

<script setup lang="ts">
defineProps({ item: { type: Object, required: true } })
</script>

<style scoped>
.eli{ position:relative; display:flex; align-items:center; gap:16px; padding:0 16px 0 0; background:#ffffff; border-radius:6px; border:1px solid rgba(15,23,42,0.06); text-decoration:none; color:inherit; width:100%; max-width:1180px; height:75px; box-sizing:border-box }
.eli::before{ content:''; position:absolute; left:0; top:0; bottom:0; width:12px; background:#e94b3c; border-top-left-radius:6px; border-bottom-left-radius:6px }
.date-box{ width:72px; min-width:72px; height:100%; display:flex; flex-direction:column; justify-content:center; align-items:center; position:relative; box-sizing:border-box; margin-left:16px }
.date-box::after{ content:''; position:absolute; right:-8px; top:12px; bottom:12px; width:1px; background:rgba(15,23,42,0.06); border-radius:1px }
.day{ font-size:20px; font-weight:700; line-height:1 }
.month{ font-size:12px; color:#6b7280 }
.content{ flex:1; display:flex; flex-direction:column; justify-content:center }
.top-row{ display:flex; align-items:center; gap:10px; margin-bottom:4px }
.title{ font-weight:600; color:#0b1111; font-size:15px }
.venue{ font-weight:600; color:#0b1111 }
.status{ padding:6px 10px; border-radius:14px; font-size:12px; white-space:nowrap }
.status.on-sale{ background:#12b76a; color:#fff }
.status.sold{ background:#9ca3af; color:#fff }
.chev{ font-size:22px; color:#9ca3af; margin-left:12px }
@media (max-width:920px){ .eli{ width:100%; padding:10px 12px } .date-box{ width:60px; min-width:60px } }
</style>

