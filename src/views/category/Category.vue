<template>
  <div class="category">
    <!-- 1.导航条 -->
    <nav-bar class="nav-bar">
      <div slot="center">分类</div>
    </nav-bar>
    <!-- 2.主内容区 -->
    <div class="content">
      <!-- 2.1 左菜单栏-->
      <tab-menu :categories="categories" @selectItem="selectItem"></tab-menu>
      <!-- 2.2 内容-->
      <scroll
        class="tab-content"
        ref="scroll"
        :probe-type="3"
        @scroll="contentScroll"
      >
        <div>
          <tab-content :categoriesProduct="categoriesProduct"></tab-content>
          <tab-control
            :titles="['综合', '新品', '销量']"
            @tabClick="tabClick"
          ></tab-control>
          <tab-content-detail
            :categoryDetail="showCategoryDetail"
          ></tab-content-detail>
        </div>
      </scroll>
      <!-- 2.3 回到顶部 -->
      <back-top @click.native="backTop" v-show="isShowBackTop" />
    </div>
  </div>
</template>

<script>
import NavBar from 'components/common/navbar/NavBar'
import Scroll from 'components/common/scroll/Scroll'
import TabControl from 'components/content/tabControl/TabControl'

import TabMenu from './childComps/TabMenu'
import TabContent from './childComps/TabContent'
import TabContentDetail from './childComps/TabContentDetail'

import { getCategory, getSubcategory, getCategoryDetail } from 'network/category'
import { POP, NEW, SELL } from 'common/const'
import { tabControlMixin, backTopMixin } from 'common/mixin'

export default {
  name: 'Category',
  components: {
    NavBar,
    Scroll,
    TabControl,

    TabMenu,
    TabContent,
    TabContentDetail
  },
  data() {
    return {
      scroll: null,

      categories: [],
      categoriesProduct: [],
      categoryData: {},
      currentIndex: -1,
    }
  },
  mixins: [tabControlMixin, backTopMixin],
  computed: {
    showCategoryDetail() {
      if (this.currentIndex === -1) return []
      // console.log(this.currentType)
      // console.log(this.categoryData[this.currentIndex].categoryDetail[this.currentType])
      return this.categoryData[this.currentIndex].categoryDetail[this.currentType]
    }
  },
  created() {
    this._getCategory()
  },
  methods: {
    contentScroll(position) {
      // 判断BackTop是否显示
      // console.log(position.y);
      this.listenShowBackTop(position)
    },

    _getCategory() {
      getCategory().then(res => {
        // console.log(res);
        // 1.获取分类数据
        this.categories = res.data.category.list
        // 2.初始化每个类别的子数据
        for (let i = 0; i < this.categories.length; i++) {
          this.categoryData[i] = {
            subcategories: {},
            categoryDetail: {
              'pop': [],
              'new': [],
              'sell': []
            }
          }
        }
        // 3.请求第一个分类的数据
        this._getSubcategory(0)
      })
    },
    _getSubcategory(index) {
      this.currentIndex = index
      const maitKey = this.categories[index].maitKey
      getSubcategory(maitKey).then(res => {
        // console.log(res);
        this.categoriesProduct = res.data.list
        this.categoryData[index].subcategories = res.data
        this.categoryData = { ...this.categoryData }
        this._getCategoryDetail(POP)
        this._getCategoryDetail(NEW)
        this._getCategoryDetail(SELL)
      })
    },
    _getCategoryDetail(type) {
      // 1.获取请求的 miniWallkey
      const miniWallkey = this.categories[this.currentIndex].miniWallkey
      // 2.发送请求，传入 miniWallkey 和 type
      getCategoryDetail(miniWallkey, type).then(res => {
        // 3.将获取的数据保存下来
        this.categoryData[this.currentIndex].categoryDetail[type] = res
        this.categoryData = { ...this.categoryData }
      })
    },
    selectItem(index) {
      this._getSubcategory(index)
    }
  }
}
</script>

<!-- Add 'scoped' attribute to limit CSS to this component only -->
<style scoped>
.category {
  height: 100vh;
}
.nav-bar {
  background-color: var(--color-tint);
  color: #fff;
}
.content {
  overflow: hidden;
  position: absolute;
  top: 44px;
  bottom: 49px;
  left: 0;
  right: 0;

  display: flex;
}
.tab-content {
  height: 100%;
  flex: 1;
}
</style>
