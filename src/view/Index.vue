<template>
  <div>
    <van-nav-bar :title="$route.meta.title" />
    <van-list v-model="loading" :finished="finished" finished-text="没有更多了" @load="onLoad">
      <div class="list-box">
        <ul>
          <li v-for="item in list" :key="item.id" :title="item.id">
            <div @click="$router.push({ name:'home', params: { pid: item.id } })">
              <div class="title">{{item.name}}</div>
              <div class="content">
                <label>介绍</label>
                <article>{{item.desc}}</article>
              </div>
              <div class="footer">
                <label>开始/结束</label>
                <div>{{getDateString(item.start_time)}}</div>
                <div>{{getDateString(item.end_time)}}</div>
              </div>
            </div>
          </li>
        </ul>
      </div>
    </van-list>
    <p>
      <br>
    </p>
    <van-tabbar v-model="active">
      <van-tabbar-item icon="home-o">主页</van-tabbar-item>
      <van-tabbar-item icon="user-o">我的</van-tabbar-item>
    </van-tabbar>
  </div>
</template>

<script>
export default {
  name: "index",
  data() {
    return {
      active: 0,
      list: [],
      loading: false,
      finished: false
    };
  },
  methods: {
    onLoad() {
      this.fecthList();
    },
    fecthList() {
      let self = this;
      this.$axios.get('/api/event/get_list')
        .then(function (res) {
          console.log(res);
          if (res.code === 1) {
            self.list = res.data;
            self.loading = false;
            if (res.data.length) {
              self.finished = true;
            }
          } else {
            console.log('请求错误,数据返回失败!!')
          }
        })
    },
    // 获取日期字符串
    getDateString(timestamp) {
      return new Date(parseInt(timestamp) * 1000).toLocaleDateString().replace(/\//g, '-');
      // return new Date(parseInt(timestamp) * 1000).toLocaleString().replace(/:\d{1,2}$/, ' ');
    }
  }
};
</script>

<style scoped>
.list-box {
  padding: 8px 14px;
  box-sizing: border-box;
  background-color: #fafafa;
  min-height: 300px;
}

.list-box ul {
  margin: 0;
  min-height: inherit;
}

.list-box ul li {
  list-style: none;
  min-height: 100px;
  background-color: #fff;
  color: #fafafa;
  background-image: linear-gradient(135deg, #32be71 10%, #28c76f 100%);
  box-shadow: 0 0 20px #eee;
  padding: 8px;
  border-radius: 8px;
  box-shadow: 0 0 10px #ddd;
  margin-bottom: 1rem;
  position: relative;
}

.title {
  font-size: 17px;
  font-weight: bold;
  margin-bottom: 5px;
}

.content {
  padding: 3px;
  min-height: 3rem;
  display: flex;
  justify-content: flex-start;
}

.content label {
  width: 80px;
}

.content article {
  flex: 1;
}

.footer {
  width: 100%;
  box-sizing: border-box;
  padding: 3px;
  display: flex;
  justify-content: flex-start;
  align-items: flex-end;
}

.footer label {
  width: 80px;
}

.footer div {
  flex: 1;
}
</style>
