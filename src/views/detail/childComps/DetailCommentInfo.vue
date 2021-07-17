<template>
  <div v-if="Object.keys(commentInfo).length !== 0" class="comment-info">
    <!-- 1.评论头 -->
    <div class="info-header">
      <!-- 1.1 用户评价 -->
      <div class="header-title">用户评价</div>
      <!-- 1.2 更多 -->
      <div class="header-more">
        <span>更多</span>
        <i class="arrow-right">
          <!-- 右箭头制作-方法1：img元素 -->
          <img src="~assets/img/common/arrow-right.svg" alt="" />
        </i>
      </div>
    </div>
    <!-- 2.评论用户 -->
    <div class="info-user">
      <!-- 2.1 用户头像 -->
      <img :src="commentInfo.user.avatar" alt="" />
      <!-- 2.2 用户名 -->
      <span>{{ commentInfo.user.uname }}</span>
    </div>
    <!-- 3.评论内容 -->
    <div class="info-detail">
      <!-- 3.1 评论内容 -->
      <p>{{ commentInfo.content }}</p>
      <!-- 3.2 其他 -->
      <div class="info-other">
        <!-- 评论时间 -->
        <span class="date">{{ commentInfo.created | showDate }}</span>
        <!-- 购物信息 -->
        <span>{{ commentInfo.style }}</span>
      </div>
      <!-- 3.3 买家秀 -->
      <div class="info-imgs">
        <img
          v-for="(item, index) in commentInfo.images"
          :src="item"
          :key="index"
          alt=""
        />
      </div>
    </div>
  </div>
</template>

<script>
import { formatDate } from 'common/utils'

export default {
  name: 'DetailCommentInfo',
  props: {
    commentInfo: {
      type: Object,
      default() {
        return {}
      }
    }
  },
  filters: {
    showDate: function (value) {
      // 把时间戳转换成毫秒数
      let date = new Date(value * 1000)
      // return formatDate(date, 'yyyy/MM/dd hh:mm:ss')
      // return formatDate(date, 'yyyy-MM--dd hh:mm:ss')
      return formatDate(date, 'yyyy-MM--dd hh:mm')
    }
  }
}
</script>

<!-- Add 'scoped' attribute to limit CSS to this component only -->
<style scoped>
.comment-info {
  padding: 5px 12px;
  color: #333;
  border-bottom: 5px solid #f2f5f8;
}
.info-header {
  height: 50px;
  line-height: 50px;
  border-bottom: 1px solid rgba(0, 0, 0, 0.2);
}
.header-title {
  float: left;
  font-size: 15px;
}
.header-more {
  /* 子绝父相-->方法2 */
  position: relative;
  float: right;
  font-size: 13px;
}
/* 右箭头制作-方法1：img元素 */
.arrow-right img {
  width: 20px;
  height: 20px;
  margin-left: 5px;
  margin-top: -5px;
  /* 让图片和文字垂直居中 */
  vertical-align: middle;
  /* 透明图标变成黑色 */
  filter: brightness(0);
}
/* 右箭头制作-方法2：css画图 */
/* .header-more span {
  margin-right: 18px;
} */
/* .arrow-right {
  position: absolute;
  top: 19px;
  right: 6px;
  display: inline-block;
  width: 11px;
  height: 11px;
  border-top: 1px solid #000;
  border-right: 1px solid #000;
  transform: rotate(45deg);
} */
.info-user {
  padding: 10px 0 5px;
}
.info-user img {
  width: 42px;
  height: 42px;
  border-radius: 50%;
}
.info-user span {
  position: relative;
  top: -15px;
  margin-left: 10px;
  font-size: 15px;
}
.info-detail {
  padding: 0 5px 15px;
}
.info-detail p {
  font-size: 14px;
  color: #777;
  line-height: 1.5;
}
.info-detail .info-other {
  font-size: 12px;
  color: #999;
  margin-top: 8px;
}
.info-other .date {
  margin-right: 12px;
}
.info-imgs {
  margin-top: 10px;
}
.info-imgs img {
  width: 70px;
  height: 70px;
  margin-right: 5px;
}
</style>
