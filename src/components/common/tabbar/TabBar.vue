<template>
  <div id="tab-bar">
    <slot></slot>
  </div>
</template>

<script>
export default {
  name: 'TabBar',
  data() {
    return {}
  }
}
</script>

<!-- Add 'scoped' attribute to limit CSS to this component only -->
<style scoped>
#tab-bar {
  display: flex;
  background-color: #f6f6f6;
  /* 固定定位 */
  position: fixed;
  left: 0;
  right: 0;
  bottom: 0;
  /* 上边框阴影 */
  box-shadow: 0 -1px 1px rgba(100, 100, 100, 0.2);
}
</style>
