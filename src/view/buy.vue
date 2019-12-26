<template>
  <div style="background: #f2f2f2;">
    <van-row>
      <van-swipe :autoplay="3000" indicator-color="#ff5959">
        <van-swipe-item v-for="(item, index) in active_info.banner" :key="index">
          <img style="object-fit:contin" :src="item.image" width="100%" />
        </van-swipe-item>
      </van-swipe>
    </van-row>
    <van-cell-group>
      <van-cell>{{active_info.name}}</van-cell>
    </van-cell-group>
    <van-cell-group>
      <van-cell>
        <div style="display:flex;justify-content:space-between">
          <div style="font-size: 20px;font-weight:600;color: darkorange">￥ {{active_info.look_num}}</div>
          <div>
            已报名
            <span style="color: orange">{{active_info.join_num}}</span>人
          </div>
        </div>
      </van-cell>
    </van-cell-group>
    <van-cell-group>
      <van-cell :title="`访问量 ${active_info.look_num}`" icon="fire-o" />
    </van-cell-group>
    <van-cell-group title="商家信息" class="mb20">
      <van-cell title="地址" icon="location-o" />
      <van-cell title="电话" icon="phone-o" />
    </van-cell-group>
    <van-cell-group title="活动时间" class="mb20">
      <van-cell :title="active_info.notice_text" icon="underway-o" />
    </van-cell-group>
    <van-cell-group title="商户信息" class="mb20">
      <van-cell>我们是一家全国连锁的品牌教育机构</van-cell>
    </van-cell-group>
    <van-cell-group title="报名须知" class="mb20">
      <van-cell>
        <div>有效期</div>
        <p>2019年12月20日至2020年11月18日</p>
        <div>预约信息</div>
        <p>请您提前一天预约, 每张抢购券最多1人使用, 不可与其他优惠同享</p>
        <div>温馨提示</div>
        <p>商户可能致电您, 预约到店时间, 请保持手机通畅</p>
      </van-cell>
    </van-cell-group>
    <van-cell-group title="详情介绍">
      <van-cell>
        <div style="background:#fff;line-height:28px;color:#666;" v-html="active_info.desc"></div>
      </van-cell>
    </van-cell-group>

    <div class="position-box">
      <div class="nav-box">
        <div class="nav-back" @click="$router.back(-1)">返回集赞</div>
        <div class="nav-kf">客服</div>
        <div class="nav-apply">报名</div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "intro",
  data() {
    return {
      active_info: {}
    };
  },
  mounted: function() {
    // this.active_info.id = this.$route.params.id;
    this.getInfo();
  },
  methods: {
    // 获取活动信息
    async getInfo() {
      let self = this;
      this.$axios
        .get("/api/event/get_info/id/" + this.$route.params.id)
        .then(function(res) {
          // console.log(res.data);
          if (res.code === 1) {
            self.active_info = res.data;
            document.title = self.active_info.name;
          } else {
            // self.$toast("请求错误,数据返回失败!!");
          }
        })
        .catch(err => {
          console.log(err);
        });
    }
  }
};
</script>

<style scoped>
.position-box {
  position: fixed;
  bottom: 0;
  left: 0;
  width: 100%;
  background: #f2f2f2;
  overflow: hidden;
}
.nav-box {
  display: flex;
  justify-content: space-between;
  color: #999;
}
.nav-box div {
  flex: 1 80px;
  text-align: center;
  line-height: 40px;
}
.nav-kf {
  background: #fafafa;
}

.van-cell-group__title {
  background: #fff;
  margin-top: 10px;
}
</style>
