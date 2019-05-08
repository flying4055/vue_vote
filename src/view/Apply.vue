<template>
  <div>
    <form class="form" v-on:submit.prevent="onSubmit()">
      <div class="form-group">
        <div class="form-item">
          <label for="">手机号码</label>
          <input type="text" name="mobile" placeholder="请输入手机号" v-model="formData.mobile" required maxlength="11">
        </div>

        <div class="form-item form-item-textarea">
          <label for="textarea">用户简介</label>
          <textarea name="user_intro" id='textarea' contenteditable="true" v-model="formData.user_intro" required placeholder="请输入作品简介" cols="20" rows="3" maxlength="150"></textarea>
        </div>
        <div class="form-item">
          <label for="">作品名称</label>
          <input type="text" name="title" placeholder="请输入作品名称" v-model="formData.title" required maxlength="15">
        </div>
        <div class="form-item form-item-textarea">
          <label for="textarea">作品简介</label>
          <textarea name="user_intro" id='textarea' contenteditable="true" v-model="formData.content" required placeholder="请输入作品简介" cols="20" rows="3" maxlength="150"></textarea>
        </div>
        <div class="form-item">
          <label for="">作品视频</label>
          <input type="text" name="video" placeholder="请填写视频地址 (选填)" v-model="formData.video_url">
        </div>
      </div>
      <div class="form-group">
        <div class="form-item" style="display: block;">
          <label for="">
            上传图片
            <van-uploader name="image" :after-read="onRead" accept="image/png, image/jpeg" style="float:right;">
              <van-icon name="plus" size="18px" color="#ff5959" />
            </van-uploader>
          </label>
          <br>
          <div class="form-item">
            <label for="">图片地址</label>
            <input type="text" placeholder="点击 '加号' 添加图片" :value="formData.images" disabled style="overflow: hidden;">
          </div>
          <div style="display: block;background:#fafafa;min-height:80px;">
            <img :src="formData.images" style="width:100%;">
          </div>
        </div>
      </div>
      <van-button type="primary" @type.native="submit" style="width: 100%;">确认提交</van-button>
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
      if (inputData.images == null) {
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
            this.$router.push({ name: "home", params: { pid: this.$store.state.pid } });
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
  padding: 10px 8px;
}

.form-group {
  padding: 10px;
  margin-bottom: 16px;
  box-shadow: 0 0 10px #ddd;
  border-radius: 5px;
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
  background-color: #fafafa;
}

.form-item textarea {
  width: 100%;
  line-height: 2;
  border: none;
  resize: none;
  background-color: #fafafa;
}

.form-item textarea::placeholder {
  flex: 1;
  line-height: 2;
}
</style>
