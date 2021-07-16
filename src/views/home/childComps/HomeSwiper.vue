<template>
  <swiper>
    <!-- key值要唯一 -->
    <swiper-item v-for="item in banners" :key="item.title">
      <a :href="item.link">
        <img :src="item.image" alt="" @load="imageLoad" />
      </a>
    </swiper-item>
  </swiper>
</template>

<script>

// 常规写法
// import Swiper from 'components/common/swiper/Swiper'
// import SwiperItem from 'components/common/swiper/SwiperItem'
// 合并写法：直接找swiper/index.js 
import { Swiper, SwiperItem } from 'components/common/swiper'

export default {
  name: 'HomeSwiper',
  props: {
    banners: {
      type: Array,
      default() {
        return []
      }
    }
  },
  data() {
    return {
      isLoad: false
    }
  },
  components: {
    Swiper,
    SwiperItem
  },
  methods: {
    imageLoad() {
      // // console.log('---------'); // 打印4次(轮播图4张)
      // // 子传父 -> 【Home.vue】
      // this.$emit('swiperImageLoad')
      // 升级版：利用变量记录发送状态
      if (!this.isLoad) {
        // console.log('---------'); // 打印1次(轮播图4张)
        this.$emit('swiperImageLoad')
        this.isLoad = true
      }
    }
  }
}
</script>

<!-- Add 'scoped' attribute to limit CSS to this component only -->
<style scoped>
</style>