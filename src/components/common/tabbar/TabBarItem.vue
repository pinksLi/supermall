<template>
  <div class="tab-bar-item" @click="itemClick">
    <div v-if="!isActive"><slot name="item-icon"></slot></div>
    <div v-else><slot name="item-icon-active"></slot></div>
    <div :style="activeStyle"><slot name="item-text"></slot></div>
    <!-- 所有的 item都展示同一张图片，同一个文字 -->
    <!-- <img src="../../assets/img/tabbar/home.svg" alt="" />
    <div>首页</div> -->
  </div>
</template>

<script>
export default {
  name: 'TabBarItem',
  props: {
    path: String,
    // 修改活跃属性：字体颜色
    activeColor: {
      type: String,
      default: '#f00',
    },
  },
  data() {
    return {
      // 不能固定
      // isActive: true
    }
  },
  computed: {
    // 修改活跃状态
    isActive() {
      return this.$route.path.indexOf(this.path) !== -1
    },
    activeStyle() {
      return this.isActive ? { color: this.activeColor } : {}
    }
  },
  methods: {
    itemClick() {
      // console.log('itemClick');
      this.$router.replace(this.path)
    }
  },
}
</script>

<!-- Add 'scoped' attribute to limit CSS to this component only -->
<style scoped>
.tab-bar-item {
  flex: 1;
  text-align: center;
  height: 49px;
  font-size: 14px;
}
.tab-bar-item img {
  width: 24px;
  height: 24px;
  margin-top: 3px;
  vertical-align: middle;
  margin-bottom: 2px;
}
</style>
