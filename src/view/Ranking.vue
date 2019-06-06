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
          <div class="item-user">{{item.user_name}} {{item.workName}} <span v-text="item.sort_id"></span> 号</div>
          <div style="font-size:14px;">票数 <span v-text="item.vote_num"></span></div>
          <div>距离上一名还差 <span v-text="item.last_num"></span> 票</div>
          <div v-html="item.user_intro"></div>
        </div>
        <div class="item-right">
          <div>
            <template v-if="index < 3">
              <b style="color:red;" v-text="item.rank"></b> <span> /NO</span>
            </template>
            <template v-else>
              <b v-text="item.rank"></b><span> /NO</span>
            </template>
          </div>
        </div>
      </div>
    </div>
    <div class="loading" @click="onLoading">加载更多</div>
  </div>
</template>

<script>
export default {
  name: "ranking",
  data() {
    return {
      action_id: 0,
      listData: "",
      start: 1,
      end: 10,
      page: 1
    };
  },
  mounted() {
    let self = this;

    self.action_id = localStorage.getItem('ranking_id');
    if (self.$route.params.pid !== undefined) {
      self.action_id = self.$route.params.pid;
      localStorage.setItem('ranking_id', self.action_id);
    }

    self.getRanking();
    document.title = "排行榜";
  },
  methods: {
    onVote_loading() {
      this.getRanking();
      this.$toast("刷新成功");
    },
    // 获取活动中作品列表
    // 获取排行榜
    getRanking() {
      let self = this;
      this.$axios
        .get("/api/event/rank", {
          params: {
            vote_id: localStorage.getItem('ranking_id'),
            start: self.start,
            page: self.page,
            end: self.end
          }
        })
        .then(function (res) {
          console.log(res.data);
          if (res.code === 1) {
            if (res.data.length <= 0) {
              self.$toast('暂无更多作品');
              --self.page
              return false;
            }
            if (self.page >= 2) {
              self.listData = self.listData.concat(res.data);
            } else {
              self.listData = res.data;
            }
          } else {
            self.$toast(res.msg);
            --self.page
          }
        });
    },
    onRanking(id) {
      this.$router.push({ name: "detail", params: { id: id } });
    },
    onLoading() {
      this.page++
      this.getRanking();
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
  background-color: #f8f8f8;
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
  overflow: hidden;
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
  background-position: 5px 0;
}

.item:nth-child(2) .item-img {
  background-image: url("../assets/king2.png");
  background-repeat: no-repeat;
  background-size: 60px;
  background-position: 5px 0;
}

.item:nth-child(3) .item-img {
  background-image: url("../assets/king3.png");
  background-repeat: no-repeat;
  background-size: 60px;
  background-position: 5px 0;
}

.item-img {
  display: flex;
  align-items: center;
}

.item-img img {
  margin: 0 auto;
  border: 1px solid #fff;
  width: 58px;
  height: 58px;
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

.loading {
  padding: 20px 0;
  text-align: center;
  color: #999;
}
</style>
