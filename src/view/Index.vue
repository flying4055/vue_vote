<template>
	<div>
		<van-nav-bar title="标题" />
		<h2>this is index pages</h2>
		<van-list v-model="loading" :finished="finished" finished-text="没有更多了" @load="onLoad">
			<div class="list-box">
				<ul>
					<li v-for="item in list" :key="item.id" :title="item.id">
						<div @click="$router.push({ name:'home', params: { pid: item.id } })">
							人生很多人事，不是不懂，只是无奈。
							一辈子，就图个心里痛快。那些想不通头疼，想通了心疼的人事，不如淡然视之。我们真实地活着，但不是每个人每件事都要较真到底。
							真实的背后，往往隐藏着一场心痛。开心地活着，如花自然开，自然落，不难过。花非花，雾非雾，看淡者优雅。
						</div>
					</li>
				</ul>
			</div>
		</van-list>
		<p>
			<br>
		</p>
		<van-tabbar v-model="active">
			<van-tabbar-item icon="home-o">主页</van-tabbar-item>
			<van-tabbar-item icon="user-o">我的</van-tabbar-item>
		</van-tabbar>
	</div>
</template>

<script>
export default {
	name: "index",
	data() {
		return {
			active: 0,
			list: [],
			loading: false,
			finished: false
		};
	},
	methods: {
		onLoad() {
			// 异步更新数据
			setTimeout(() => {
				// for (let i = 0; i < 10; i++) {
				// 	this.list.push(this.list.length + 1);
				// }

				for (let i = 1; i < 50; i++) {
					this.list.push({id:i});
				}
				// 加载状态结束
				this.loading = false;

				// 数据全部加载完成
				if (this.list.length >= 40) {
					this.finished = true;
				}
			}, 500);
		}
	}
};
</script>

<style scoped>
.list-box {
	padding: 8px 5px;
	box-sizing: border-box;
	background-color: #fafafa;
	min-height: 300px;
}

.list-box ul {
	margin: 0;
	min-height: inherit;
}

.list-box ul li {
	list-style: none;
	min-height: 100px;
	background-color: #fff;
	box-shadow: 0 0 20px #eee;
	padding: 8px;
	border-radius: 3px;
}
</style>