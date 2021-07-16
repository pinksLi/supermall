<template>
  <!-- Object.keys()方法返回的是一个数组 -->
  <div v-if="Object.keys(goods).length !== 0" class="base-info">
    <!-- 1.商品标题 -->
    <div class="info-title">{{ goods.title }}</div>
    <!-- 2.商品价格 -->
    <div class="info-price">
      <!-- 2.1 新价格 -->
      <span class="n-price">{{ goods.newPrice }}</span>
      <!-- 2.2 旧价格 -->
      <span class="o-price">{{ goods.oldPrice }}</span>
      <!-- 2.3 宣传语 折扣 活动 -->
      <span v-if="goods.discount" class="discount">{{ goods.discount }}</span>
    </div>
    <!-- 3.专栏 其他信息 -->
    <div class="info-other">
      <!-- 3.1 销量 -->
      <span>{{ goods.columns[0] }}</span>
      <!-- 3.2 收藏 -->
      <span>{{ goods.columns[1] }}</span>
      <!-- 3.3 72小时发货 -->
      <!-- 这个藏得有点深,重点关注一下 -->
      <span>{{ goods.services[goods.services.length - 1].name }}</span>
    </div>
    <!-- 4.售后 -->
    <div class="info-service">
      <!-- 第一种写法 -->
      <span
        class="info-service-item"
        v-for="index in goods.services.length - 1"
        :key="index"
      >
        <!-- 4.1 图标 -->
        <img :src="goods.services[index - 1].icon" alt="" />
        <!-- 4.2 标签 -->
        <span> {{ goods.services[index - 1].name }}</span>
      </span>
      <!-- 第二种写法:这种方法会把【3.3 72小时发货】也遍历出来 -->
      <!-- 4.1 图标 -->
      <!-- 4.2 标签 -->
      <!-- 
      <span
        class="info-service-item"
        v-for="(item, index) in goods.services"
        :key="index"
      >
        <img :src="item.icon" alt="" />
        <span> {{ item.name }}</span>
      </span> 
      -->
    </div>
  </div>
</template>

<script>
export default {
  name: 'DetailBaseInfo',
  props: {
    goods: {
      type: Object,
      default() {
        return {}
      }
    }
  }
}
</script>

<!-- Add 'scoped' attribute to limit CSS to this component only -->
<style scoped>
.base-info {
  margin-top: 15px;
  padding: 0 6px;
  color: #999;
  border-bottom: 5px solid #f2f5f8;
}
.info-title {
  color: #222;
}
.info-price {
  margin-top: 10px;
}
.info-price .n-price {
  font-size: 24px;
  color: var(--color-high-text);
}
.info-price .o-price {
  font-size: 13px;
  margin-left: 5px;
  /* 文字删除线 */
  text-decoration: line-through;
}
.info-price .discount {
  font-size: 12px;
  padding: 2px 6px;
  color: #fff;
  background-color: var(--color-high-text);
  border-radius: 3px;
  margin-left: 5px;

  /* 让元素上浮一些: 使用相对定位即可 */
  position: relative;
  top: -8px;
}
.info-other {
  margin-top: 15px;
  line-height: 30px;
  display: flex;
  font-size: 13px;
  border-bottom: 1px solid rgba(100, 100, 100, 0.1);
  /* justify-content 用于设置或检索弹性盒子元素在主轴（横轴）方向上的对齐方式。 */
  /* space-around 是项目位于各行之前、之间、之后都留有空白的容器内。(左中右都有空白) */
  /* justify-content: space-around; */
  /* space-between 是项目位于各行之间留有空白的容器内(只有中间有空白) */
  justify-content: space-between;
}
.info-service {
  display: flex;
  justify-content: space-between;
  line-height: 60px;
}
.info-service-item img {
  width: 14px;
  height: 14px;

  /* 让元素下浮一些: 使用相对定位即可 */
  /* 图标稍微居下 */
  position: relative;
  top: 2px;
}
.info-service-item span {
  font-size: 13px;
  color: #333;
}
</style>
