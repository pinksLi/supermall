<template>
  <div id="home">
    <!-- 1.导航条 -->
    <nav-bar class="home-nav"><div slot="center">购物街</div></nav-bar>
    <!-- 2.轮播图 -->
    <!-- 轮播图代码太多-应该分离出去【HomeSwiper.vue】 -->
    <!-- <swiper>
      <swiper-item v-for="item in banners" :key="item.title">
        <a :href="item.link">
          <img :src="item.image" alt="" />
        </a>
      </swiper-item>
    </swiper> -->
    <home-swiper :banners="banners" />
    <!-- 3.推荐模块 -->
    <recommend-view :recommends="recommends" />
    <!-- 4.本周流行模块 -->
    <feature-view />
    <!-- 5.选项卡模块 -->
    <tab-control
      class="tab-control"
      :titles="['流行', '新款', '精选']"
      @tabClick="tabClick"
    />
    <!-- 固定类型传值：固定值-->
    <!-- <goods-list :goods="goods['pop'].list" /> -->
    <!-- 变量传值：灵活（但属性值太长） -->
    <!-- <goods-list :goods="goods[currentType].list" /> -->
    <!-- 计算属性传值：升级版 -->
    <goods-list :goods="showGoods" />

    <!-- 为了占空间的 -->
    <ul>
      <li>夏天好热1</li>
      <li>夏天好热2</li>
      <li>夏天好热3</li>
      <li>夏天好热4</li>
      <li>夏天好热5</li>
      <li>夏天好热6</li>
      <li>夏天好热7</li>
      <li>夏天好热8</li>
      <li>夏天好热8</li>
      <li>夏天好热8</li>
      <li>夏天好热8</li>
      <li>夏天好热8</li>
      <li>夏天好热8</li>
      <li>夏天好热8</li>
      <li>夏天好热8</li>
      <li>夏天好热8</li>
      <li>夏天好热8</li>
      <li>夏天好热8</li>
      <li>夏天好热8</li>
      <li>夏天好热8</li>
      <li>夏天好热8</li>
      <li>夏天好热8</li>
      <li>夏天好热8</li>
      <li>夏天好热8</li>
      <li>夏天好热8</li>
      <li>夏天好热8</li>
      <li>夏天好热8</li>
      <li>夏天好热8</li>
      <li>夏天好热8</li>
      <li>夏天好热8</li>
      <li>夏天好热8</li>
      <li>夏天好热8</li>
      <li>夏天好热8</li>
      <li>夏天好热8</li>
      <li>夏天好热8</li>
      <li>夏天好热8</li>
      <li>夏天好热8</li>
      <li>夏天好热8</li>
      <li>夏天好热8</li>
      <li>夏天好热8</li>
      <li>夏天好热8</li>
      <li>夏天好热8</li>
    </ul>
  </div>
</template>

<script>
import HomeSwiper from './childComps/HomeSwiper'
import RecommendView from './childComps/RecommendView'
import FeatureView from './childComps/FeatureView';

import NavBar from 'components/common/navbar/NavBar'
import TabControl from 'components/content/tabControl/TabControl'
import GoodsList from 'components/content/goods/GoodsList';



import { getHomeMultidata, getHomeGoods } from 'network/home'

export default {
  name: 'Home',
  components: {
    HomeSwiper,
    RecommendView,
    FeatureView,
    NavBar,
    TabControl,
    GoodsList
  },
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
      currentType: 'pop'
      // isShowBackTop: false
    }
  },
  computed: {
    showGoods() {
      return this.goods[this.currentType].list
    }
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
  },

  methods: {
    /**
     * 网络请求的相关方法
     */
    getHomeMultidata() {
      getHomeMultidata().then(res => {
        console.log(res);
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
      })
    },

    /**
     * 事件监听相关的方法
     */
    tabClick(index) {
      console.log(index);
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
    },

  }
}
</script>

<!-- Add 'scoped' attribute to limit CSS to this component only -->
<style scoped>
#home {
  /* 防止塌陷，以后要删除(二选一) */
  /* margin-top: 44px; */
  padding-top: 44px;
}
.home-nav {
  /* 固定定位 */
  position: fixed;
  left: 0;
  right: 0;
  top: 0;
  z-index: 9;

  /* background-color: pink; */
  background-color: var(--color-tint);
  color: #fff;
}
.tab-control {
  /* 滚动固定 */
  position: sticky;
  /* sticky属性：距离顶端44px时，变为 fix 定位 */
  top: 44px;
}
</style>
