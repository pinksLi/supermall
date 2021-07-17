<template>
  <div id="detail">
    <detail-nav-bar class="detail-nav" />

    <scroll class="content" ref="scroll">
      <detail-swiper :top-images="topImages" />
      <detail-base-info :goods="goods" />
      <detail-shop-info :shop="shop" />
      <detail-goods-info :detail-info="detailInfo" @imageLoad="imageLoad" />
      <detail-param-info :param-info="paramInfo" />
      <detail-comment-info :comment-info="commentInfo" />
      <goods-list :goods="recommends" />
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
import DetailCommentInfo from './childComps/DetailCommentInfo'

import Scroll from 'components/common/scroll/Scroll'
import GoodsList from 'components/content/goods/GoodsList'

import { getDetail, Goods, Shop, GoodsParam, getRecommend } from 'network/detail'
import { itemListenerMixin } from 'common/mixin'

export default {
  name: 'Detail',
  components: {
    DetailNavBar,
    DetailSwiper,
    DetailBaseInfo,
    DetailShopInfo,
    DetailGoodsInfo,
    DetailParamInfo,
    DetailCommentInfo,
    Scroll,
    GoodsList
  },
  mixins: [itemListenerMixin],
  data() {
    return {
      id: null,
      topImages: [],
      goods: {},
      shop: {},
      detailInfo: {},
      paramInfo: {},
      commentInfo: {},
      recommends: [],
    }
  },
  created() {
    // 1.保存传入的商品的id
    // console.log(this.$route.params);
    this.id = this.$route.params.id

    // 2.根据id请求详情数据
    getDetail(this.id).then(res => {
      // 2.1 获取顶部的图片轮播数据
      // console.log(res);
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
      const no3 = data.itemParams.info.images ? data.itemParams.info.images[0].length : 'NULL'
      if (no3 == 'NULL') {
        console.log('该商品暂时没有参数图片');
      } else {
        console.log('该商品有' + no3 + '张参数图片');
      }

      // 2.6 获取评论信息
      if (data.rate.cRate !== 0) {
        this.commentInfo = data.rate.list[0]
        // 查看有无商品评论
        const no4 = data.rate.list.length
        console.log('该商品有' + no4 + '条评论信息');
        // 查看有无买家秀图片
        // const no5 = data.rate.list[0].images.length
        const no5 = data.rate.list[0].images ? data.rate.list[0].images.length : 'NULL'
        if (no5 == 'NULL') {
          console.log('该商品暂时没有买家秀图片');
        } else {
          console.log('该商品有' + no5 + '张买家秀图片');
        }
      }
    })

    // 3.获取推荐信息
    getRecommend().then(res => {
      console.log(res);
      this.recommends = res.data.list
      // 查看有多少推图片
      const no6 = res.data.list ? res.data.list.length : 'NULL'
      if (no6 == 'NULL') {
        console.log('该商品没有推荐图片');
      } else {
        console.log('该商品有' + no6 + '张推荐图片');
      }
    })
  },
  mounted() {
    // console.log('mounted');
  },
  destroyed() {
    this.$bus.$off('itemImgLoad', this.itemImgListener)
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
  /* 第一种：计算 */
  /* height: calc(100% - 44px); */
  height: calc(100vh - 44px);

  /* 第二种：定位 */
  /* position: absolute;
  top: 44px;
  bottom: 60px; */
}
</style>
