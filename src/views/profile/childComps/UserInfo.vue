<template>
  <div id="user-info">
    <a href="#" class="clear-fix">
      <!-- 1.用户头像 -->
      <slot name="user-icon">
        <svg class="privateImage-svg left">
          <use
            xmlns:xlink="http://www.w3.org/1999/xlink"
            xlink:href="#avatar-default"
          ></use>
        </svg>
      </slot>
      <!-- 2.登录注册 -->
      <div class="login-info left">
        <slot name="user-nickname">
          <div>登录/注册</div>
        </slot>
        <div class="phone">
          <span>
            <svg data-v-735ff1be="" fill="#fff" class="icon-mobile">
              <use
                data-v-735ff1be=""
                xmlns:xlink="http://www.w3.org/1999/xlink"
                xlink:href="#mobile"
              ></use>
            </svg>
          </span>
          <slot name="user-phone">暂无绑定手机号</slot>
        </div>
      </div>
      <svg data-v-735ff1be="" fill="#fff" class="arrow-svg right">
        <use
          data-v-735ff1be=""
          xmlns:xlink="http://www.w3.org/1999/xlink"
          xlink:href="#arrow-right"
        ></use>
      </svg>
    </a>
  </div>
</template>

<script>
export default {
  name: 'UserInfo'
}
</script>

<!-- Add 'scoped' attribute to limit CSS to this component only -->
<style scoped>
#user-info {
  background-color: var(--color-tint);
  padding: 15px;
  margin-top: -5px;
  border-top: 1px solid rgba(200, 100, 100, 0.2);
}
.privateImage-svg {
  width: 60px;
  height: 60px;
  background-color: #fff;
  border-radius: 50%;
}
.left {
  float: left;
}
.login-info {
  color: #fff;
  font-size: 16px;
  margin: 10px 0 0 10px;
}
.login-info .phone {
  position: relative;
  font-size: 13px;
  margin-top: 5px;
  margin-left: 15px;
  font-weight: 300;
}
.login-info .phone .icon-mobile {
  position: absolute;
  width: 12px;
  height: 18px;
  top: 0;
  left: -15px;
}
.arrow-svg {
  width: 11px;
  height: 22px;
  margin-top: 18px;
}
</style>
