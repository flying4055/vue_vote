<template>
  <div>
    <div class="gem-box">
      <div class="gem-box-title">钻石充值</div>
      <div class="gem-btn-group">
        <div class="gem-btn-item" v-for="item in pay_list" :key="item.id">
          <div class="gem-btn" v-bind:class="{ btnActive: item.isBtnActive }" @click="onClickBtn(item)">
            <span>{{item.price + '00'}} &nbsp;</span>
            <van-icon name="gem-o" color="#2f89fc" size="18px" />
          </div>
        </div>
      </div>
      <van-button type="primary" size="large" @click="clickPayBtn()">微信支付</van-button>
      <div class="tips">
        <p>提示 : 100 钻石 = 1元</p>
      </div>
    </div>

  </div>
</template>

<script>
import Weixin from '../utils/VoteWeixin'

// 100 200  500 1000 2000 9900

export default {
  name: 'gem',
  data() {
    return {
      currentPrice: '',
      currentVote_id: this.$store.state.pid,
      currentWorks_id: this.$store.state.works_id,
      pay_list: [
        { id: 1, price: 1, isBtnActive: 0 },
        { id: 2, price: 5, isBtnActive: 0 },
        { id: 3, price: 10, isBtnActive: 0 },
        { id: 4, price: 20, isBtnActive: 0 },
        { id: 5, price: 50, isBtnActive: 0 },
        { id: 6, price: 99, isBtnActive: 0 }
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
      let self = this;
      if (this.currentPrice == false) {
        this.$dialog.alert({ message: '请先选择充值多少钻石' })
        return false;
      }
      let vote_id = this.currentVote_id;
      let works_id = this.currentWorks_id;
      let amount = this.currentPrice.price;
      // this.$toast(`恭喜您成功充值 ${this.currentPrice.price} 钻石`)
      Weixin.payment(vote_id, works_id, amount);
      // Weixin.payOrder(vote_id, works_id, amount);
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
