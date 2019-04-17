<template>
  <div>
    <van-row>
      <van-notice-bar background="#f05a28" color="#fff" text="当我想你的时候外面的世界与我无关就连我自己都归你统管当我想你的时候光亮都是多余即使我闭上双眼你甜美的容颜在我心里历历清晰
当我想你的时你是我的太阳你灿烂的脸庞点亮我的心房我的脉管里流淌着你的温暖如果有人问我：幸福是什么？我会毫不犹豫地回答：我最大的幸福是忘我地想你" left-icon="volume-o" />
    </van-row>
    <van-row>
      <van-swipe :autoplay="3000" indicator-color="white">
        <van-swipe-item v-for="(item, index) in bannerList" :key="index">
          <img :src="item.image" width="100%">
        </van-swipe-item>
      </van-swipe>
    </van-row>
    <van-row>
      <van-cell-group>
        <van-cell :title="active_info.name?active_info.name:'活动'" value="报名" @click="baoming()" />
      </van-cell-group>
      <van-row type="flex" justify="center" style="padding:18px 0;text-align:center;background-color:#f0f5f9;">
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
      <div class="ranking" @click="$router.push('/ranking')">票榜</div>
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
        <van-cell title="活动介绍" :label="active_info.desc" />
      </van-cell-group>
    </van-row>
    <!-- <Layout></Layout> -->
  </div>
</template>

<script>
// import Layout from "@/components/Layout";

export default {
  name: "works",
  inject: ['app'],
  // components: { Layout },
  data() {
    return {
      detail_id: null,
      active_info: [],
      layout_list: [{
        id: 1, name: '首页', icon: 'home-o', to_url: "{ name:'home', params: { pid: app.active_id } }",
        id: 2, name: '报名', icon: 'records', to_url: '/apply',
        id: 3, name: '活动介绍', icon: 'notes-o', to_url: '/intro',
        id: 4, name: '活动奖品', icon: 'user-o', to_url: '/prize',
      }],
      searchVal: "",
      bannerList: [],
      items: []
    };
  },
  mounted: function () {
    this.detail_id = this.$route.params.pid

    this.getInfo();
    console.log(this.detail_id);
    console.log(this);
  },
  methods: {
    onSearch() {
      console.log(this.searchVal);
    },
    baoming() {
      this.$router.push('/apply')
    },
    getInfo() {
      let self = this;
      this.$axios.get('/api/event/get_info/id/' + self.detail_id)
        .then(function (res) {
          console.log(res);
          if (res.code === 1) {
            self.active_info = res.data;
            self.bannerList = res.data.banner;
            console.log('请求成功')
          } else {
            console.log('请求错误,数据返回失败!!')
          }
        })
    },
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

.ranking {
  color: #2a3a4a;
  padding: 12px 0;
  text-align: center;
  background-color: #fff;
  border-bottom: 1px solid #eee;
}
</style>
