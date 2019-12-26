<template>
  <div>
    <van-notice-bar :text="notice_text" left-icon="volume-o" />
    <div style="display: flex;background-color:#fff;padding:18px 0;text-align:center;">
      <div style="flex: 1;" @click="onTapApply()">我也要报名</div>
      <div style="flex: 1;" @click="go_ranking()">集赞榜</div>
    </div>
    <van-row type="flex" justify="center" style="padding:18px 0;text-align:center;background-color:#f0f5f9;">
      <van-col span="8">
        <van-row>排名</van-row>
        <van-row>
          <span v-text="detailData.rank">查看排名</span>
        </van-row>
      </van-col>
      <van-col span="8">
        <van-row>赞数</van-row>
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
          <div>为Ta集赞</div>
        </div>
      </div>
      <div v-if="is_show" class="vote_tab_item" @click="onTapGem()">礼物助力</div>
      <div v-else class="vote_tab_item" @click="go_ranking()">集赞榜</div>
    </div>

    <h1>
      <br />
    </h1>
    <!-- music -->
    <div class="music-box">
      <div class="music-tools" @click="onClickPlay()">
        <audio :src="music_url" autoplay></audio>
        <img v-bind:class="{ rotate_music: music_play }" style="width: 100%" src="../assets/music.png" alt />
      </div>
    </div>
    <!-- music -->
    <!-- 投诉 -->
    <div class="complain-box" @click="onClickComplain()">投诉</div>
    <!-- 投诉 -->

    <van-dialog v-model="show" confirmButtonText="知道了" :beforeClose="beforeClose">
      <img :src="gift_url" @click="onTapGem()" />
      <div style="text-align:center;padding:8px 0;font-size: 16px;">集赞成功</div>
    </van-dialog>
    <!-- 分享 -->
    <div class="share_btn" @click="clickShare()">
      <van-icon name="share" size="32px" />
      <!-- 分享 -->
    </div>
    <van-popup v-model="showPopup" round :style="{width:'320px', height: '520px', background:'none'}">
      <img :src="posterImg" alt />
    </van-popup>
    <vue-canvas-poster :painting="painting" @success="success"></vue-canvas-poster>
  </div>
</template>

