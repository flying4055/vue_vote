<template>
  <div>
    <div class="gem-box">
      <div class="gem-box-title">钻石充值</div>
      <div class="gem-btn-group">
        <div class="gem-btn-item" v-for="item in pay_list" :key="item.id">
          <div class="gem-btn" v-bind:class="{ btnActive: item.isBtnActive }" @click="onClickBtn(item)">
            <span>{{item.price}} &nbsp;</span>
            <van-icon name="gem-o" color="#2f89fc" size="18px" />
          </div>
        </div>
      </div>
      <van-button type="primary" size="large" @click="clickPayBtn()">微信支付</van-button>
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
      currentPrice: '',
      pay_list: [
        { id: 1, price: 100, isBtnActive: 0 },
        { id: 2, price: 200, isBtnActive: 0 },
        { id: 3, price: 300, isBtnActive: 0 },
        { id: 4, price: 400, isBtnActive: 0 },
        { id: 5, price: 500, isBtnActive: 0 },
        { id: 6, price: 600, isBtnActive: 0 }
      ]
    }
  },
  methods: {
    onClickBtn: function (e) {
      if (e.isBtnActive === 1) {
        e.isBtnActive = 0;
        this.currentPrice = '';
        return false;
      }
      let price_arr = this.pay_list;
      for (let item in price_arr) {
        price_arr[item].isBtnActive = 0
      }
      e.isBtnActive = 1;
      this.currentPrice = e;
    },
    clickPayBtn: function () {
      if (this.currentPrice == false) {
        this.$dialog.alert({ message: '请先选择充值多少钻石' })
        return false;
      }
      this.$toast(`恭喜您成功充值 ${this.currentPrice.price} 钻石`)
      // Weixin.payment();
    }
  }
}
</script>

<style scoped>
.btnActive {
  color: #fff !important;
  background-color: #07c160;
}

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
  overflow: hidden;
}

.gem-btn {
  height: 45px;
  display: flex;
  justify-content: center;
  align-items: center;
  text-align: center;
  border-radius: 3px;
  border: 1px solid #07c160;
  color: #07c160;
}

.tips {
  margin-top: 14px;
  color: #999;
}
</style>
