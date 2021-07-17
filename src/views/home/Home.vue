<template>
  <div id="home" class="wrapper">
    <!-- 1.导航条 -->
    <nav-bar class="home-nav"><div slot="center">购物街</div></nav-bar>

    <tab-control
      :titles="['流行', '新款', '精选']"
      @tabClick="tabClick"
      ref="tabControl2"
      class="tab-control"
      v-show="isTabFixed"
    />

    <scroll
      class="content"
      ref="scroll"
      :probe-type="3"
      @scroll="contentScroll"
      :pull-up-load="true"
      @pullingUp="loadMore"
    >
      <!-- 2.轮播图 -->
      <!-- 轮播图代码太多-应该抽离出去【HomeSwiper.vue】 -->
      <!-- <swiper>
      <swiper-item v-for="item in banners" :key="item.title">
        <a :href="item.link">
          <img :src="item.image" alt="" />
        </a>
      </swiper-item>
    </swiper> -->
      <home-swiper :banners="banners" @swiperImageLoad="swiperImageLoad" />
      <!-- 3.推荐模块 -->
      <recommend-view :recommends="recommends" />
      <!-- 4.本周流行模块 -->
      <feature-view />
      <!-- 5.选项卡模块 -->
      <!-- class暂时不用了 -->
      <!-- class="tab-control" -->
      <tab-control
        :titles="['流行', '新款', '精选']"
        @tabClick="tabClick"
        ref="tabControl"
      />
      <!-- tab-control 动态设定class无效 -->
      <!-- :class="{ fixed: isTabFixed }" -->

      <!-- 固定类型传值：固定值-->
      <!-- <goods-list :goods="goods['pop'].list" /> -->
      <!-- 变量传值：灵活（但属性值太长） -->
      <!-- <goods-list :goods="goods[currentType].list" /> -->
      <!-- 计算属性传值：升级版 -->
      <goods-list :goods="showGoods" />
    </scroll>
    <!-- 6.回到顶部 -->
    <back-top @click.native="backClick" v-show="isShowBackTop" />
  </div>
</template>

<script>
import HomeSwiper from './childComps/HomeSwiper'
import RecommendView from './childComps/RecommendView'
import FeatureView from './childComps/FeatureView'

import NavBar from 'components/common/navbar/NavBar'
import TabControl from 'components/content/tabControl/TabControl'
import GoodsList from 'components/content/goods/GoodsList'
import Scroll from 'components/common/scroll/Scroll'
import BackTop from 'components/content/backTop/BackTop'

import { getHomeMultidata, getHomeGoods } from 'network/home'
// 已被提取到混入函数中【mixin.js】
// import { debounce } from 'common/utils'
import { itemListenerMixin } from 'common/mixin'


