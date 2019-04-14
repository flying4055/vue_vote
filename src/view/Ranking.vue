<template>
	<div>
		<van-nav-bar title="排行榜" left-arrow @click-left="$router.go(-1)" />
		<div style="padding: 8px 0;text-align:center;">
            {{new Date().toLocaleString() }}
        </div>
		<div class="list">
			<div class="item" v-for="(item, index) in workList" :key='index'>
				<div class="item-img">
					<img :src="item.imgUrl" alt="">
				</div>
				<div class="item-content">
					<div>{{item.username}} {{item.workName}} {{item.id}}号</div>
					<div>票数{{item.num}}</div>
					<div>距离第一名还差 {{item.num}}票</div>
					<div>我叫{{item.info}}</div>
				</div>
				<div class="item-right">
					<div>
						<b style="color: #f00;">{{index+1}}</b><span>/NO</span>
					</div>
				</div>
			</div>
		</div>
	</div>
</template>

<script>
export default {
	name: "ranking",
	data() {
		return {
			workList: [
				{
					id: 1,
					username: "liu",
					workName: "<荷花>",
					num: 9983,
					imgUrl:
						"https://shp.qpic.cn/cms_pic/1346018069/1a7cfdcbffbf44549e6464f682ff74c5/0",
					info: "请为我投票"
				},
				{
					id: 2,
					username: "yang",
					workName: "<荷花>",
					num: 2233,
					imgUrl:
						"https://shp.qpic.cn/cms_pic/1346018069/1a7cfdcbffbf44549e6464f682ff74c5/0",
					info: "请为我投票"
				},
				{
					id: 3,
					username: "xu",
					workName: "<荷花>",
					num: 1233,
					imgUrl:
						"https://shp.qpic.cn/cms_pic/1346018069/1a7cfdcbffbf44549e6464f682ff74c5/0",
					info: "请为我投票"
				}
			]
		};
	}
};
</script>

<style scoped>
.list {
	padding: 8px;
}

.item {
	display: grid;
	grid-template-columns: 80px auto 60px;
	box-shadow: 0 0 20px #ddd;
	padding: 8px;
	border-radius: 5px;
	font-size: 12px;
	color: #666;
    margin-bottom: 1rem;
    min-height: 100px;
}

.item-img {
	display: flex;
    align-items: center;
}
.item-img img {
	width: 75px;
	height: 75px;
	border-radius: 100%;
}

.item-content {
	padding: 0 8px;
	line-height: 1.8;
}

.item-content div:first-child {
	color: #333;
	font-size: 16px;
	line-height: 1.6;
}

.item-right {
	display: flex;
	justify-content: flex-end;
	align-items: center;
}
.item-right b {
	font-size: 1.45rem;
	align-self: flex-start;
}
</style>