<template>
  <!-- 自己做法 -->
  <!-- <div class="bottom-menu">
    <CheckButton
      class="select-all"
      :isChecked="isSelectAll"
      @checkBtnClick="checkBtnClick"
    />
    1.全选按钮
    <span>全选</span>
    2.合计
    <span class="total-price">合计：{{ totalPrice }}</span>
    3.结算
    <span class="buy-product" @click="calcClick"
      >去结算({{ checkLength }})</span
    >
  </div> -->

  <!-- 老师做法 -->
  <div class="bottom-menu">
    <!-- 1.全选按钮 -->
    <div class="check-content">
      <check-button
        class="check-button"
        :is-checked="isSelectAll"
        @click.native="checkBtnClick"
      ></check-button>
      <span>全选</span>
    </div>
    <!-- 2.合计 -->
    <div class="price">
      <span class="total-price">合计:{{ totalPrice }}</span>
    </div>
    <!-- 3.结算 -->
    <div class="calculate" @click="calcClick">
      <span class="buy-product">去结算({{ checkLength }})</span>
    </div>
  </div>
</template>

<script>
import CheckButton from 'components/content/checkButton/CheckButton'

import { mapGetters } from 'vuex'
export default {
  name: 'CartBottomBar',
  components: {
    CheckButton
  },
  methods: {
    checkBtnClick() {
      // 方法1：自定义变量isSelectAll做判断
      // 1.判断是否有未选中的按钮
      //   let isSelectAll = ！this.$store.state.cartList.find(item => !item.checked)
      //   let isSelectAll = ！this.$store.getters.cartList.find(item => !item.checked)
      //   let isSelectAll = !this.cartList.find(item => !item.checked)

      //   // 2.有未选中的内容，则全部选中
      //   if (isSelectAll) {
      //     // 全部选中时
      //     this.cartList.forEach(item => {
      //       item.checked = false
      //     })
      //   } else {
      //     // 部分选中或者全部不选中
      //     this.cartList.forEach(item => {
      //       item.checked = true
      //     })
      //   }
      // 简化代码（这样不行）
      //   if (isSelectAll || !isSelectAll) {
      //     this.cartList.forEach(item => item.checked = !item.checked)
      //   }

      // 方法2：直接利用下面定义的isSelectAll()函数做判断
      if (this.isSelectAll) {
        // 全选时
        this.cartList.forEach(item => item.checked = false)
      } else {
        // 部分选中或者全部不选中
        this.cartList.forEach(item => item.checked = true)
      }
      // 简化代码（这样不行）
      //   if (this.isSelectAll || !this.isSelectAll) {
      //     this.cartList.forEach(item => item.checked = !item.checked)
      //   }
    },
    calcClick() {
      // 部分选中或者全部不选中(不严谨)
      //   if (!this.isSelectAll) {
      //     this.$toast.show('请选择要购买的商品', 2000)
      //   }
      if (this.checkLength === 0) {
        this.$toast.show('请选择要购买的商品', 2000)
      } else {
        this.$toast.show('您选择了' + this.checkLength + '几件商品')
      }
    }
    // this.$toast.show('请您选择支付方式：微信  支付宝  银行卡')
  },
  computed: {
    ...mapGetters(['cartList']),
    totalPrice() {
      return '￥' + this.cartList.filter(item => {
        return item.checked
      }).reduce((preValue, item) => {
        return preValue + item.count * item.price
      }, 0).toFixed(2)
    },
    checkLength() {
      // return this.$store.state.cartList.filter(item => item.checked).length
      return this.cartList.filter(item => item.checked).length
    },
    isSelectAll() {
      if (this.cartList.length === 0) return false
      //   // 方法1：filter()函数，性能不高，会全部遍历
      //   // return !(this.cartList.filter(item => !item.checked).length)
      //   // 方法2：find()函数，找到就停，性能较高
      // return !this.$store.state.cartList.find(item => !item.checked)
      return !this.cartList.find(item => !item.checked)
      // 变相写法
      // return this.cartList.find(item => item.checked === false) === undefined
      // 方法3：普通遍历
      //   for (let item of this.cartList) {
      //     if (!item.checked) {
      //       return false
      //     }
      //   }
      //   return true

    }
  }
}
</script>

<!-- Add 'scoped' attribute to limit CSS to this component only -->
<style scoped>
/* 自己做法 */
/* .bottom-menu {
  width: 100%;
  height: 40px;
  background-color: #eee;
  position: relative;

  box-shadow: 0 -2px 3px rgba(0, 0, 0, 0.2);
  font-size: 14px;
  color: #888;
  line-height: 40px;
  padding-left: 35px;
  // C3盒子模型
  // 为元素设定的宽度和高度决定了元素的边框盒
  box-sizing: border-box;
}
.select-all {
  position: absolute;
  line-height: 0;
  left: 12px;
  top: 10px;
}
.total-price {
  margin-left: 20px;
  font-size: 16px;
  color: #666;
}
.buy-product {
  float: right;
  // background-color: orangered;
  background-color: var(--color-high-text);
  color: #fff;
  width: 100px;
  height: 40px;
  line-height: 40px;
  text-align: center;
} */

/* 老师做法 */
.bottom-menu {
  /* width: 100%; */
  position: relative;
  display: flex;

  height: 40px;
  line-height: 40px;
  font-size: 14px;

  background-color: #eee;
  box-shadow: 0 -2px 3px rgba(0, 0, 0, 0.2);
}

.check-content {
  display: flex;
  align-items: center;
  margin-left: 10px;
  width: 60px;
}
.check-button {
  width: 20px;
  height: 20px;
  line-height: 20px;
  margin-right: 5px;
}
.price {
  margin-left: 20px;
  font-size: 16px;
  color: #666;
  flex: 1;
}
.calculate {
  /* 方法1 */
  /* position: absolute;
  right: 0; */
  /* 方法2 【全选】和【结算】给定宽度，【合计】flex:1 */
  /* background-color: orangered; */
  background-color: var(--color-high-text);
  color: #fff;
  width: 100px;
  height: 40px;
  line-height: 40px;
  text-align: center;
}
</style>
