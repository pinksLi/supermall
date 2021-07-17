<template>
  <swiper class="detail-swiper">
    <!-- 轮播图 -->
    <swiper-item v-for="item in topImages" :key="item">
      <img :src="item" alt="" />
    </swiper-item>
  </swiper>
</template>

<script>
// 找swiper文件夹下的index.js(统一导出)
import { Swiper, SwiperItem } from 'components/common/swiper'

export default {
  name: 'DetailSwiper',
  components: {
    Swiper,
    SwiperItem
  },
  props: {
    topImages: {
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
.detail-swiper {
  height: 300px;
  overflow: hidden;
}
</style>
