<template>
	<div style="font-size:14px;">
		<van-notice-bar :text="$store.state.notice_text" left-icon="volume-o" />
		<van-row>
			<van-swipe :autoplay="3000" indicator-color="#ff5959">
				<van-swipe-item v-for="(item, index) in banners" :key="index">
					<img :src="item.image" width="100%">
				</van-swipe-item>
			</van-swipe>
		</van-row>
		<van-row>
			<van-cell-group>
				<van-cell :title="active_info.name?active_info.name:'活动'" />
			</van-cell-group>
			<van-row type="flex" justify="center" style="padding:18px 0;text-align:center;background-color:#eff1f7;">
				<van-col span="8">
					<van-row>已报名</van-row>
					<van-row v-text="active_info.join_num"></van-row>
				</van-col>
				<van-col span="8">
					<van-row>累计票数</van-row>
					<van-row v-text="active_info.vote_num"></van-row>
				</van-col>
				<van-col span="8">
					<van-row>访问量</van-row>
					<van-row v-text="active_info.look_num"></van-row>
				</van-col>
			</van-row>
			<div class="ranking" style="color: #999;" v-text="count_down"></div>
			<div class="ranking" @click="$router.push({name:'ranking',params: { pid: $store.state.pid } })">票榜</div>
		</van-row>
		<van-row>
			<van-search v-model="searchVal" placeholder="请输入编号或名称" show-action shape="round" @search="onSearch">
				<div slot="action" @click="onSearch()">搜索</div>
			</van-search>
		</van-row>
		<!-- 作品列表 -->
		<div v-if="listData.length > 0">

			<div class="list-box">
				<ul class="list-box1">
					<div v-for="(item, index) in listData" :key="item.id" @click="onVote_btn(item.id)">
						<div class="list-item" v-if="index%2 != 1">
							<div class="list-item-vote_num">
								<span v-text="item.sort_id"></span>号&nbsp;
								<span v-text="item.vote_num"></span>票
							</div>
							<img :src="item.images" width="100%">
							<div class="list-item-footer">
								<div class="list-item-footer-title">
									<span v-text="item.user_name?item.user_name.substring(0, 3):'参与者'"></span>
									<span v-if="item.title">《{{item.title}}》</span>
								</div>
								<div class="list-item-footer-btn" @click="onVote_btn(item.id)">投票</div>
							</div>
						</div>
					</div>
				</ul>

				<ul class="list-box2">
					<div v-for="(item, index) in listData" :key="item.id" @click="onVote_btn(item.id)">
						<div class="list-item" v-if="index%2 != 0">
							<div class="list-item-vote_num">
								<span v-text="item.sort_id"></span>号&nbsp;
								<span v-text="item.vote_num"></span>票
							</div>
							<img :src="item.images" width="100%">
							<div class="list-item-footer">
								<div class="list-item-footer-title">
									<span v-text="item.user_name?item.user_name.substring(0, 3):'参与者'"></span>
									<span v-if="item.title">《{{item.title}}》</span>
								</div>
								<div class="list-item-footer-btn" @click="onVote_btn(item.id)">投票</div>
							</div>
						</div>
					</div>
				</ul>

			</div>
			<div class="loading" @click="loadingPage">加载更多</div>
		</div>
		<div v-else class="loading">暂无作品展示</div>
		<!-- 活动介绍 -->
		<van-row>
			<van-panel title="活动介绍"></van-panel>
		</van-row>
		<div style="padding:3px 14px;line-height:28px;color:#666;" v-html="active_info.desc"></div>

		<!-- music -->
		<div class="music-box">
			<div class="music-tools" @click="onClickPlay()">
				<audio :src="music_url" autoplay></audio>
				<img v-bind:class="{ rotate_music: music_play }" style="width: 100%" src="../assets/music.png" alt="">
			</div>
		</div>
		<!-- music -->
		<!-- 投诉 -->
		<div class="complain-box" @click="onClickComplain()">投诉</div>
		<!-- 投诉 -->
	</div>
</template>

