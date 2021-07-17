<template>
  <div class="param-info" v-if="Object.keys(paramInfo).length !== 0">
    <!-- 1.尺码表 -->
    <table
      v-for="(table, index) in paramInfo.sizes"
      :key="index"
      class="info-size"
    >
      <tr v-for="(tr, index2) in table" :key="index2">
        <td v-for="(td, index3) in tr" :key="index3">{{ td }}</td>
      </tr>
    </table>
    <!-- 2. 参数详情-->
    <table class="info-param">
      <tr v-for="(info, index4) in paramInfo.infos" :key="index4">
        <td class="info-param-key">{{ info.key }}</td>
        <td class="param-value">{{ info.value }}</td>
      </tr>
    </table>
    <!-- 3.图片 -->
    <div class="info-img" v-if="paramInfo.image.length !== 0">
      <img :src="paramInfo.image" alt="" />
    </div>
  </div>
</template>

<script>
export default {
  name: 'DetailParamInfo',
  props: {
    paramInfo: {
      type: Object,
      default() {
        return {}
      }
    }
  }
}
</script>

<!-- Add 'scoped' attribute to limit CSS to this component only -->
<style scoped>
.param-info {
  padding: 20px 15px;
  font-size: 14px;
  border-bottom: 5px solid #f2f5f8;
}
.param-info table {
  width: 100%;
  /* 合并相邻边框 */
  border-collapse: collapse;
}
.param-info table tr {
  height: 42px;
}
.param-info table tr td {
  border-bottom: 1px solid rgba(100, 100, 100, 0.2);
}
.info-param-key {
  /* 当value的数据量比较大的时候, 会挤到key,所以给一个固定的宽度 */
  width: 95px;
}
.info-param {
  border-top: 1px solid rgba(0, 0, 0, 0.1);
}
.param-value {
  color: #eb4868;
}
.info-img img {
  width: 100%;
}
</style>
