<template>
	<div>
		<van-nav-bar :title="$route.name" />
		<van-cell-group>
			<van-field v-model="username" label="用户名" placeholder="请输入用户名" error />
			<van-field v-model="phone" label="手机号" placeholder="请输入手机号" error-message="手机号格式错误" />
		</van-cell-group>
	</div>
</template>

<script>
export default {
    name: "apply",
    data() {
		return {
			username: "yang",
			phone: "17612345678"
		};
	}
};
</script>

<style scoped>
</style>