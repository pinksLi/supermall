<template>
  <div class="toast" v-show="isShow">
    <div>{{ message }}</div>
  </div>
</template>

<script>
export default {
  name: 'Toast',
  //   // 暂时不需要
  //   props: {
  //     message: {
  //       type: String,
  //       default: ''
  //     },
  //     isShow: {
  //       type: Boolean,
  //       default: false
  //     }
  //   },

  data() {
    return {
      message: '',
      isShow: false
    }
  },
  methods: {
    show(message = '你好啊，小主', duration = 2000) {
      // duration = duration || 2000
      // console.log(message, duration);
      this.isShow = true
      this.message = message

      setTimeout(() => {
        this.isShow = false
        this.message = ''
      }, duration)
    }
  }
}
</script>

<!-- Add 'scoped' attribute to limit CSS to this component only -->
<style scoped>
.toast {
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  padding: 8px 10px;

  font-family: "Microsoft Yahei";
  font-size: 18px;
  color: #fff;
  background-color: rgba(0, 0, 0, 0.75);

  /* z-index 属性设置元素的堆叠顺序 */
  /* 但仅能在定位元素上奏效 */
  /* 详情页也有，但此处优先级应该最高 */
  z-index: 999;
}
</style>
