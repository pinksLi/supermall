<template>
  <div class="check-button">
    <!-- 打钩区域 -->
    <div
      class="icon-selector"
      :class="{ 'selector-active': checked }"
      @click="selectItem"
    >
      <!-- 打钩 -->
      <img src="~assets/img/cart/tick.svg" alt="" />
    </div>
  </div>
</template>

<script>
export default {
  name: 'CheckButton',
  props: {
    isChecked: {
      type: Boolean,
      default: false
    }
  },
  data: function () {
    return {
      // 改变状态在模型中进行【mutations.js】
      checked: this.isChecked
    }
  },
  methods: {
    selectItem: function () {
      this.$emit('checkBtnClick')
    }
  },
  watch: {
    isChecked: function (newValue) {
      this.checked = newValue
    }
  }
}
</script>

<!-- Add 'scoped' attribute to limit CSS to this component only -->
<style scoped>
.icon-selector {
  position: relative;
  margin: 0;
  width: 18px;
  height: 18px;
  border-radius: 50%;
  border: 2px solid #ccc;
  cursor: pointer;
}
.selector-active {
  background-color: #ff8198;
  border-color: #ff8198;
}
</style>
