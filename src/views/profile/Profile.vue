<template>
  <div id="profile">
    <!-- 1.nav-bar标题 -->
    <nav-bar class="profile-nav">
      <div slot="center">超级商场</div>
    </nav-bar>

    <!-- 2.个人信息 -->
    <user-info />

    <!-- 3.购物统计 -->
    <!-- 说明：不单独封装，不同的地方很多，需要传过很多参数 -->
    <div class="account">
      <div class="account-item">
        <span class="number">66.66</span>
        <span class="account-info">我的余额</span>
      </div>
      <div class="account-item">
        <span class="number">6</span>
        <span class="account-info">我的优惠</span>
      </div>
      <div class="account-item">
        <span class="number">666</span>
        <span class="account-info">我的积分</span>
      </div>
    </div>

    <!-- 4.其他信息 -->
    <list-view :list-data="orderList" class="order-list"></list-view>
    <list-view :list-data="serviceList" class="service-list"></list-view>
    <list-view :list-data="moreList" class="more-list"></list-view>
  </div>
</template>

<script>
import NavBar from 'components/common/navbar/NavBar'
import UserInfo from './childComps/UserInfo'
import ListView from './childComps/ListView'


export default {
  name: 'Profile',
  components: {
    NavBar,
    UserInfo,
    ListView
  },
  data() {
    return {
      orderList: [
        { icon: '#order', iconColor: '#ff8198', info: '我的消息' },
        { icon: '#point', iconColor: '#fc7b53', info: '积分商城' },
        { icon: '#vip', iconColor: '#ffc636', info: '会员卡' },
      ],
      serviceList: [
        { icon: '#service', iconColor: '#ff8198', info: '我的购物车' },
        { icon: '#download', iconColor: '#ff8198', info: '下载购物APP' },
      ],
      moreList: [
        { icon: '#expired', iconColor: '#ff8198', info: '设置' },
        { icon: '#vip', iconColor: '#ff8198', info: '更多' },
      ]
    }
  },
}
</script>

<!-- Add 'scoped' attribute to limit CSS to this component only -->
<style scoped>
#profile {
  height: 100vh;
  position: relative;
  background-color: #f2f2f2;
}
.profile-nav {
  background-color: var(--color-tint);
  color: #fff;
}
.account {
  display: flex;
}
.account-item {
  width: 100%;
  color: #666;
  font-size: 13px;
  padding: 18px;
  background-color: #fff;
  margin-right: 1px;
  text-align: center;
}
.account-item:last-of-type {
  margin-right: 0;
}
.account-item .number {
  font-size: 24px;
  font-weight: 700;
  color: #ff5f3e;
}
.account-info {
  display: block;
  margin-top: 6px;
}
.order-list,
.service-list,
.more-list {
  margin-top: 12px;
}
</style>
