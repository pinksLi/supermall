import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'

import toast from 'components/common/toast'

import FastClick from 'fastclick'
import VueLazyload from 'vue-lazyload'

// 解决移动端300ms延迟问题
FastClick.attach(document.body)

Vue.config.productionTip = false

// 非父子组件直接的通信--事件总线
// 总线 bus
Vue.prototype.$bus = new Vue()
// 安装toast插件
Vue.use(toast)
// 安装图片懒加载插件
Vue.use(VueLazyload, {
    loading: require('./assets/img/common/placeholder.png')
})

new Vue({
    render: h => h(App),
    router,
    store
}).$mount('#app')
