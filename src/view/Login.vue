<template>
	<div>
		<router-view></router-view>
	</div>
</template>

<script>
	import Cookies from "js-cookie";
	import Store from "../store";

	export default {
		name: "login",
		data() {
			return {
				user: "",
				beforeLoginUrl: ""
			};
		},
		created() {
			document.title = "登陆 ...";

			let ua = window.navigator.userAgent.toLowerCase();
			console.log(ua.match(/MicroMessenger/i));
			if (ua.match(/MicroMessenger/i) == "micromessenger") {
				console.log("跳转到微信授权页面");
				// 跳转到微信授权页面
				window.location.href =
					"https://open.weixin.qq.com/connect/oauth2/authorize?appid=wx6a0eb033efd229c0&redirect_uri=http%3a%2f%2fwww.ssjunjun.com%2fapi%2fweixin%2fcallback&response_type=code&scope=snsapi_userinfo&state=STATE";
			}
		}
	};
</script>

<style scoped>
</style>
