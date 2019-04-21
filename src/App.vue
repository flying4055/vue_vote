<template>
	<div id="app">
		<router-view />
	</div>
</template>

<script>
export default {
	name: "App",
	provide() {
		return {
			app: this
		};
	},
	mounted() {
		// console.log(this.$wxSdk);
		// let wx_base_url =
		// 	"https://open.weixin.qq.com/connect/oauth2/authorize?";
		// let app_id = "wx581ac1620490998c";
		// let scope = "snsapi_userinfo";
		// let redirect_uri =
		// 	"http%3a%2f%2fvote.crjblog.cn%2findex%2findex%2findex";
		// let wx_url =
		// 	"appid=&redirect_uri=&response_type=code&scope=&state=STATE&connect_redirect=1#wechat_redirect";
		// let requset_url =
		// 	wx_base_url + "appid=" + app_id + "&redirect_uri=" + redirect_uri;
		// 微信公众号配置
		// this.$axios.get(wx_url, function(res) {
		// 	console.log(res);
		// });
		// window.location.href = wx_url;
	}
};
</script>

<style>
#app {
	font-family: "Avenir", Helvetica, Arial, sans-serif;
	-webkit-font-smoothing: antialiased;
	-moz-osx-font-smoothing: grayscale;
	font-size: 14px;
	color: #333;
}
</style>