export default {
  name: 'Home',
  components: {
    HomeSwiper,
    RecommendView,
    FeatureView,
    NavBar,
    TabControl,
    GoodsList,
    Scroll,
    BackTop
  },
  mixins: [itemListenerMixin],
  data() {
    return {
      banners: [],
      recommends: [],
      goods: {
        'pop': { page: 0, list: [] },
        'new': { page: 0, list: [] },
        'sell': { page: 0, list: [] },
      },
      // 默认选中类型
      currentType: 'pop',
      isShowBackTop: false,
      tabOffsetTop: 0,
      isTabFixed: false,
      saveY: 0,
    }
  },
  computed: {
    showGoods() {
      return this.goods[this.currentType].list
    }
  },
  destroyed() {
    // console.log('home destroyed');
  },
  activated() {
    this.$refs.scroll.scrollTo(0, this.saveY, 0)
    this.$refs.scroll.refresh()
  },
  deactivated() {
    // 1.保存Y值
    // console.log(this.saveY);
    // console.log(this.$refs.scroll);
    this.saveY = this.$refs.scroll.getScrollY()

    // 2.取消全局事件的监听
    this.$bus.$off('itemImgLoad', this.itemImgListener)
  },
  created() {
    // 1.请求多个数据
    this.getHomeMultidata()

    // 2.请求商品数据
    // 不推荐这样使用
    // getHomeGoods('pop', 1).then(res => {
    //   console.log(res);
    // })
    // 调用methods中的方法（推荐使用）
    this.getHomeGoods('pop')
    this.getHomeGoods('new')
    this.getHomeGoods('sell')

    // 3.手动代码点击一次
    // this.tabClick(0)
  },
  // 已被提取到混入函数中【mixin.js】
  mounted() {
    // // 1.监听item中的图片加载完成
    // // const refresh = this.debounce(this.$refs.scroll.refresh, 50)
    // // debounce函数抽离出去之后
    // const refresh = debounce(this.$refs.scroll.refresh, 50)

    // // 对监听的事件进行保存
    // this.itemImgListener = () => {
    //   // console.log('----------'); // 没有防抖动函数时，会打印30次
    //   // this.$refs.scroll.refresh()
    //   refresh()
    // }
    // this.$bus.$on('itemImgLoad', this.itemImgListener)

    // // 2.获取tabControl的offsetTop
    // // console.log(this.$refs.tabControl.offsetTop); // undefined
    // // console.log(this.$refs.tabControl); // VueComponent {}
    // // 所有的组件都有一个属性$el,用于获取组件中的元素
    // // console.log(this.$refs.tabControl.$el); // <div></div>
    // // 图片不一定全部挂载完成--所以要监听图片加载完成
    // // 主要是轮播图，加载比较慢
    // // console.log(this.$refs.tabControl.$el.offsetTop); // 59 -> 345 -> 550
    // // this.tabOffsetTop = this.$refs.tabControl.$el.offsetTop
  },
  methods: {
    /**
     * 网络请求的相关方法
     */
    getHomeMultidata() {
      getHomeMultidata().then(res => {
        // console.log(res);
        // 横幅-->轮播图
        this.banners = res.data.banner.list;
        // console.log(this.banners);
        // 推荐-->推荐模块
        this.recommends = res.data.recommend.list;
        // console.log(this.recommends);
      })
    },
    getHomeGoods(type) {
      const page = this.goods[type].page + 1
      getHomeGoods(type, page).then(res => {
        this.goods[type].list.push(...res.data.list)
        this.goods[type].page += 1

        // 加载多次
        // 完成上拉加载更多
        this.$refs.scroll.finishPullUp()
      })
    },
    /**
     * 事件监听相关的方法
     */
    tabClick(index) {
      // console.log(index);
      switch (index) {
        case 0:
          this.currentType = 'pop'
          break
        case 1:
          this.currentType = 'new'
          break
        case 2:
          this.currentType = 'sell'
          // 如果最后有 default，这里必须要写break，否则会产生 case 穿透
          break
      }
      this.$refs.tabControl.currentIndex = index
      this.$refs.tabControl2.currentIndex = index
    },
    backClick() {
      // console.log('我被点击了');
      this.$refs.scroll.scrollTo(0, 0)
    },
    contentScroll(position) {
      // 1.判断BackTop是否显示
      // console.log(position.y);
      this.isShowBackTop = (-position.y) > 1000

      // 2.决定TabControl是否吸顶(position: fixed)
      this.isTabFixed = (-position.y) > this.tabOffsetTop
    },
    // 防抖动函数(多个地方会用到)
    // 抽离出去【utils.js】
    // debounce(func, delay) {
    //   let timer = null
    //   return function (...args) {
    //     if (timer) clearTimeout(timer)
    //     timer = setTimeout(() => {
    //       func.apply(this, args)
    //     }, delay)
    //   }
    // },
    loadMore() {
      // console.log('上拉加载更多');
      // currentType为当前选中的类型
      this.getHomeGoods(this.currentType)
    },
    swiperImageLoad() {
      // 获取tabControl的offsetTop
      // console.log(this.$refs.tabControl.$el.offsetTop); // 666 打印4次(轮播图4张) 发送时只发送一次即可
      // 升级版：此代码无影响
      // console.log(this.$refs.tabControl.$el.offsetTop); // 666 打印1次(轮播图4张)
      this.tabOffsetTop = this.$refs.tabControl.$el.offsetTop
    }
  }
}
</script>

<!-- Add 'scoped' attribute to limit CSS to this component only -->
<style scoped>
#home {
  /* 防止塌陷，以后要删除(二选一)，这里最后不用了 */
  /* margin-top: 44px; */
  /* padding-top: 44px; */
  height: 100vh;
  /* 子绝父相 */
  position: relative;
}
.home-nav {
  /* 在使用浏览器原生滚动时，为了让导航条不跟随一起滚动 */
  /* 但在使用better-scroll进行局部滚动后就能达到这个效果，样式失效 */
  /* 固定定位 */
  /* position: fixed;
  left: 0;
  right: 0;
  top: 0;
  z-index: 9; */

  background-color: var(--color-tint);
  color: #fff;
}
/* 滚动固定 */
/* sticky属性：距离顶端44px时，变为 fix 定位 */
/* sticky属性和overflow: hidden冲突 */
/* sticky属性浏览器兼容性不强，开发时不推荐使用 */
/* .tab-control {
  position: sticky;
  top: 44px;
  z-index: 9;
} */

/* 滚动条 */
/* 方法1：数值计算，导航条不需要滚动（44px） */
/* .content {
  margin-top: 44px;
  height: calc(100% - 44px -49px);
} */
/* 方法2：绝对定位 */
.content {
  overflow: hidden;
  position: absolute;
  top: 44px;
  bottom: 49px;
  left: 0;
  right: 0;
}
/* tab-control 动态设定class无效 */
/* .fixed {
  position: fixed;
  top: 44px;
  left: 0;
  right: 0;
} */
.tab-control {
  position: relative;
  z-index: 9;
}
</style>
