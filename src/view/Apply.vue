<template>
	<div>
		<van-nav-bar :title="$route.meta.title" />
		<form class="form">
			<div class="form-group">
				<div class="form-item">
					<label for="">手机号码</label>
					<input type="text" name="phone" placeholder="请输入手机号">
				</div>
				<div class="form-item">
					<label for="">作品名称</label>
					<input type="text" name="works_name" placeholder="请输入作品名称">
				</div>
				<div class="form-item form-item-textarea">
					<label for="textarea">作品简介</label>
					<textarea name="desc" id='textarea' contenteditable="true" placeholder="请输入作品简介" cols="20" rows="3" maxlength="150"></textarea>
				</div>
			</div>
			<div class="form-group">
				<div class="form-item" style="display: block;">
					<label for="">上传图片</label>
					<br>
					<div style="display: block;background:#fafafa;min-height:100px;">
						<!-- <img :src="imageUrl" style="width:100%;height:200px;" alt=""> -->
					</div>
				</div>
			</div>
			<van-button type="primary" @click="onSubmit()" style="width: 100%;">确认提交</van-button>

		</form>
	</div>
</template>

<script>
	export default {
		name: "apply",
		data() {
			return {
				imageUrl: "../assets/user_image.jpg",
				username: "yang",
				phone: "17612345678",
				telephone_err: ""
			};
		},
		mounted() {
			document.title = '活动报名';
		},
		methods: {
			onSubmit() {
				console.log(123);
			},
			// 读入图片信息
			onRead(file, detail) {
				this.$toast(detail.name);
				console.log(file);
				console.log(detail);
			},
			postApply() {
				let self = this;
				return false;
				// this.$axios.get("/api/event/apply", {
				//   params: {

				//   }
				// }).then(function (res) {
				//   console.log(res);
				//   if (res.code === 1) {
				//     self.listData = [];
				//     self.listData = res.data;
				//     // self.$toast(res.msg);
				//   } else {
				//     self.$toast(res.msg);
				//   }
				// });
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
		/* color: #ccc; */
	}
</style>
