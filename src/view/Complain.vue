<template>
  <div class="complain">
    <div class="title">选择投诉该网页的原因 :</div>
    <div class="item">
      <p v-for="item of list" :key="item.id" v-bind:class="{ select: item.isSelect }">{{item.text}}</p>
    </div>
    <div class="title">详情描述</div>
    <div class="textarea-box">
      <textarea name="" id="textarea" rows="6" v-model="description" autofocus placeholder="请输入投诉详情" maxlength="200"></textarea>
      <div class="font-num">{{description.length}}/200</div>
    </div>
    <div class="title">
      <div class="btn-submit" @click="submit">提交</div>
    </div>

    <!-- 弹出层 -->
    <van-popup v-model="show" position="top" :overlay="false">
      <div style="height: 100vh;padding: 14px;box-sizing: border-box;background-color: #f2f2f2;z-index:9999;">
        <div style="text-align: center;padding: 40px 0;">
          <img src="/static/sueecss.png" alt="">
          <p style="letter-spacing: 1.2px;font-size: 18px;font-weight:400;font-family: '微软雅黑'">
            投诉提交成功, 工作人员会尽快处理您的投诉信息!
          </p>
        </div>
        <div class="btn-submit" @click="colsePopup()">确认</div>
      </div>
    </van-popup>
    <!-- 弹出层 -->
  </div>
</template>

<script>
export default {
  name: "complain",
  data() {
    return {
      show: false,
      type: "",
      description: "",
      list: [
        { id: 1, text: '页面包含欺诈信息(如:假红包)', isSelect: 0 },
        { id: 2, text: '页面包含色情信息', isSelect: 0 },
        { id: 3, text: '页面包含暴力恐怖信息', isSelect: 0 },
        { id: 4, text: '页面包含政治敏感信息', isSelect: 0 },
        { id: 5, text: '页面在搜集个人隐私信息(如:钓鱼链接)', isSelect: 0 },
        { id: 6, text: '页面包含诱导分享/关注性质的内容', isSelect: 0 },
        { id: 7, text: '页面可能包谣言信息', isSelect: 0 },
      ]
    }
  },
  methods: {
    submit: function () {
      this.show = true;
      let params = {
        type: this.type,
        description: this.description
      };
      this.$axios.post("/api/event/complaint", params
      ).then((res) => {
        console.log(res);
      })
    },
    colsePopup: function () {
      this.$router.go(-1);
    },
    onClickBtn: function (e) {
      if (e.isSelect === 1) {
        e.isSelect = 0;
        this.type = '';
        return false;
      }
      let list_arr = this.list;
      for (let item in list_arr) {
        list_arr[item].isSelect = 0;
      }
      e.isSelect = 1;
      this.type = e.text;
    },

  }
}
</script>

<style scoped>
.complain {
  height: 100vh;
  box-sizing: border-box;
  background-color: #f8f8f8;
}

.title {
  padding: 10px 14px;
  color: #7a7a7a;
}

.item {
  padding: 0 14px;
  background-color: #fff;
}

.item p {
  margin: 0;
  padding: 10px 0;
  color: #3a3a3a;
  font-size: 16px;
  font-weight: 400;
  font-family: "微软黑体";
  border-bottom: 1px solid #eaeaea;
}

.item p:last-child {
  border-bottom: none;
}

.select {
  background-color: cadetblue;
}

.textarea-box {
  padding: 10px 14px;
  background-color: #fff;
}

.textarea-box .font-num {
  text-align: right;
  color: #8a8a8a;
}

#textarea {
  width: 100%;
  color: #6a6a6a;
  border: none;
  resize: none;
  box-sizing: border-box;
}

.btn-submit {
  margin-top: 12px;
  padding: 12px 14px;
  text-align: center;
  color: #fff;
  font-size: 16px;
  border-radius: 3px;
  background-color: #18ac16;
}
</style>
