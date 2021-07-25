<template>
  <div id="detail">
    <!-- 1.导航条 -->
    <detail-nav-bar @titleClick="titleClick" class="detail-nav" ref="nav" />

    <scroll
      class="content"
      ref="scroll"
      :probe-type="3"
      @scroll="contentScroll"
    >
      <!-- 2.轮播图 -->
      <!-- 属性：topImages 传入值：top-images -->
      <detail-swiper :top-images="topImages" />
      <!-- 3.商品基本信息 -->
      <detail-base-info :goods="goods" />
      <!-- 4.商家店铺信息 -->
      <detail-shop-info :shop="shop" />
      <!-- 5.商品详情 -->
      <detail-goods-info :detail-info="detailInfo" @imageLoad="imageLoad" />
      <!-- 6.商品参数 -->
      <detail-param-info ref="params" :param-info="paramInfo" />
      <!-- 7.用户评论 -->
      <detail-comment-info ref="comment" :comment-info="commentInfo" />
      <!-- 8.商品推荐 -->
      <goods-list ref="recommend" :goods="recommends" />
    </scroll>
    <!-- 9.底部按钮 -->
    <detail-bottom-bar @addCart="addToCart" />
    <!--10.回到顶部 -->
    <back-top @click.native="backTop" v-show="isShowBackTop" />

    <!-- 暂时不需要 -->
    <!-- <toast :message="message" :isShow="isShow" /> -->
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
import DetailBottomBar from './childComps/DetailBottomBar'

import Scroll from 'components/common/scroll/Scroll'
import GoodsList from 'components/content/goods/GoodsList'
// 已被提取到混入函数中【mixin.js】
// import BackTop from 'components/content/backTop/BackTop'

// 暂时不需要
// import Toast from 'components/common/toast/Toast'

import { getDetail, Goods, Shop, GoodsParam, getRecommend } from 'network/detail'

import { debounce } from "common/utils"
// 已被提取到混入函数中【mixin.js】
// import { BACK_POSITION } from "common/const";
import { itemListenerMixin, backTopMixin } from 'common/mixin'

