<template>
	<div>
		<van-nav-bar :title="$route.name" />
		<van-row v-for="(item,index) in imageList" :key="index">
			<img :src="item.img">
		</van-row>
	</div>
</template>

<script>
export default {
	name: "prize",
	data() {
		return {
			imageList: [
				{
					id: 1,
					img: "https://img.yzcdn.cn/2.jpg"
				},
				{
					id: 2,
					img: "https://img.yzcdn.cn/2.jpg"
				},
				{
					id: 3,
					img: "https://img.yzcdn.cn/2.jpg"
				}
			]
		};
	}
};
</script>

<style scoped>
</style>