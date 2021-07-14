<template>
  <div class="goods-item">
    <!-- 监听所有图片加载完成，用@load事件 -->
    <img :src="goodsItem.show.img" alt="" @load="imageLoad" />
    <div class="goods-info">
      <p>{{ goodsItem.title }}</p>
      <span class="price">{{ goodsItem.price }}</span>
      <span class="collect">{{ goodsItem.cfav }}</span>
    </div>
  </div>
</template>

<script>
export default {
  name: 'GoodsListItem',
  props: {
    goodsItem: {
      type: Object,
      default() {
        return {}
      }
    }
  },
  methods: {
    imageLoad() {
      // console.log('imageLoad');
      this.$bus.$emit('itemImageLoad')
    }
  }
}
</script>

<!-- Add 'scoped' attribute to limit CSS to this component only -->
<style scoped>
.goods-item {
  width: 48%;
}
.goods-item img {
  width: 100%;
  border-radius: 5px;
}
.goods-info {
  font-size: 12px;
  text-align: center;
  /* overflow: hidden; */
}
.goods-info p {
  /* 常见的单行文本溢出显示省略号 */
  text-overflow: ellipsis;
  overflow: hidden;
  white-space: nowrap;
  margin-bottom: 3px;
}
.goods-info .price {
  color: var(--color-high-text);
  /* 给收藏图标让位置 */
  margin-right: 20px;
}

.goods-info .collect {
  /* 子绝父相 */
  position: relative;
}
/* 收藏图标 */
.goods-info .collect::before {
  content: "";
  position: absolute;
  left: -15px;
  top: 1px;
  width: 14px;
  height: 14px;
  background: url("~assets/img/common/collect.svg") 0 0/14px 14px;
}
</style>
