<template>
  <tab-bar>
    <tab-bar-item path="/home">
      <!-- 注意：用到路径别名（标签属性，前面需要加~） -->
      <!-- 使用插槽slot替换TabBarItem中定义的插槽，关联name属性 -->
      <img src="~assets/img/tabbar/home.svg" slot="item-icon" alt="" />
      <img
        src="~assets/img/tabbar/home_active.svg"
        slot="item-icon-active"
        alt=""
      />
      <div slot="item-text">首页</div>
    </tab-bar-item>
    <tab-bar-item path="/category">
      <!-- 注意：用到路径别名（标签属性，前面需要加~） -->
      <!-- 使用插槽slot替换TabBarItem中定义的插槽，关联name属性 -->
      <img src="~assets/img/tabbar/category.svg" slot="item-icon" alt="" />
      <img
        src="~assets/img/tabbar/category_active.svg"
        slot="item-icon-active"
        alt=""
      />
      <div slot="item-text">分类</div>
    </tab-bar-item>
    <tab-bar-item path="/cart">
      <!-- 注意：用到路径别名（标签属性，前面需要加~） -->
      <!-- 使用插槽slot替换TabBarItem中定义的插槽，关联name属性 -->
      <img src="~assets/img/tabbar/shopcart.svg" slot="item-icon" alt="" />
      <img
        src="~assets/img/tabbar/shopcart_active.svg"
        slot="item-icon-active"
        alt=""
      />
      <div slot="item-text">购物车</div>
    </tab-bar-item>
    <tab-bar-item path="/profile">
      <!-- 注意：用到路径别名（标签属性，前面需要加~） -->
      <!-- 使用插槽slot替换TabBarItem中定义的插槽，关联name属性 -->
      <img src="~assets/img/tabbar/profile.svg" slot="item-icon" alt="" />
      <img
        src="~assets/img/tabbar/profile_active.svg"
        slot="item-icon-active"
        alt=""
      />
      <div slot="item-text">我的</div>
    </tab-bar-item>
  </tab-bar>
</template>

<script>
// 注意：用到路径别名（import直接导入的，不用加~）
// import TabBar from 'components/common/tabbar/TabBar'
// import TabBarItem from 'components/common/tabbar/TabBarItem'
// 路径常规写法
import TabBar from '../../common/tabbar/TabBar.vue'
import TabBarItem from '../../common/tabbar/TabBarItem.vue'

export default {
  name: 'MainTabBar',
  data() {
    return {}
  },
  components: {
    TabBar,
    TabBarItem
  },
}
</script>

<!-- Add 'scoped' attribute to limit CSS to this component only -->
<style scoped>
</style>
