<template>
	<div>
		<van-row>
			<van-panel title="活动介绍"></van-panel>
		</van-row>
		<div style="padding:3px 14px;line-height:28px;color:#666;" v-html="$store.state.db.desc"></div>
	</div>
</template>

<script>
	export default {
		name: "intro",
		mounted() {
			document.title = "活动介绍";
		}
	};
</script>

<style scoped>
</style>
