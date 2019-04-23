<template>
  <div>
    <van-row>
      <van-notice-bar background="#f05a28" color="#fff" text="当我想你的时候外面的世界与我无关就连我自己都归你统管当我想你的时候光亮都是多余即使我闭上双眼你甜美的容颜在我心里历历清晰
当我想你的时你是我的太阳你灿烂的脸庞点亮我的心房我的脉管里流淌着你的温暖如果有人问我：幸福是什么？我会毫不犹豫地回答：我最大的幸福是忘我地想你" left-icon="volume-o" />
    </van-row>
    <van-row style="background-color:#fff;padding:18px 0;text-align:center;">
      <van-col span="12">
        <div @click="onTapApply()">我也要报名</div>
      </van-col>
      <van-col span="12">帮TA拉票</van-col>
    </van-row>
    <van-row type="flex" justify="center" style="padding:18px 0;text-align:center;background-color:#f0f5f9;">
      <van-col span="8">
        <van-row>排名</van-row>
        <van-row v-text="detailData.rank">查看排名</van-row>
      </van-col>
      <van-col span="8">
        <van-row>票数</van-row>
        <van-row v-text="detailData.vote_num">0</van-row>
      </van-col>
      <van-col span="8">
        <van-row>热度</van-row>
        <van-row v-text="detailData.hot_num">0</van-row>
      </van-col>
    </van-row>
    <van-tabs v-model="active">
      <van-tab title="展示">
        <ShowPage :data="detailData"></ShowPage>
      </van-tab>
      <van-tab title="个人资料">
        <personal :data="detailData"></personal>
      </van-tab>
    </van-tabs>

    <van-tabbar v-model="tabActive" active-color="#f00" fixed>
      <van-tabbar-item icon="home-o" :to="{ name:'works', params: { pid: $store.state.pid } }">首页</van-tabbar-item>
      <van-tabbar-item icon="like-o" size="20" @click.once="vote_btn()">投票</van-tabbar-item>
      <van-tabbar-item icon="friends-o" :to="{ name:'ranking', params: { pid: $store.state.pid } }">排行榜</van-tabbar-item>
    </van-tabbar>

    <h1>
      <br>
    </h1>
  </div>
</template>

<script>
import Personal from "@/components/Personal";
import ShowPage from "@/components/Show";

export default {
  name: "detail",
  components: { Personal, ShowPage },
  data() {
    return {
      detail_id: 0,
      active: 0,
      tabActive: 0,
      detailData: []
    };
  },
  mounted: function () {
    this.detail_id = this.$route.params.id
    this.getDetail();
  },
  methods: {
    onClickTab() {
      // this.$router.push("/detail/show");
    },
    onTapApply() {
      this.$router.push({ name: "apply", params: { pid: this.$store.state.pid } });
      this.$store.commit('set_active', 1)
    },
    vote_btn() {
      let self = this;
      this.$axios.post('/api/event/vote', {
        vote_id: self.detail_id,
        works_id: self.$store.state.pid
      }).then(function (res) {
        if (res.code == 1) {
          self.$toast(res.msg);
        } else {
          self.$toast(res.msg);
        }
      }).catch(function (err) {
        console.log(err.msg);
      });
    },
    getDetail() {
      let self = this;
      this.$axios.get("/api/event/get_works_info", {
        params: {
          id: self.$route.params.id
        }
      }).then(function (res) {
        console.log(res.data);
        if (res.code == 1) {
          self.detailData = res.data;
          self.$toast(res.msg);
        } else {
          self.$toast("请求错误,数据返回失败!!");
        }
      });
    }
  }
};
</script>

<style scoped>
</style>
