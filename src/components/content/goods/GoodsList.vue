<template>
  <div class="goods">
    <!-- key值要唯一 -->
    <goods-list-item
      v-for="item in goods"
      :key="item.title + Math.random()"
      :goods-item="item"
    ></goods-list-item>
  </div>
</template>

<script>
import GoodsListItem from './GoodsListItem.vue'
export default {
  name: 'GoodsList',
  components: {
    GoodsListItem
  },
  props: {
    goods: {
      type: Array,
      default() {
        return []
      }
    }
  }
}
</script>

<!-- Add 'scoped' attribute to limit CSS to this component only -->
<style scoped>
.goods {
  display: flex;
  /* flex-wrap 属性用于指定弹性盒子的子元素换行方式 */
  /* wrap 弹性容器为多行，
  该情况下弹性子项溢出的部分会被放置到新行，子项内部会发生断行。 */
  flex-wrap: wrap;
  /* ustify-content 用于设置或检索弹性盒子元素在主轴（横轴）方向上的对齐方式 */
  /* space-around 项目位于各行之前、之间、之后都留有空白的容器内 */
  justify-content: space-around;
  padding: 2px;
}
</style>
