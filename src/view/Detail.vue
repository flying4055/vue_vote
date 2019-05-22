<template>
  <div>
    <div style="display: flex;background-color:#fff;padding:18px 0;text-align:center;">
      <div style="flex: 1;" @click="onTapApply()">我也要报名</div>
      <div style="flex: 1;" @click="go_ranking()">排行榜</div>
    </div>
    <van-row type="flex" justify="center" style="padding:18px 0;text-align:center;background-color:#f0f5f9;">
      <van-col span="8">
        <van-row>排名</van-row>
        <van-row>
          <span v-text="detailData.rank">查看排名</span>
        </van-row>
      </van-col>
      <van-col span="8">
        <van-row>票数</van-row>
        <van-row>
          <span v-text="detailData.vote_num">0</span>
        </van-row>
      </van-col>
      <van-col span="8">
        <van-row>热度</van-row>
        <van-row>
          <span v-text="detailData.hot_num">0</span>
        </van-row>
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

    <div class="vote_tab">
      <div class="vote_tab_item" @click="go_home()">首页</div>
      <div class="vote_tab_item">
        <div class="vote_like" @click="vote_btn()">
          <van-icon name="like" size="50px" :color="likeColor ? Color1 : Color2" />
          <div>投票</div>
        </div>
      </div>
      <div class="vote_tab_item" @click="onTapGem()">礼物助力</div>
    </div>

    <h1>
      <br>
    </h1>
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
import Personal from "@/components/Personal";
import ShowPage from "@/components/Show";
import Weixin from "../utils/VoteWeixin";
export default {
  name: "detail",
  components: { Personal, ShowPage },
  data() {
    return {
      music_url: '../static/music.mp3',
      music_play: true,
      detail_id: 0,
      active: 0,
      tabActive: 0,
      detailData: [],
      imgLink: '',
      likeColor: 0,
      Color1: "#ff0b55",
      Color2: "#ccc"
    };
  },
  mounted: function () {
    this.detail_id = this.$route.params.id;
    this.$store.commit("set_works_id", this.$route.params.id);
    this.getDetail();
  },
  methods: {
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
    go_home() {
      this.$router.push({
        name: "works",
        params: { pid: this.$store.state.pid }
      });
    },
    go_ranking() {
      this.$router.push({
        name: "ranking",
        params: { pid: this.$store.state.pid }
      });
    },
    onTapApply() {
      this.$router.push({
        name: "apply",
        params: { pid: this.$store.state.pid }
      });
      this.$store.commit("set_active", 1);
    },
    onTapGem() {
      this.$router.push({
        name: "gem",
        params: { pid: this.$store.state.pid }
      });
    },
    vote_btn() {
      let self = this;
      this.$axios
        .post("/api/event/vote", {
          works_id: self.detail_id,
          vote_id: self.$store.state.pid
        })
        .then(function (res) {
          if (res.code == 1) {
            self.getDetail();
            self.$toast(res.msg);
            // 询问是否购买道具
            self.dialog.confirm({
              title: '提示',
              message: `是否为${self.detailData.username}使用礼物助力`
            }).then(() => {
              // on confirm
              self.onTapGem();
            }).catch(() => {
              // on cancel
            });
          } else {
            self.$toast(res.msg);
          }
        })
        .catch(function (err) {
          console.log(err.msg);
        });
    },
    async getDetail() {
      let self = this;
      this.$axios
        .get("/api/event/get_works_info", {
          params: {
            id: self.$route.params.id
          }
        })
        .then(function (res) {
          console.log(res.data);
          if (res.code == 1) {
            self.detailData = res.data;
            self.likeColor = res.data.is_vote;
            self.imgLink = res.data.images;
            document.title = self.detailData.title;
            Weixin.share(self.detailData.share_title, self.detailData.share_desc, self.detailData.share_image);
          } else {
            self.$toast("请求错误,数据返回失败!!");
          }
        });
    }
  }
};
</script>


<style scoped>
@keyframes heartbeat {
  0% {
    transform: scale(0.8, 0.8);
    opacity: 1;
  }
  25% {
    transform: scale(1, 1);
    opacity: 0.8;
  }
  100% {
    transform: scale(0.8, 0.8);
    opacity: 1;
  }
}

.vote_tab {
  width: 100%;
  height: 50px;
  display: flex;
  flex-direction: row;
  background-color: #fafafa;
  /* overflow: hidden; */
  position: fixed;
  bottom: 0;
}

.vote_tab_item {
  flex: 1;
  text-align: center;
  line-height: 50px;
  color: #777;
  font-size: 14px;
}

.vote_like {
  margin-top: 8px;
  height: 20px;
  position: relative;
}

.vote_like i {
  position: absolute;
  top: -32px;
  left: 30%;
  /* animation: heartbeat 1s infinite; */
}

.vote_like i:active {
  position: absolute;
  top: -32px;
  left: 30%;
  animation: heartbeat 1s infinite;
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

