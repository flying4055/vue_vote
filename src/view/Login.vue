<template>
	<div>
		<router-view></router-view>
    <h3 v-if="cli" style="text-align:center;">请在微信客户端登陆!</h3>
	</div>
</template>

<script>
	import Cookies from "js-cookie";
	import Store from "../store";

	export default {
		name: "login",
		data() {
			return {
        cli: false,
				user: "",
				beforeLoginUrl: ""
			};
		},
		created() {
			document.title = "登陆中...";

			let ua = window.navigator.userAgent.toLowerCase();
			console.log(ua.match(/MicroMessenger/i));
			if (ua.match(/MicroMessenger/i) == "micromessenger") {
				console.log("跳转到微信授权页面");
				// 跳转到微信授权页面
				window.location.href =
					"https://open.weixin.qq.com/connect/oauth2/authorize?appid=wxa6cbea2e7840e13d&redirect_uri=http%3a%2f%2ftest.ssjunjun.com%2fapi%2fweixin%2fcallback&response_type=code&scope=snsapi_userinfo&state=STATE";
			} else{
        this.cli = true;
      }
		}
	};
</script>

<style scoped>
</style>