<script>
	import Weixin from "../utils/VoteWeixin";
	export default {
		name: "works",
		data() {
			return {
				detail_id: null,
				active_info: [],
				searchVal: "",
				page: 1,
				banners: null,
				listData: [],
				imgLink: '',
				music_url: '../static/music.mp3',
				music_play: true,
				count_down: ''
			};
		},
		mounted: function () {
			this.getInfo();
			this.getList();
		},
		methods: {
			countDown() {
				let self = this;
				// 活动信息未加载成功 就不执行
				if (self.active_info.length <= 0) {
					return false;
				}
				let event = self.active_info;
				let date = new Date();
				let start_time = parseInt(event.start_time) * 1000;
				let end_time = parseInt(event.end_time) * 1000;
				// 当前时间 大于 结束时间  = 活动已结束
				if (date.getTime() > end_time) {
					self.count_down = "活动已结束";
					return false;
				}
				// 当前时间 小于 活动开始时间 = 活动未开始
				if (date.getTime() < start_time) {
					self.count_down = "活动尚未开始";
					return false;
				}
				setInterval(function () {
          // 倒计时  = 结束时间 - 当前时间;
          // 设置时区
					var date = new Date(end_time);
					var timezoneOffset = date.getTimezoneOffset();
					date.setTime(date.getTime() + timezoneOffset * 60 * 1000 + 480 * 60 * 1000);
					let count_down_time = date.getTime() - new Date().getTime();
					let D = Math.floor(count_down_time / (24 * 3600 * 1000));
					let leave1 = count_down_time % (24 * 3600 * 1000) //计算天数后剩余的毫秒数
					let H = Math.floor(leave1 / (3600 * 1000))
					//计算相差分钟数
					let leave2 = leave1 % (3600 * 1000) //计算小时数后剩余的毫秒数
					let I = Math.floor(leave2 / (60 * 1000))
					//计算相差秒数
					let leave3 = leave2 % (60 * 1000) //计算分钟数后剩余的毫秒数
					let S = Math.round(leave3 / 1000)
					self.count_down = `距离活动结束还有 ${D}天${H}小时${I}分钟${S}秒`;
				}, 1000);
			},
			// 投诉
			onClickComplain() {
				this.$router.push({ name: "complain" });
			},
			// 音乐播放
			onClickPlay() {
				let x = document.getElementsByTagName('Audio')[0];
				if (x.paused) {
					x.play();
					this.music_play = true;
				} else {
					x.pause()
					this.music_play = false;
				}
			},
			onSearch() {
				this.getList();
			},
			// 获取活动信息
			async getInfo() {
				let self = this;
				this.$axios
					.get("/api/event/get_info/id/" + this.$route.params.pid)
					.then(function (res) {
						// console.log(res.data);
						if (res.code === 1) {
							self.$store.commit("set_db", res.data);
							self.active_info = res.data;
							self.banners = res.data.banner;
							self.$store.commit("set_notice_text", res.data.notice_text);
							self.countDown();
							if (res.data.music_file !== "") {
								self.music_url = res.data.music_file;
							}
							self.imgLink = self.banners[0]["image"];
							document.title = self.active_info.name;
							Weixin.share(self.active_info.share_title, self.active_info.share_desc, self.active_info.share_image);
						} else {
							// self.$toast("请求错误,数据返回失败!!");
						}
					})
					.catch(err => {
						console.log(err);
					});
			},
			// 获取活动中作品列表
			getList() {
				let self = this;
				this.$axios.get("/api/event/get_works_list", {
					params: {
						id: self.$route.params.pid,
						name: self.searchVal,
						page: self.page
					}
				}).then(function (res) {
					if (res.code === 1) {
						if (res.data.length <= 0) {
							self.$toast('暂无更多作品');
							--self.page
							return false;
						}
						if (self.page >= 2) {
							self.listData = self.listData.concat(res.data);
						} else {
							self.listData = res.data;
						}
					} else {
						self.$toast(res.msg);
						--self.page
					}
				}).catch(function (err) {
					console.log(err);
				});
			},
			// 点击投票按钮时
			onVote_btn(id) {
				this.$router.push({ name: "detail", params: { id: id } });
			},
			loadingPage() {
				this.page++
				this.getList();
			}
		}
	};
</script>

<style scoped>
	.list-box {
		display: grid;
		grid-template-columns: 1fr 1fr;
		box-sizing: border-box;
		padding: 14px 0;
		background-color: #f5f5f5;
		justify-items: stretch;
		align-items: start;
	}

	.list-box1 {
		padding: 0 4px;
		margin: 0;
		display: inline-block;
		overflow: hidden;
		background-color: #f5f5f5;
	}

	.list-box2 {
		padding: 0 4px;
		margin: 0;
		display: inline-block;
		overflow: hidden;
		background-color: #f5f5f5;
	}

	.list-item {
		/* width: 50vw; */
		padding: 2px;
		box-sizing: border-box;
		background-color: #fff;
		box-shadow: 0 0 10px #d0d9ef;
		position: relative;
		margin-bottom: 10px;
	}

	.list-item:first-child {
		margin-top: 0;
	}

	.list-item-vote_num {
		width: 60%;
		text-align: center;
		font-size: 12px;
		color: #fff;
		height: 1.4rem;
		line-height: 1.4rem;
		border-bottom-right-radius: 8px;
		position: absolute;
		top: 4px;
		left: 4px;
		background-color: rgba(0, 0, 0, 0.3);
	}

	.list-item-footer {
		display: flex;
		justify-content: flex-start;
		align-items: flex-end;
		text-align: center;
		overflow: hidden;
	}

	.list-item-footer-title {
		flex: 1;
		height: 2rem;
		line-height: 2rem;
		font-size: 12px;
		text-align: center;
		overflow: hidden;
		text-overflow: ellipsis;
	}

	.list-item-footer-btn {
		width: 55px;
		height: 2rem;
		line-height: 2rem;
		font-size: 14px;
		color: #fff;
		background-color: #f38181;
	}

	.ranking {
		color: #2a3a4a;
		padding: 12px 0;
		text-align: center;
		background-color: #fff;
		border-bottom: 1px solid #eee;
	}

	.loading {
		padding: 14px 0;
		text-align: center;
		color: #ccc;
		background-color: #f5f5f5;
	}

	@keyframes rotate {
		0% {
			-webkit-transform: rotateZ(0deg);
		}
		100% {
			-webkit-transform: rotateZ(-360deg);
		}
	}

	.complain-box {
		position: fixed;
		top: 38px;
		left: 15px;
		width: 38px;
		height: 38px;
		border-radius: 100%;
		overflow: hidden;
		z-index: 99;
		text-align: center;
		line-height: 38px;
		color: #fff;
		font-size: 12px;
		background-color: rgba(0, 0, 0, 0.4);
	}

	.music-box {
		position: fixed;
		top: 38px;
		right: 15px;
		width: 45px;
		height: 45px;
		border-radius: 100%;
		overflow: hidden;
		z-index: 9999;
	}

	.music-tools {
		position: relative;
	}

	.music-tools .rotate_music {
		animation: rotate 8s linear 1s infinite alternate;
	}
</style>
