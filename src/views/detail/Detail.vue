<template>
  <div id="detail">
    <detail-nav-bar class="detail-nav" />

    <scroll class="content" ref="scroll">
      <detail-swiper :top-images="topImages" />
      <detail-base-info :goods="goods" />
      <detail-shop-info :shop="shop" />
      <detail-goods-info :detail-info="detailInfo" @imageLoad="imageLoad" />
      <detail-param-info :param-info="paramInfo" />
    </scroll>
  </div>
</template>

<script>
import DetailNavBar from './childComps/DetailNavBar'
import DetailSwiper from './childComps/DetailSwiper'
import DetailBaseInfo from './childComps/DetailBaseInfo'
import DetailShopInfo from './childComps/DetailShopInfo'
import DetailGoodsInfo from './childComps/DetailGoodsInfo'
import DetailParamInfo from './childComps/DetailParamInfo'

import Scroll from 'components/common/scroll/Scroll'

import { getDetail, Goods, Shop, GoodsParam } from 'network/detail'

export default {
  name: 'Detail',
  components: {
    DetailNavBar,
    DetailSwiper,
    DetailBaseInfo,
    DetailShopInfo,
    DetailGoodsInfo,
    DetailParamInfo,
    Scroll
  },
  data() {
    return {
      id: null,
      topImages: [],
      goods: {},
      shop: {},
      detailInfo: {},
      paramInfo: {}
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

      const no = data.itemInfo.topImages.length
      console.log('该商品有' + no + '张轮播图片');
      this.topImages = data.itemInfo.topImages

      // 2.2 获取商品信息
      this.goods = new Goods(data.itemInfo, data.columns, data.shopInfo.services)

      // 2.3 获取商家店铺信息
      this.shop = new Shop(data.shopInfo)

      // 2.4 获取商品的详情数据
      // console.log(data.detailInfo);
      this.detailInfo = data.detailInfo
      const no2 = data.detailInfo.detailImage[0].list.length
      console.log('该商品有' + no2 + '张详情图片');

      // 2.5 获取商品参数信息
      this.paramInfo = new GoodsParam(data.itemParams.info, data.itemParams.rule)
      // 查看有无商品参数图片
      const no3 = data.itemParams.info.images ? data.itemParams.info.images[0] : 'NULL'
      console.log(no3);
    })
  },
  methods: {
    imageLoad() {
      this.$refs.scroll.refresh()
    }
  }
}
</script>

<!-- Add 'scoped' attribute to limit CSS to this component only -->
<style scoped>
#detail {
  /* 让 MainTabBar 隐藏 */
  position: relative;
  z-index: 9;
  background-color: #fff;
  /* height: 100vh; */
}
.detail-nav {
  position: relative;
  z-index: 9;
  background-color: #fff;
}
.content {
  /* height: calc(100% - 44px); */
  height: calc(100vh - 44px);
}
</style>
