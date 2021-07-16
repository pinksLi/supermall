<template>
  <div id="app" class="wrapper">
    <keep-alive exclude="Detail">
      <router-view />
    </keep-alive>
    <main-tab-bar />
  </div>
</template>

<script>
// 注意：用到路径别名（import直接导入的，不用加~）
import MainTabBar from 'components/content/mainTabbar/MainTabBar.vue'
// 路径常规写法
// import MainTabBar from './components/content/mainTabbar/MainTabBar.vue'
export default {
  name: 'app',
  components: {
    MainTabBar
  }
}
</script>

<style>
@import "assets/css/base.css";
</style>
