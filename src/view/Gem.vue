<template>
  <div>
    <div class="gem-box">
      <div class="gem-box-title">钻石充值</div>
      <div class="gem-btn-group">
        <div class="gem-btn-item" v-for="item in pay_list" :key="item.id">
          <van-button plain hairline type="primary" @click="clickPayBtn()" style="width: 100%;">
            <div class="gem-btn">
              <span>{{item.price}} &nbsp;</span>
              <van-icon name="gem-o" color="#2f89fc" size="18px" />
            </div>
          </van-button>
        </div>
      </div>
      <div class="tips">
        <p>提示 : 1 钻石 = 1元</p>
      </div>
    </div>

  </div>
</template>

<script>
import Weixin from '../utils/VoteWeixin'

export default {
  name: 'gem',
  data() {
    return {
      pay_list: [
        { id: 1, price: 100 },
        { id: 2, price: 200 },
        { id: 3, price: 300 },
        { id: 4, price: 400 },
        { id: 5, price: 500 },
        { id: 6, price: 600 },
      ]
    }
  },
  methods: {
    clickPayBtn: function () {
      Weixin.payment();
      this.$toast('恭喜您充值成功')
    },

  }
}
</script>

<style scoped>
.gem-box {
  padding: 14px;
}

.gem-box-title {
  text-align: center;
  padding: 28px 0;
  font-size: 18px;
  color: #333;
  font-weight: bold;
}

.gem-btn-group {
  display: grid;
  grid-template-columns: 1fr 1fr 1fr;
  grid-column-gap: 10px;
  grid-row-gap: 15px;
  justify-items: stretch;
  align-items: stretch;
  padding-bottom: 20px;
}

.gem-btn-item {
  width: 100%;
  height: 100%;
  align-self: stretch;
  /* display: flex;
  justify-content: center;
  align-items: center;
  text-align: center; */
}

.gem-btn {
  /* width: 100%; */
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  text-align: center;
}

.tips {
  margin-top: 14px;
  color: #999;
}
</style>
