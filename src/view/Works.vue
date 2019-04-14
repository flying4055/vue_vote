<template>
	<div>
		<van-row>
			<van-notice-bar background="#f05a28" color="#fff" text="当我想你的时候外面的世界与我无关就连我自己都归你统管当我想你的时候光亮都是多余即使我闭上双眼你甜美的容颜在我心里历历清晰
当我想你的时你是我的太阳你灿烂的脸庞点亮我的心房我的脉管里流淌着你的温暖如果有人问我：幸福是什么？我会毫不犹豫地回答：我最大的幸福是忘我地想你"
			 left-icon="volume-o" />
		</van-row>
		<van-row>
			<van-swipe :autoplay="3000" indicator-color="white">
				<van-swipe-item v-for="(item, index) in bannerList" :key="index">
					<img :src="item.imgUrl" width="100%">
				</van-swipe-item>
			</van-swipe>
		</van-row>
		<van-row>
			<van-cell-group>
				<van-cell title="活动" value="报名" />
			</van-cell-group>
			<van-row type="flex" justify="center" style="padding:18px 0;text-align:center;background-color:#f0f5f9;">
				<van-col span="8">
					<van-row>已报名</van-row>
					<van-row>999</van-row>
				</van-col>
				<van-col span="8">
					<van-row>累计票数</van-row>
					<van-row>999</van-row>
				</van-col>
				<van-col span="8">
					<van-row>访问量</van-row>
					<van-row>999</van-row>
				</van-col>
			</van-row>
			<div style="padding:12px 0;text-align:center;background-color:#fff;border-bottom:1px solid #eee;">票榜</div>
		</van-row>
		<van-row>
			<van-search v-model="searchVal" placeholder="请输入搜索关键词" show-action shape="round" @search="onSearch">
				<div slot="action" @click="onSearch">搜索</div>
			</van-search>
		</van-row>
		<!-- 图片列表 -->
		<van-row style="padding-top:10px;background-color:#f5f5f5;">
			<van-row gutter="4" style="margin:0;">
				<van-col class="photo_item" span="12" v-for="item in items" :key="item.id" style="margin-bottom: 0.875rem;">
					<div style="line-height:0;">
						<img :src="item.img" width="100%" height="260px">
					</div>
					<div class="photo_title">
						<div style="flex:1;">标题</div>
						<div class="photo_title_btn" @click="$router.push({ name:'detail', params: { id: item.id } })">投票</div>
					</div>
				</van-col>
			</van-row>
			<div style="margin: .875rem 0;text-align:center;color:#ccc;background-color:rgba(0,0,0,0)">加载更多...</div>
		</van-row>
		<!-- 活动介绍 -->
		<van-row>
			<van-cell-group>
				<van-cell title="活动介绍" label="亭，是中国的传统建筑，起源于军事，近似于现代哨卡。之后多建于自然山水、村镇路旁，供行人歇脚休息、乘凉观景，既“亭者，停也。”继而发展为园林艺术景观。
        亭，从造型来说“造式无定，自三角、四角、五角、梅花、六角、横圭、八角到十字，”以及圆形、扇形等等。亭的种类有景亭、桥亭、戏亭、碑亭、江亭、凉亭等等。
        亭，或面对丘陵山岳，或滨临江河湖海，或隐于静寂园林，或显身喧闹市井；有的高大雄伟，有的小巧玲珑，有的富丽堂皇， 有的简朴清新，与周围景物构成了丰富多彩的风景线。
         亭，自有以来，文人骚客，登临之际，咏唱风光，吊古叹今，题诗著文，留下了许多典故佳话和名篇美文。
        亭，无论其建筑实体之艺术风采，还是书法楹联之文化底蕴，都是中华民族令人叹为观止的瑰宝。" />
			</van-cell-group>
		</van-row>
		<!-- <Layout></Layout> -->
	</div>
</template>

<script>
// import Layout from "@/components/Layout";

export default {
	name: "works",
	// components: { Layout },
	data() {
		return {
			layout_list: [{
				id:1,name:'首页',icon:'home-o',to_url:'works',
				id:2,name:'',icon:'home-o',to_url:'works',
				id:3,name:'首页',icon:'home-o',to_url:'works',
				id:4,name:'首页',icon:'home-o',to_url:'works',
			}],
			searchVal: "",
			bannerList: [],
			items: []
		};
	},
	mounted: function() {
		for (let i = 0; i < 5; i++) {
			this.bannerList.push({
				id: i,
				name: "titile_" + i,
				imgUrl:
					"https://shp.qpic.cn/cms_pic/1346018069/1a7cfdcbffbf44549e6464f682ff74c5/0"
			});
		}
		for (let i = 1; i < 10; i++) {
			this.items.push({
				id: i,
				name: "titile_" + i,
				img:
					"https://shp.qpic.cn/cms_pic/1283036243/18553c171b00855d8c1c499dae1615bd/0"
			});
		}
		console.log(this);
		console.log(this.$route.params);
	},
	methods: {
		onSearch() {
			console.log(this.searchVal);
		}
		// nextLink() {
		// 	// this.$router.push('/detail')
		// 	this.$router.push({ name:'detail', params: { id: 6 } });
		// }
	}
};
</script>

<style scoped >
.photo_item {
	background-color: #fff;
}
.photo_title {
	display: flex;
	text-align: center;
	background-color: #fff;
	color: #666;
	min-height: 35px;
	line-height: 35px;
	font-size: inherit;
	justify-content: flex-start;
	align-items: stretch;
}

.photo_title_btn {
	width: 60px;
	font-size: 14px;
	color: #f8f8f8;
	background-color: #f38181;
}
</style>