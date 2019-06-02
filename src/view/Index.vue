<template>
	<div>
		<div class="cover">
			<img src="../assets/cover3.jpg" alt="">
		</div>
		<div class="main">
			<van-list v-model="loading" :finished="finished" finished-text="没有更多了" @load="onLoad">
				<div class="list-box">
					<ul>
						<li v-for="item in list" :key="item.id" :title="item.id">
							<div @click="$router.push({ name:'works', params: { pid: item.id } })">
								<div class="title">{{item.name}}</div>
								<div class="content">
									<label>活动介绍</label>
									<article>{{getStringObj(item.desc)}}</article>
								</div>
								<div class="footer">
									<label>开始/结束</label>
									<div>{{getDateString(item.start_time)}}</div>
									<div>{{getDateString(item.end_time)}}</div>
								</div>
							</div>
						</li>
					</ul>
				</div>
			</van-list>
		</div>
		<p>
			<br>
		</p>
		<van-tabbar v-model="active" active-color="#ff5959">
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
				this.loading = true;
				this.fecthList();
			},
			fecthList() {
				let self = this;
				this.$axios.get('/api/event/get_list')
					.then(function (res) {
						console.log(res);
						if (res.code === 1) {
							self.list = res.data;
							self.loading = false;
							// self.$toast(res.msg);
						}
						if (res.code === 0) {
							self.finished = true;
						} else {
							self.finished = true;
						}
					}).catch(function (err) {
						localStorage.clear();
						window.location.href = '/login'
					});
			},
			// 获取日期字符串
			getDateString(timestamp) {
				return new Date(parseInt(timestamp) * 1000).toLocaleDateString().replace(/\//g, '-');
			},
			// 截取字符串
			getStringObj(value) {
				return value.substring(0, 57);
			}
		}
	};
</script>

<style scoped>
	/* 淡入-从左 */
	@keyframes fadeinL {
		0% {
			opacity: 0;
			-webkit-transform: translateX(150px);
		}
		100% {
			opacity: 1;
			-webkit-transform: translateX(0);
		}
	}
	.cover {
		background-color: inherit;
	}

	.cover img {
		width: 100%;
	}

	.main {
		position: relative;
		background-color: inherit;
	}
	.van-list {
		position: absolute;
		top: -40px;
		left: 14px;
		right: 14px;
		min-height: inherit;
		padding-bottom: 5rem;
	}

	.list-box {
		background-color: inherit;
	}

	.list-box ul {
		min-height: inherit;
	}

	.list-box ul li {
		list-style: none;
		min-height: 100px;
		color: #666;
		font-size: 12px;
		padding: 10px;
		border-radius: 8px;
		box-shadow: 0 4px 10px #d0d9ef;
		background-color: #fff;
		margin-bottom: 14px;
		position: relative;
		overflow: hidden;
		animation: fadeinL 0.8s;
	}

	.list-box ul li:nth-child(-n + 2):before {
		background: #ff5959;
		content: " hot ";
		position: absolute;
		top: 2px;
		right: -40px;
		width: 105px;
		font-size: 10px;
		padding: 3px 0;
		color: #fff;
		text-align: center;
		transform: rotate(45deg);
		z-index: 1;
	}

	.title {
		font-size: 14px;
		font-weight: 400;
		margin-bottom: 5px;
	}

	.content {
		color: #777;
		padding: 3px;
		min-height: 3rem;
		display: flex;
		justify-content: flex-start;
		align-items: flex-start;
		letter-spacing: 1.3px;
	}

	.content label {
		width: 68px;
	}

	.content article {
		flex: 1;
		display: -webkit-box;
		-webkit-box-orient: vertical;
		-webkit-line-clamp: 3;
		overflow: hidden;
	}

	.footer {
		color: #777;
		width: 100%;
		box-sizing: border-box;
		padding: 3px;
		display: flex;
		justify-content: flex-start;
		align-items: flex-end;
	}

	.footer label {
		width: 68px;
	}

	.footer div {
		flex: 1;
	}
</style>
