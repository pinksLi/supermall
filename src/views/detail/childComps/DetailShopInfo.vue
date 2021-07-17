<template>
  <div class="shop-info">
    <!-- 1.店铺头 -->
    <div class="shop-top">
      <!-- 1.1 商家店铺Logo -->
      <img :src="shop.logo" alt="" />
      <!-- 1.2 商家店铺名 -->
      <span class="title">{{ shop.name }}</span>
    </div>
    <!-- 2.店铺内容 -->
    <div class="shop-middle">
      <!-- 左侧 -->
      <div class="shop-middle-item shop-middle-left">
        <!-- 2.1 粉丝信息 -->
        <div class="info-fans">
          <div class="fans-count">
            {{ shop.fans }}
          </div>
          <div class="fans-text">粉丝量</div>
        </div>
        <!-- 2.2 销量信息 -->
        <div class="info-sells">
          <div class="sells-count">
            {{ shop.sells | sellCountFilter }}
          </div>
          <div class="sells-text">总销量</div>
        </div>
        <!-- 2.3 库存 -->
        <div class="info-goods">
          <div class="goods-count">
            {{ shop.goodsCount }}
          </div>
          <div class="goods-text">全部宝贝</div>
        </div>
      </div>
      <!-- 右侧 -->
      <div class="shop-middle-item shop-middle-right">
        <!-- 2.4 评分 -->
        <table>
          <tr v-for="(item, index) in shop.score" :key="index">
            <!-- 评分项 -->
            <td>{{ item.name }}</td>
            <!-- 评分 -->
            <td class="score" :class="{ 'score-better': item.isBetter }">
              {{ item.score }}
            </td>
            <!-- 高、低 -->
            <td class="better" :class="{ 'better-more': item.isBetter }">
              <span>{{ item.isBetter ? "高" : "低" }}</span>
            </td>
          </tr>
        </table>
      </div>
    </div>
    <!-- 3.店铺尾 -->
    <div class="shop-bottom">
      <div class="enter-shop">进店逛逛</div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'DetailShopInfo',
  props: {
    shop: {
      type: Object,
      default() {
        return {}
      }
    }
  },
  filters: {
    sellCountFilter: function (value) {
      if (value < 10000) return value
      return (value / 10000).toFixed(1) + '万'
    }
  }
}
</script>

<!-- Add 'scoped' attribute to limit CSS to this component only -->
<style scoped>
.shop-info {
  padding: 25px 8px;
  border-bottom: 5px solid #f2f5f8;
}
.shop-top {
  line-height: 45px;
  /* 让元素垂直对齐 */
  display: flex;
  /* align-items 属性定义flex子项在flex容器的当前行的侧轴（纵轴）方向上的对齐方式 */
  /* center 元素位于容器的中心。弹性盒子元素在该行的侧轴（纵轴）上居中放置。 */
  align-items: center;
}
.shop-top img {
  width: 45px;
  height: 45px;
  border-radius: 50%;
  border: 1px solid rgba(0, 0, 0, 0.1);
}
.shop-top .title {
  margin-left: 10px;
  /* vertical-align 属性设置元素的垂直对齐方式 */
  /* 现在似乎没有center这个值 */
  /* vertical-align: center; */
  vertical-align: middle;
}
.shop-middle {
  margin-top: 15px;
  display: flex;
  align-items: center;
}
.shop-middle-item {
  flex: 1;
}
.shop-middle-left {
  display: flex;
  /* justify-content 用于设置或检索弹性盒子元素在主轴（横轴）方向上的对齐方式 */
  /* space-evenly 可以使每个元素之间和元素距离边距的距离都相等，但是兼容性比较差
  （iphone的SE上不支持，会失效，相当于没有设置），space-evenly将剩余空间平均分割 */
  justify-content: space-evenly;
  color: #333;
  text-align: center;
  border-right: 1px solid rgba(0, 0, 0, 0.3);
}
.fans-count,
.sells-count,
.goods-count {
  font-size: 14px;
  text-align: center;
  height: 20px;
  line-height: 20px;
}
.fans-text,
.sells-text,
.goods-text {
  margin-top: 10px;
  font-size: 12px;
  text-align: center;
}
.shop-middle-right {
  font-size: 13px;
  color: #333;
}
.shop-middle-right table {
  width: 120px;
  margin-left: 30px;
}
.shop-middle-right table td {
  padding: 5px 0;
}
.shop-middle-right .score {
  color: #5ea732;
}
.shop-middle-right .score-better {
  color: #f13e3a;
}
.shop-middle-right .better span {
  background-color: #5ea732;
  color: #fff;
  text-align: center;
}
.shop-middle-right .better-more span {
  background-color: #f13e3a;
}
.shop-bottom {
  text-align: center;
  margin-top: 10px;
}
.enter-shop {
  display: inline-block;
  font-size: 14px;
  background-color: #f2f5f8;
  width: 150px;
  height: 30px;
  text-align: center;
  line-height: 30px;
  border-radius: 6px;
}
</style>
