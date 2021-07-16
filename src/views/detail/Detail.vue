<template>
  <div>
    <detail-nav-bar />
    <detail-swiper :top-images="topImages" />
    <detail-base-info :goods="goods" />
  </div>
</template>

<script>
import DetailNavBar from './childComps/DetailNavBar'
import DetailSwiper from './childComps/DetailSwiper'
import DetailBaseInfo from './childComps/DetailBaseInfo'

import { getDetail, Goods } from 'network/detail'

export default {
  name: 'Detail',
  components: {
    DetailNavBar,
    DetailSwiper,
    DetailBaseInfo
  },
  data() {
    return {
      id: null,
      topImages: [],
      goods: {},
    }
  },
  created() {
    // 1.保存传入的商品的id
    // console.log(this.$route.params);
    this.id = this.$route.params.id

    // 2.根据id请求详情数据
    getDetail(this.id).then(res => {
      // 2.1 获取顶部的图片轮播数据
      console.log(res);
      const data = res.result
      const no = data.itemInfo.topImages.length;
      console.log('该商品有' + no + '张轮播图片');
      this.topImages = data.itemInfo.topImages

      // 2.2 获取商品信息
      this.goods = new Goods(data.itemInfo, data.columns, data.shopInfo.services)
    })
  }
}
</script>

<!-- Add 'scoped' attribute to limit CSS to this component only -->
<style scoped>
</style>
