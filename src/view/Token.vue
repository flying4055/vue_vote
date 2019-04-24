<template>
	<div>
		<h1>{{$router}}</h1>
		<h1>Token</h1>
	</div>
</template>

<script>
export default {
	name: "token",
	mounted() {
		console.log(123);
		console.log(this.$router);
		// this.$router.commit("set_beforeLoginUrl", this.$router.name);
	}
};
</script>

<style scoped>
</style>
