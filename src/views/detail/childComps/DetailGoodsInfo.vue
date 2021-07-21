<template>
  <div v-if="Object.keys(detailInfo).length !== 0" class="goods-info">
    <!-- 1.商品描述 -->
    <div class="info-desc clear-fix">
      <!-- 1.1 头符号【——————】 -->
      <div class="start"></div>
      <!-- 1.2 商品描述 -->
      <div class="desc">{{ detailInfo.desc }}</div>
      <!-- 1.3 尾符号【——————】 -->
      <div class="end"></div>
    </div>
    <!-- 2.【穿着效果】 -->
    <div class="info-key">{{ detailInfo.detailImage[0].key }}</div>
    <!-- 3.商品图片列表 -->
    <div class="info-list">
      <img
        v-for="(item, index) in detailInfo.detailImage[0].list"
        :key="index"
        :src="item"
        @load="imgLoad"
        alt=""
      />
    </div>
  </div>
</template>

<script>
export default {
  name: 'DetailGoodsInfo',
  props: {
    detailInfo: {
      type: Object,
      default() {
        return {}
      }
    }
  },
  data() {
    return {
      counter: 0,
      imagesLength: 0
    }
  },
  methods: {
    imgLoad() {
      // 判断，所有的图片都加载完了，那么进行一次回调就行了
      // this.counter += 1
      // 调用watch函数获取图片总个数
      if (++this.counter === this.imagesLength) {
        this.$emit('imageLoad')
      }
    }
  },
  watch: {
    detailInfo() {
      // 获取图片个数
      this.imagesLength = this.detailInfo.detailImage[0].list.length
    }
  }
}
</script>

<!-- Add 'scoped' attribute to limit CSS to this component only -->
<style scoped>
.goods-info {
  padding: 20px 0;
  border-bottom: 5px solid #f2f5f8;
}
.info-desc {
  padding: 0 15px;
}
.info-desc .start,
.info-desc .end {
  /* 子绝父相 */
  position: relative;
  width: 90px;
  height: 1px;
  background-color: #a3a3a5;
}
.info-desc .start {
  float: left;
}
.info-desc .end {
  float: right;
}
/* 小方实心框 */
.info-desc .start::before,
.info-desc .end::after {
  content: "";
  position: absolute;
  bottom: 0;
  width: 5px;
  height: 5px;
  background-color: #333;
}
.info-desc .desc {
  font-size: 14px;
  font-family: "Microsoft Yahei";
  padding: 15px 0;
}
.info-key {
  margin: 10px 5px;
  font-size: 15px;
  color: #333;
}
.info-list img {
  width: 100%;
}
</style>