<script>
import { Popup, Toast } from "vant";
import Personal from "@/components/Personal";
import ShowPage from "@/components/Show";
import Weixin from "../utils/VoteWeixin";
export default {
  name: "detail",
  components: { Personal, ShowPage },
  data() {
    return {
      music_url: "../static/music.mp3",
      music_play: true,
      notice_text: "",
      detail_id: 0,
      active: 0,
      tabActive: 0,
      detailData: [],
      imgLink: "",
      likeColor: 0,
      Color1: "#ff0b55",
      Color2: "#ccc",
      show: false,
      gift_url: "../static/gift.jpg",
      is_show: false,
      showPopup: false,
      qrcode: "",
      posterImg: "", // 最终生成的海报图片
      painting: {}
    };
  },
  mounted: function() {
    this.detail_id = this.$route.params.id;
    this.getDetail();
  },
  methods: {
    // 海报生成成功后方法
    success(src) {
      this.posterImg = src;
      console.log("海报生成成功");
    },
    // 点击分享
    clickShare() {
      let that = this;
      console.log("点击分享按钮");
      Toast.loading({
        message: "分享海报生成中,请稍等...",
        forbidClick: true
      });
      if (that.posterImg !== "") {
        Toast.clear();
        that.showPopup = true;
        return false;
      } else {
        that.createPoster();
      }
      setTimeout(function() {
        Toast.clear();
        that.showPopup = true;
      }, 1000);
    },
    // 生成海报
    createPoster() {
      let that = this;
      console.log("生成海报");
      that.$nextTick(function() {
        that.painting = {
          width: 320,
          height: 500,
          views: [
            {
              type: "rect",
              top: 0,
              left: 0,
              background: "#f4f5f7",
              width: 320,
              height: 500,
              radius: 4
            },
            {
              type: "text",
              content: `${that.detailData.share_title}`,
              fontSize: 16,
              top: 20,
              left: 20,
              width: 280,
              breakWord: true,
              MaxLineNumber: 2
            },
            {
              type: "image",
              url: `${that.detailData.share_image}`,
              // url: `http://img.yangliangblog.top/avatar.jpg`,
              left: 20,
              top: 60,
              width: 280,
              height: 400,
              radius: 4
            },
            {
              type: "qrcode",
              content: `${window.location.href}`,
              background: "#fff",
              color: "#000",
              top: 360,
              left: 200,
              width: 100,
              height: 100
            },
            {
              type: "text",
              content: `长按识别二维码开始加油吧`,
              fontSize: 12,
              color: "#999999",
              top: 460,
              left: 150
            }
          ]
        };
      });
    },
    // 投诉
    onClickComplain() {
      this.$router.push({ name: "complain" });
    },
    // 音乐播放
    onClickPlay() {
      let x = document.getElementsByTagName("Audio")[0];
      if (x.paused) {
        x.play();
        this.music_play = true;
      } else {
        x.pause();
        this.music_play = false;
      }
    },
    go_home() {
      this.$router.push({
        name: "works",
        params: { pid: this.detailData.vote_id }
      });
    },
    go_ranking() {
      this.$router.push({
        name: "ranking",
        params: { pid: this.detailData.vote_id }
      });
    },
    onTapApply() {
      this.$router.push({
        name: "apply",
        params: { pid: this.detailData.vote_id }
      });
      this.$store.commit("set_active", 1);
    },
    onTapGem() {
      if (!this.is_time()) {
        return false;
      }
      this.$router.push({
        name: "gem",
        params: { works_id: this.detailData.id }
      });
    },
    beforeClose(action, done) {
      let self = this;
      if (action === "confirm") {
        // self.onTapGem();
        done(); //关闭
      } else if (action === "cancel") {
        done(); //关闭
      }
    },
    vote_btn() {
      if (!this.is_time()) {
        return false;
      }
      let self = this;
      this.$axios
        .post("/api/event/vote", {
          works_id: self.detail_id,
          vote_id: self.detailData.vote_id
        })
        .then(function(res) {
          if (res.code == 1) {
            self.getDetail();
            self.$toast(res.msg);
            // 询问是否购买道具
            self.show = true;
          } else {
            self.$toast(res.msg);
          }
        })
        .catch(function(err) {
          console.log(err);
        });
    },
    async getDetail() {
      let self = this;
      this.$axios
        .get("/api/event/get_works_info", {
          params: { id: self.$route.params.id }
        })
        .then(function(res) {
          if (res.code == 1) {
            self.detailData = res.data;
            self.likeColor = res.data.is_vote;
            self.imgLink = res.data.images;
            let activeDb = res.data.event;
            if (activeDb.music_file !== "") {
              self.music_url = activeDb.music_file;
              self.notice_text = activeDb.notice_text;
            }
            document.title = self.detailData.title;
            Weixin.share(
              self.detailData.share_title,
              self.detailData.share_desc,
              self.detailData.share_image
            );
            if (self.is_time()) {
              self.is_show = true;
            }
          } else {
            self.$toast("请求错误,数据返回失败!!");
          }
        });
    },
    is_time() {
      let self = this;
      // 当前时间 小于 开始时间  活动尚未开始
      // 当前时间 大于 结束时间  活动已结束
      let event = this.detailData.event;
      let date = new Date();
      let start_time = parseInt(event.start_time) * 1000;
      let end_time = parseInt(event.end_time) * 1000;
      if (date.getTime() < start_time) {
        self.$toast("活动尚未开始");
        return false;
      } else if (date.getTime() > end_time) {
        self.$toast("活动已结束");
        return false;
      }
      return true;
    }
  }
};
</script>

<style scoped>
.share_btn {
  position: fixed;
  bottom: 80px;
  right: 20px;
  width: 50px;
  height: 50px;
  background-color: #f38181;
  color: #fff;
  font-size: 12px;
  letter-spacing: 1px;
  border-radius: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  box-shadow: 1px 1px 1px 1px rgba(0, 0, 0, 0.2);
}

@keyframes heartbeat {
  0% {
    transform: scale(0.8, 0.8);
    opacity: 1;
  }
  25% {
    transform: scale(1, 1);
    opacity: 0.9;
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
  animation: heartbeat 1s infinite;
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
  top: 40px;
  left: 15px;
  width: 32px;
  height: 32px;
  border-radius: 100%;
  overflow: hidden;
  z-index: 99;
  text-align: center;
  line-height: 32px;
  color: #fff;
  font-size: 12px;
  background-color: rgba(0, 0, 0, 0.4);
}

.music-box {
  position: fixed;
  top: 38px;
  right: 15px;
  width: 35px;
  height: 35px;
  border-radius: 100%;
  overflow: hidden;
  z-index: 100;
}

.music-tools {
  position: relative;
}

.music-tools .rotate_music {
  animation: rotate 8s linear 1s infinite alternate;
}
</style>
