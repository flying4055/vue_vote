<template>
	<div style="font-size:14px;">
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
			<div class="ranking" @click="$router.push({name:'ranking',params: { pid: $store.state.pid } })">票榜</div>
		</van-row>
		<van-row>
			<van-search v-model="searchVal" placeholder="请输入编号或名称" show-action shape="round" @search="onSearch">
				<div slot="action" @click="onSearch()">搜索</div>
			</van-search>
		</van-row>
		<!-- 作品列表 -->
		<div class="list-box" v-if="listData.length > 0">
			<div class="list-item" v-for="item in listData" :key="item.id">
				<div class="list-item-content">
					<div class="list-item-img" @click="onVote_btn(item.id)">
						<div class="list-item-vote_num">
							<span v-text="item.id"></span>号&nbsp;
							<span v-text="item.vote_num"></span>票
						</div>
						<img :src="item.images" width="100%">
					</div>
					<div class="list-item-footer">
						<div class="list-item-footer-title">
							<span v-text="item.user_name?item.user_name.substring(0, 3):'参与者'"></span>
							《<span v-text="item.title?item.title:'作品'+item.id "></span>》
						</div>
						<div class="list-item-footer-btn" @click="onVote_btn(item.id)">投票</div>
					</div>
				</div>
			</div>
			<div class="loading">加载更多...</div>
		</div>
		<div v-else class="loading">暂无作品展示</div>
		<!-- 活动介绍 -->
		<van-row>
			<van-panel title="活动介绍"></van-panel>
		</van-row>
		<div style="padding:3px 14px;line-height:28px;color:#666;" v-text="active_info.desc"></div>
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
				imgLink: ''
			};
		},
		watch: {
			$route: {
				handler: function (val, oldVal) {
					console.log(val);
					this.WeixinShare();
				},
				// 深度观察监听
				deep: true
			}
		},
		mounted: function () {
			this.getInfo();
			this.getList();
		},
		methods: {
			onSearch() {
				this.getList();
			},
			// 获取活动信息
			async getInfo() {
				let self = this;
				this.$axios
					.get("/api/event/get_info/id/" + this.$route.params.pid)
					.then(function (res) {
						console.log(res.data);
						if (res.code === 1) {
							self.$store.commit("set_db", res.data);
							self.active_info = res.data;
							self.banners = res.data.banner;
							self.imgLink = self.banners[0]["image"];
							document.title = self.active_info.name;
							Weixin.share(document.title, "来自杉杉互娱公众号的分享", self.imgLink);
							// self.$toast("请求成功");
						} else {
							self.$toast("请求错误,数据返回失败!!");
						}
					})
					.catch(err => {
						console.log(err);
					});
			},
			// 获取活动中作品列表
			getList() {
				let self = this;
				this.$axios
					.get("/api/event/get_works_list", {
						params: {
							id: self.$route.params.pid,
							name: self.searchVal,
							page: self.page
						}
					})
					.then(function (res) {
						if (res.code === 1) {
							console.log(res.data);
							self.listData = res.data;
						} else {
							// self.$toast("请求错误,数据返回失败!!");
						}
					})
					.catch(function (err) {
						console.log(err);
					});
			},
			// 点击投票按钮时
			onVote_btn(id) {
				this.$router.push({ name: "detail", params: { id: id } });
			}
		}
	};
</script>

<style scoped>
	.list-box {
		display: grid;
		grid-template-columns: 50% 50%;
		justify-items: space-around;
		background-color: #f5f5f5;
		box-sizing: border-box;
		margin-bottom: 10px;
		padding: 10px 2px 16px;
	}

	.list-item {
		padding: 3px;
		margin-bottom: 10px;
	}

	.list-item-content {
		min-height: 3rem;
		padding: 2px;
		background-color: #fff;
		box-shadow: 0 0 15px #d0d9ef;
	}

	.list-item-img {
		overflow: hidden;
		position: relative;
	}

	.list-item-vote_num {
		width: 60%;
		text-align: center;
		font-size: 12px;
		color: #fff;
		height: 1.4rem;
		line-height: 1.4rem;
		border-bottom-right-radius: 10px;
		position: absolute;
		top: 1px;
		left: 1px;
		background-color: rgba(0, 0, 0, 0.3);
	}

	.list-item-footer {
		height: 2rem;
		line-height: 2rem;
		font-size: 14px;
		display: flex;
		justify-content: flex-start;
		align-items: center;
		text-align: center;
	}

	.list-item-footer-title {
		flex: 1;
	}

	.list-item-footer-btn {
		width: 55px;
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
		margin: 0.875rem 0;
		text-align: center;
		color: #ccc;
		background-color: rgba(0, 0, 0, 0);
	}
</style>
