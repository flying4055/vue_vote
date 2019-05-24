<template>
	<div>
		<div class="gem-box">
			<div class="gem-box-title">礼物助力</div>
			<div class="gem-btn-group">
				<div class="gem-btn-item" v-for="item in pay_list" :key="item.id">
					<div class="gem-btn" v-bind:class="{ btnActive: item.isBtnActive }" @click="onClickBtn(item)">
						<div class="gem-img">
							<img :src="item.img_url" alt="">
						</div>
						<div>{{item.title}}({{item.vote_num}})票</div>
						<div style="color:red;padding: 3px 0;">{{item.price}}元 &nbsp;</div>
					</div>
				</div>
			</div>
			<div class="tips" v-if="currentPrice">
				<p>价格 {{currentPrice.price}} 元, 增加{{currentPrice.vote_num}}票</p>
			</div>
			<van-button type="primary" size="large" @click="clickPayBtn()">微信支付</van-button>
			<!-- <p>2元 = 10票 5元 = 28票 10元 = 58票 50元 = 288票 100元 = 588票 200元 = 1288票</p> -->
		</div>
	</div>
</template>

<script>
	import Weixin from '../utils/VoteWeixin'

	export default {
		name: 'gem',
		data() {
			return {
				currentPrice: '',
				currentWorks_id: '',
				pay_list: [
					{ id: 1, title: "幸运小花", vote_num: 10, img_url: '../static/pay/gem_1.png', price: 2, isBtnActive: 0 },
					{ id: 2, title: "一帆风顺", vote_num: 28, img_url: '../static/pay/gem_2.png', price: 5, isBtnActive: 0 },
					{ id: 3, title: "美丽彩虹", vote_num: 58, img_url: '../static/pay/gem_3.png', price: 10, isBtnActive: 0 },
					{ id: 4, title: "心心相印", vote_num: 288, img_url: '../static/pay/gem_4.png', price: 50, isBtnActive: 0 },
					{ id: 5, title: "爱的跑车", vote_num: 588, img_url: '../static/pay/gem_5.png', price: 100, isBtnActive: 0 },
					{ id: 6, title: "爱的飞机", vote_num: 1288, img_url: '../static/pay/gem_6.png', price: 200, isBtnActive: 0 }
				]
			}
		},
		mounted() {
			document.title = '礼物助力'
			this.currentWorks_id = this.$route.params.works_id;
		},
		methods: {
			// 2元10票   5元28票    10元58票    50元288票    100元588票     200元1288票
			onClickBtn: function (e) {
				if (e.isBtnActive === 1) {
					e.isBtnActive = 0;
					this.currentPrice = '';
					return false;
				}
				let price_arr = this.pay_list;
				for (let item in price_arr) {
					price_arr[item].isBtnActive = 0
				}
				e.isBtnActive = 1;
				this.currentPrice = e;
			},
			clickPayBtn: function () {
				let self = this;
				if (this.currentPrice == false) {
					this.$dialog.alert({ message: '请先选择充值多少钻石' })
					return false;
				}
				// let vote_id = this.currentVote_id;
				let works_id = this.currentWorks_id;
				let amount = this.currentPrice.price;
				// this.$toast(`恭喜您成功充值 ${this.currentPrice.price} 钻石`)
				Weixin.payment(works_id, amount);
			}
		}
	}
</script>

<style scoped>
	.btnActive {
		border: 2px solid #07c160 !important;
	}

	.gem-box {
		padding: 8px;
		height: 100vh;
		background-color: #fafafa;
	}

	.gem-box-title {
		text-align: center;
		padding: 28px 0;
		font-size: 18px;
		color: #333;
		font-weight: bold;
	}

	.gem-btn-group {
		display: grid;
		grid-template-columns: 1fr 1fr 1fr;
		grid-column-gap: 5px;
		grid-row-gap: 15px;
		justify-items: stretch;
		align-items: stretch;
		padding-bottom: 20px;
	}

	.gem-btn-item {
		width: 100%;
		height: 100%;
	}

	.gem-btn {
		padding: 8px;
		text-align: center;
		border-radius: 3px;
		border: 2px solid #fff;
		color: #07c160;
		font-size: 12px;
		line-height: 2em;
		background-color: #fff;
		box-sizing: border-box;
	}

	.gem-img {
		height: 100px;
		display: flex;
		justify-content: center;
		align-items: center;
		align-content: center;
		overflow: hidden;
	}

	.gem-img img {
		width: 100%;
		height: auto;
	}

	.tips {
		margin-top: 14px;
		color: #999;
		text-align: center;
		user-select: none;
	}
</style>
