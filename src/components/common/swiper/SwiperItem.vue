<template>
  <div class="slide">
    <slot></slot>
  </div>
</template>

<script>
export default {
  name: 'Slide',
  components: {

  },
  data() {
    return {

    }
  },
}
</script>

<!-- Add 'scoped' attribute to limit CSS to this component only -->
<style scoped>
.slide {
  width: 100%;
  /* flex布局防止被挤压 */
  flex-shrink: 0;
}
.slide img {
  width: 100%;
}
</style>