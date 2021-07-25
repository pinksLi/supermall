<template>
  <div class="tab-content">
    <grid-view
      :cols="3"
      :lineSpace="15"
      :v-margin="20"
      v-if="categoriesProduct"
    >
      <div
        class="content-item"
        v-for="(item, index) in categoriesProduct"
        :key="index"
      >
        <img :src="item.image" alt="" />
        <span>{{ item.title }}</span>
      </div>
    </grid-view>
  </div>
</template>

<script>
import GridView from 'components/common/grid/GridView'

export default {
  name: 'TabContent',
  props: {
    categoriesProduct: {
      type: Array,
      default() {
        return []
      }
    }
  },
  components: {
    GridView
  }
}
</script>

<!-- Add 'scoped' attribute to limit CSS to this component only -->
<style scoped>
.content-item {
  font-size: 12px;
  text-align: center;
}
.content-item img {
  width: 80%;
}
.content-item span {
  display: block;
  margin-top: 15px;
}
</style>
