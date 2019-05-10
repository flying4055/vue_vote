<template>
  <div>
    <form class="form">
      <van-cell-group>
        <van-field v-model="formData.title" required label="作品名称" placeholder="请输入作品名称" maxlength="10" />
        <van-field v-model="formData.mobile" type="number" required label="手机号码" placeholder="请输入手机号码" maxlength="11" />
        <van-field v-model="formData.user_intro" required label="用户简介" type="textarea" placeholder="请输入用户简介" rows="1" autosize maxlength="150" />
        <van-field v-model="formData.content" required label="作品简介" type="textarea" placeholder="请输入作品简介" rows="1" autosize maxlength="150" />
        <van-field v-model="formData.video_url" label="作品视频" placeholder="请输入视频地址(选填)" />
      </van-cell-group>
      <van-panel title="图片上传">
        <div style="text-align:center;">
          <van-uploader v-if="formData.images == '' " name="uploader" :after-read="onRead">
            <van-icon name="photo-o" size="120px" color="#ddd" />
          </van-uploader>
          <img :src="formData.images" alt="">
        </div>
      </van-panel>
      <br>
      <div style="text-align:center;">
        <van-button type="primary" @click="onSubmit()" style="width: 92%;">确认提交</van-button>
      </div>

    </form>
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
        'video_url': ''
      },
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

      if (inputData.title == "") {
        self.$toast('作品标题不能没有哦')
        return false;
      }
      if (inputData.mobile == "") {
        self.$toast('手机号码不能没有哦')
        return false;
      }

      if (inputData.user_intro == "") {
        self.$toast('用户简介不能没有哦')
        return false;
      }
      if (inputData.content == "") {
        self.$toast('作品简介不能没有哦')
        return false;
      }
      if (inputData.images == "" || inputData.images == null) {
        self.$toast('作品图片不能没有哦')
        return false;
      }
      inputData.vote_id = this.$store.state.pid;
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
            self.formData.images = res.data.url;
            self.$toast(res.msg);
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

.form-group {
  padding: 14px;
  margin-bottom: 16px;
  box-shadow: 0 0 10px #ebedf0;
  /* border-radius: 5px; */
}

.form-item {
  padding: 10px 0;
  display: flex;
  justify-content: flex-start;
}

.form-item label {
  width: 70px;
  min-height: 2rem;
  line-height: 2rem;
}

.form-item-textarea {
  display: block;
}

.form-item input {
  flex: 1;
  border: none;
  padding: 0 8px;
  background-color: #ebedf0;
}

.form-item textarea {
  width: 100%;
  line-height: 2;
  border: none;
  resize: none;
  background-color: #ebedf0;
}

.form-item textarea::placeholder {
  flex: 1;
  line-height: 2;
}

.image-box {
  display: block;
  background: #ebedf0;
  min-height: 80px;
}
</style>
