<template>
  <div id="app" class="wrapper">
    <keep-alive exclude="Detail">
      <router-view />
    </keep-alive>
    <main-tab-bar />
    <icon></icon>
    <svg-icon></svg-icon>
  </div>
</template>

<script>
// 注意：用到路径别名（import直接导入的，不用加~）
import MainTabBar from 'components/content/mainTabbar/MainTabBar.vue'
// 路径常规写法
// import MainTabBar from './components/content/mainTabbar/MainTabBar.vue'

import Icon from 'components/content/Icon/Icon'
import SvgIcon from 'components/content/Icon/svg'

export default {
  name: 'app',
  components: {
    MainTabBar,
    Icon,
    SvgIcon
  }
}
</script>

<style>
@import "assets/css/base.css";
</style>