import { mapActions } from 'vuex'


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
    DetailBottomBar,
    Scroll,
    GoodsList,
    // 暂时不需要
    // Toast
    // 已被提取到混入函数中【mixin.js】
    // BackTop
  },
  mixins: [itemListenerMixin, backTopMixin],
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
      themeTopYs: [],
      getThemeTopY: null,
      currentIndex: 0,
      // 已被提取到混入函数中【mixin.js】
      // isShowBackTop: false,
      // 暂时不需要
      // message: '',
      // isShow: false

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
      const no3 = data.itemParams.info.images ? data.itemParams.info.images.length : 'NULL'
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

      /* // 1.第一次获取，值不对
      // 值不对的原因：this.$refs.params.$el压根没有渲染
      // this.themeTopYs = []
      // this.themeTopYs.push(0)
      // this.themeTopYs.push(this.$refs.params.$el.offsetTop)
      // this.themeTopYs.push(this.$refs.comment.$el.offsetTop)
      // this.themeTopYs.push(this.$refs.recommend.$el.offsetTop)
      // console.log(this.themeTopYs);

      // 2.第二次获取，值不对
      // 值不对的原因：图片没有计算在内
      this.$nextTick(() => {
        // 根据最新的数据，对应的DOM是已经被渲染出来的。
        // 但是图片依然是没有加载完(目前获取到的offsetTop不包含其中的图片)
        // offsetTop值不对的时候，都是因为图片的问题
        this.themeTopYs = []
        this.themeTopYs.push(0)
        this.themeTopYs.push(this.$refs.params.$el.offsetTop)
        this.themeTopYs.push(this.$refs.comment.$el.offsetTop)
        this.themeTopYs.push(this.$refs.recommend.$el.offsetTop)
        console.log(this.themeTopYs);
      }) */
    })

    // 3.获取推荐信息
    getRecommend().then(res => {
      // console.log(res);
      this.recommends = res.data.list
      // 查看有多少推图片
      const no6 = res.data.list ? res.data.list.length : 'NULL'
      if (no6 == 'NULL') {
        console.log('该商品没有推荐图片');
      } else {
        console.log('该商品有' + no6 + '张推荐图片');
      }
    })

    // 4.给getThemeTopY赋值(防抖操作)
    this.getThemeTopY = debounce(() => {
      this.themeTopYs = []
      this.themeTopYs.push(0)
      this.themeTopYs.push(this.$refs.params.$el.offsetTop)
      this.themeTopYs.push(this.$refs.comment.$el.offsetTop)
      this.themeTopYs.push(this.$refs.recommend.$el.offsetTop)
      this.themeTopYs.push(Number.MAX_VALUE)

      // console.log(this.themeTopYs); // [0, 3203, 4048, 4347, 1.7976931348623157e+308]
    }, 100)
  },
  mounted() {
    // console.log('mounted');
  },
  updated() {

  },
  destroyed() {
    this.$bus.$off('itemImgLoad', this.itemImgListener)
  },
  methods: {
    // 配置映射关系
    ...mapActions(['addCart']),
    imageLoad() {
      this.refresh()
      // this.$refs.scroll.refresh()

      // 3.第三次获取，值对
      this.getThemeTopY()
    },
    titleClick(index) {
      // console.log(index);
      this.$refs.scroll.scrollTo(0, -this.themeTopYs[index], 200)
    },
    // 已被提取到混入函数中【mixin.js】
    // backTop() {
    //   this.$refs.scroll.scrollTo(0, 0, 300)
    // },
    contentScroll(position) {
      // console.log(position);
      // 1.获取y值
      const positionY = -position.y

      // 2.positionY和主题中的值进行对比
      // [0, 3203, 4048, 4347, 无穷大]
      // [0, 3203, 4048, 4347, Number.MAX_VALUE]
      // console.log(Number.MAX_VALUE);
      // positionY 在 [0-3023)之间，index = 0
      // positionY 在 [3023-4048)之间，index = 1
      // positionY 在 [4048-4347)之间，index = 2

      // positionY 在 [4347-无穷大) 时，index = 3

      let length = this.themeTopYs.length
      //   // 方法1：普通做法
      //   for (let i = 0; i < length; i++) {
      //     // 经过每个主题时只打印一次
      //     if ((this.currentIndex !== i) &&
      //       ((i < length - 1 && positionY >= this.themeTopYs[i] && positionY < this.themeTopYs[i + 1])
      //         || (i === length - 1 && positionY >= this.themeTopYs[i]))) {
      //       this.currentIndex = i
      //       // console.log(this.currentIndex); 
      //       this.$refs.nav.currentIndex = this.currentIndex
      //     }
      //   }
      // 方法2：hack做法
      // 注意：最后一个数据【Number.MAX_VALUE】是自己加的，不用遍历，故length-1
      for (let i = 0; i < length - 1; i++) {
        if ((this.currentIndex !== i) && (positionY >= this.themeTopYs[i] && positionY < this.themeTopYs[i + 1])) {
          this.currentIndex = i
          // console.log(this.currentIndex);
          this.$refs.nav.currentIndex = this.currentIndex
        }
      }

      // 3.判断BackTop是否显示
      // console.log(position.y);
      this.listenShowBackTop(position)
    },
    // 已被提取到混入函数中【mixin.js】
    // listenShowBackTop(position) {
    //   this.isShowBackTop = (-position.y) > 1000
    //   // 常量替换
    //   this.isShowBackTop = (-position.y) > BACK_POSITION
    // }
    addToCart() {
      // 1.获取购物车需要展示的信息
      const product = {}
      product.image = this.topImages[0]
      product.title = this.goods.title
      product.desc = this.goods.desc
      product.price = this.goods.realPrice
      product.id = this.id

      // 2.将商品添加到购物车中
      // 方法1:常规写法
      // this.$store.cartList.push(product)
      // 写在 mutations中
      // this.$store.commit('addCart', product)
      // 建议写在 actions中
      //   this.$store.dispatch('addCart', product).then(res => {
      //     console.log(res);
      //   })
      // 方法2:利用影射关系
      this.addCart(product).then(res => {
        // // console.log(res);
        // // 暂时不需要
        // this.isShow = true
        // this.message = res

        // setTimeout(() => {
        //   this.isShow = false
        //   this.message = ''
        // }, 1500)

        // 最终封装的效果
        // console.log(this.$toast);
        // this.$toast.show(res, 1500)
        // 选择性传参(有默认值)
        this.$toast.show(res)
      })
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
  /* height: calc(100% - 44px - 49px); */
  height: calc(100vh - 44px - 49px);

  /* 第二种：定位 */
  /* position: absolute;
  top: 44px;
  bottom: 49px; */
}
</style>
