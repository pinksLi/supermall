<template>
  <div class="tab-control">
    <div
      v-for="(item, index) in titles"
      :key="item.title"
      class="tab-control-item"
      :class="{ active: index === currentIndex }"
      @click="itemClick(index)"
    >
      <span>{{ item }}</span>
    </div>
  </div>
</template>

<script>
export default {
  name: 'TabControl',
  // 把数据传进来（外部-->内部）
  props: {
    titles: {
      type: Array,
      default() {
        return []
      }
    }
  },
  data() {
    return {
      currentIndex: 0
    }
  },
  methods: {
    itemClick(index) {
      this.currentIndex = index
      // 自定义组件把数据传出去（内部-->外部）
      this.$emit('tabClick', index)
    }
  }
}
</script>

<!-- Add 'scoped' attribute to limit CSS to this component only -->
<style scoped>
.tab-control {
  display: flex;
  text-align: center;
  font-size: 15px;
  height: 40px;
  line-height: 40px;
  background-color: #fff;
}
.tab-control-item {
  flex: 1;
}
.active {
  color: var(--color-high-text);
}
.active span {
  border-bottom: 2px solid var(--color-tint);
  padding: 5px;
}
</style>
