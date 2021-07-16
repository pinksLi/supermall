<template>
  <div id="detail">
    <nav-bar>
      <div slot="left" class="back" @click="backClick">
        <img src="~assets/img/common/back.svg" alt="" />
      </div>
      <div slot="center" class="title">
        <div
          v-for="(item, index) in titles"
          :key="item"
          class="title-item"
          :class="{ active: index === currentIndex }"
          @click="titleClick(index)"
        >
          {{ item }}
        </div>
      </div>
    </nav-bar>
  </div>
</template>

<script>
import NavBar from 'components/common/navbar/NavBar'
export default {
  name: 'DetailNavBar',
  components: {
    NavBar
  },
  data() {
    return {
      titles: ['商品', '参数', '评论', '推荐'],
      currentIndex: 0
    }
  },
  methods: {
    titleClick(index) {
      this.currentIndex = index
    }, backClick() {
      this.$router.back()
      // this.$router.go(-1)
    }
  }
}
</script>

<!-- Add 'scoped' attribute to limit CSS to this component only -->
<style scoped>
.back img {
  margin-top: 14px;
  width: 16px;
  height: 16px;
}
.title {
  /* 弹性布局 */
  display: flex;
}
.title-item {
  flex: 1;
  font-size: 13px;
}
.active {
  color: var(--color-high-text);
}
</style>
