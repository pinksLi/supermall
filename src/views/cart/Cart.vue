<template>
  <div class="cart">
    <!-- 1.导航栏 -->
    <nav-bar class="nav-bar">
      <!-- <div slot="center">购物车({{ cartLength }})</div> -->
      <div slot="center">购物车({{ length }})</div>
    </nav-bar>

    <!-- 2.商品列表 -->
    <cart-list />
    <!-- 3.底部结算汇总 -->
    <cart-bottom-bar />
  </div>
</template>

<script>
import NavBar from 'components/common/navbar/NavBar'
import CartList from './childComps/CartList'
import CartBottomBar from './childComps/CartBottomBar'

import { mapGetters } from 'vuex'

export default {
  name: 'Cart',
  components: {
    NavBar,
    CartList,
    CartBottomBar
  },
  computed: {
    // cartLength() {
    //   // 方法1：计算属性
    //   // return this.$store.state.cartList.length
    //   // 方法2：封装一个 getters
    //   return this.$store.getters.cartLength
    // },

    // mapGetters的两种用法:
    // 用法1-数组：一一对应
    // 辅助函数仅仅是将 store 中的 getter 映射到局部计算属性
    // 使用对象展开运算符将 getter 混入 computed 对象中
    // ...mapGetters(['cartLength', 'cartList'])
    // 用法2-对象：起个别名
    ...mapGetters({
      // 把 `this.length` 映射为`this.$store.getters.cartLength`
      length: 'cartLength',
      // 把 `this.list` 映射为`this.$store.getters.cartList`
      // list: 'cartList'
    })
  }
}
</script>

<!-- Add 'scoped' attribute to limit CSS to this component only -->
<style scoped>
.cart {
  height: 100vh;
}
.nav-bar {
  background-color: var(--color-tint);
  color: #fff;
}
</style>
