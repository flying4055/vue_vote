<template>
  <div>
    <div class="vote-box" @click="onVote_loading()">票榜</div>
    <div style="padding: 5px 0;text-align:center;color:#333;font-size:12px;">
      {{new Date().toLocaleString() }}
    </div>
    <div class="list">
      <div class="item" v-for="(item, index) in listData" :key='index' @click="onRanking(item.id)">
        <div class="item-img">
          <img v-if="item.user_image" :src="item.user_image" alt="">
          <img v-else src="../assets/user_image.jpg" alt="">
        </div>
        <div class="item-content">
          <div class="item-user">{{item.user_name}} {{item.workName}} <span v-text="item.id"></span>号</div>
          <div>票数<span v-text="item.vote_num"></span></div>
          <div>距离第一名还差<span v-text="item.vote_num"></span>票</div>
          <div v-html="item.user_intro"></div>
        </div>
        <div class="item-right">
          <div>
            <template v-if="index < 3">
              <b style="color:red;" v-text="index +1"></b><span> /NO</span>
            </template>
            <template v-else>
              <b v-text="index +1"></b><span> /NO</span>
            </template>
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
      action_id: 0,
      listData: ''
    };
  },
  mounted() {
    this.action_id = this.$route.params.pid
    this.getRanking();
  },
  methods: {
    onVote_loading() {
      this.getRanking();
      this.$toast('刷新成功');
    },
    // 获取活动中作品列表
    // 获取排行榜
    getRanking() {
      let self = this;
      this.$axios.get("/api/event/get_works_list", {
        params: {
          id: self.action_id
        }
      }).then(function (res) {
        console.log(res.data);
        if (res.code == 1) {
          self.listData = [];
          self.listData = res.data;
        } else {
          self.$toast(res.msg);
        }
      });
    },
    onRanking(id) {
      this.$router.push({ name: "detail", params: { id: id } });
    }
  }
};
</script>

<style scoped>
.vote-box {
  width: 100%;
  padding: 10px 0;
  color: #f05a28;
  border-bottom: 1px solid #f05a28;
  background-color: #fff;
  text-align: center;
}

@keyframes slidein {
  from {
    transform: rotate3d(1, 1, 1, 25deg);
  }
  to {
    transform: rotate3d(0);
  }
}

.list {
  padding: 8px;
}

.item {
  display: grid;
  grid-template-columns: 70px auto 45px;
  box-shadow: 0 5px 8px #ddd;
  padding: 8px;
  border-radius: 5px;
  font-size: 12px;
  color: #444;
  margin-bottom: 1rem;
  min-height: 100px;
  transform-origin: bottom left;
  animation: slidein 0.5s;
}

.item:nth-child(1) {
  color: #fff;
  background-image: linear-gradient(135deg, #feb692 10%, #ea5455 100%);
}
.item:nth-child(2) {
  color: #fff;
  background-image: linear-gradient(135deg, #fccf31 10%, #f55555 100%);
}
.item:nth-child(3) {
  color: #fff;
  background-image: linear-gradient(135deg, #90f7ec 10%, #32ccbc 100%);
}

.item:nth-child(1) .item-user {
  color: #fff;
}
.item:nth-child(2) .item-user {
  color: #fff;
}
.item:nth-child(3) .item-user {
  color: #fff;
}

.item:nth-child(1) .item-img {
  background-image: url("../assets/king.png");
  background-repeat: no-repeat;
  background-size: 60px;
  background-position: 5px 2px;
}

.item:nth-child(2) .item-img {
  background-image: url("../assets/king2.png");
  background-repeat: no-repeat;
  background-size: 60px;
  background-position: 5px 2px;
}

.item:nth-child(3) .item-img {
  background-image: url("../assets/king3.png");
  background-repeat: no-repeat;
  background-size: 60px;
  background-position: 5px 2px;
}

.item-img {
  display: flex;
  align-items: center;
  background-repeat: no-repeat;
  background-size: 60px;
  background-position: 5px 2px;
}

.item-img img {
  margin: 0 auto;
  border: 1px solid #fff;
  width: 64px;
  height: 64px;
  border-radius: 100%;
  background-color: #fff;
  box-sizing: border-box;
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
