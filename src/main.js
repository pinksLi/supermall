import Vue from 'vue'
import App from './App.vue'
import router from './router'

Vue.config.productionTip = false

// 非父子组件直接的通信--事件总线
// 总线 bus
Vue.prototype.$bus= new Vue()

new Vue({
    render: h => h(App),
    router
}).$mount('#app')
