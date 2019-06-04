<template>
  <div>
    <div class="form" onSubmit="false">
      <van-cell-group>
        <van-field v-model="formData.title" label="作品名称" placeholder="请输入作品名称(选填)" maxlength="10" />
        <van-field v-model="formData.mobile" type="number" label="手机号码" placeholder="请输入手机号码(选填)" maxlength="11" />
        <van-field v-model="formData.user_name" label="你的姓名" placeholder="请输入你的姓名(必填)" maxlength="10" />
        <van-field v-model="formData.user_intro" label="自我介绍" type="textarea" placeholder="请输入自我介绍(选填)" rows="1" autosize maxlength="150" />
        <van-field v-model="formData.content" label="作品简介" type="textarea" placeholder="请输入作品简介(选填)" rows="1" autosize maxlength="150" />
        <van-field v-model="formData.video_url" label="作品视频" placeholder="请输入视频地址(选填)" />
      </van-cell-group>
      <van-panel title="图片上传(必填)">
        <div style="text-align:center;padding: 14px;">
          <div>
            <p v-for="item of img_list" :key="item">
              <img style="width: 100%;" :src="item" alt="">
            </p>
          </div>
          <p>
            <van-uploader v-if="img_list.length < 3" name="uploader" :after-read="onRead">
              <van-icon name="add-o" size="30px" color="#ddd" />
            </van-uploader>
          </p>

        </div>
      </van-panel>
      <br>
      <div style="text-align:center;">
        <van-button type="primary" @click="onSubmit()" style="width: 92%;">确认提交</van-button>
      </div>

    </div>
  </div>
</template>

<script>
export default {
  name: "apply",
  data() {
    return {
      formData: {
        'title': '',
        'vote_id': '',
        'images': '',
        'content': '',
        'mobile': '',
        'user_intro': '',
        'user_name': '',
        'video_url': ''
      },
      img_list: []
    };
  },
  mounted() {
    document.title = '活动报名';
  },
  methods: {
    onSubmit() {
      let self = this;
      let inputData = this.formData;
      console.log(inputData.images);

      if (this.user_name == '') {
        self.$toast('必填项不能为空')
        return false;
      }
      if (this.img_list.length <= 0) {
        self.$toast('作品图片不能没有哦')
        return false;
      }
      inputData.vote_id = this.$store.state.pid;
      inputData.images = this.img_list.join(',');
      console.log(inputData);
      this.$axios.post("/api/event/add_works", inputData)
        .then(function (res) {
          console.log(res);
          if (res.code == 1) {
            self.$toast(res.msg);
            self.$router.push({ name: "home", params: { pid: this.$store.state.pid } });
          } else {
            self.$toast(res.msg);
          }
        });
    },
    // 读入图片信息
    onRead(file, detail) {
      let self = this;
      console.log(file);
      let param = new FormData();
      param.append('image', file.file);  //append 向form表单添加数据
      //添加请求头  通过form添加的图片和文件的格式必须是multipart/form-data
      let config = {
        headers: { 'Content-Type': 'multipart/form-data' }
      };
      self.$axios.post("/api/common/upload", param, config)
        .then((res) => {
          if (res.code == 1) {
            console.log(res.data.url);
            console.log(self.formData);
            self.$toast(res.msg);
            self.img_list.push(res.data.url);
          } else {
            self.$toast(res.msg);
          }
        })
        .catch((err) => {
          console.log(err);
        })
    }
  }
};
</script>

<style scoped>
.form {
  font-size: 14px;
  box-sizing: border-box;
  /* padding: 10px 14px; */
}
</style>
