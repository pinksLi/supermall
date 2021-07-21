<template>
  <div class="product-item">
    <!-- 1.勾选框 -->
    <div class="item-selector">
      <check-button
        :is-checked="product.checked"
        @click.native="checkedChange"
      />
    </div>
    <!-- 2.商品图片 -->
    <div class="item-img">
      <img :src="showImage" alt="商品图片" />
    </div>
    <!-- 3.商品信息 -->
    <div class="item-info">
      <!-- 3.1 商品标题 -->
      <div class="item-title">{{ product.title }}</div>
      <!-- 3.2 商品描述 -->
      <div class="item-desc">商品描述：{{ product.desc }}</div>
      <!-- 3.3 商品其他信息 -->
      <div class="info-bottom">
        <!-- 商品价格 -->
        <div class="item-price left">￥{{ product.price }}</div>
        <!-- 商品数量 -->
        <div class="item-count right">x{{ product.count }}</div>
      </div>
    </div>
  </div>
</template>

<script>
import CheckButton from 'components/content/checkButton/CheckButton'

export default {
  name: 'CartListItem',
  props: {
    product: {
      type: Object,
      default() {
        return {}
      }
    }
  },
  components: {
    CheckButton,
  },
  methods: {
    checkedChange() {
      this.product.checked = !this.product.checked
    }
  },
  computed: {
    showImage() {
      return "http:" + this.product.image
    }
  }
}
</script>

<!-- Add 'scoped' attribute to limit CSS to this component only -->
<style scoped>
.product-item {
  width: 100%;
  display: flex;
  font-size: 0;
  padding: 5px;
  border-bottom: 1px solid #ccc;
}
.item-selector {
  width: 14%;
  display: flex;
  /* justify-content 用于设置或检索弹性盒子元素在主轴（横轴）方向上的对齐方式 */
  /* center 项目位于容器的中心 */
  justify-content: center;
  /* align-items 属性定义flex子项在flex容器的当前行的侧轴（纵轴）方向上的对齐方式 */
  /* center 元素位于容器的中心 */
  align-items: center;
}
.item-img {
  padding: 5px;
}
.item-img img {
  width: 80px;
  height: 100px;
  border-radius: 5px;
}
.item-info {
  font-size: 17px;
  color: #333;
  padding: 5px 10px;
  position: relative;
  overflow: hidden;
}
.item-title,
.item-desc {
  overflow: hidden;
  /* 强制在同一行内显示所有文本，直到文本结束或者遭遇br标签对象才换行 */
  white-space: nowrap;
  /* 文本溢出包含元素时显示省略号来代表被修剪的文本 */
  text-overflow: ellipsis;
}
.item-desc {
  font-size: 14px;
  color: #666;
  margin-top: 15px;
}
.info-bottom {
  margin-top: 10px;
  position: absolute;
  bottom: 10px;
  left: 10px;
  right: 10px;
}
.item-price {
  color: orangered;
}
</style>
