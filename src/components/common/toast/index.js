import Toast from './Toast'
const obj = {}

obj.install = function (Vue) {
    // console.log('执行了obj的install函数');
    // Vue.extend(trn)
    // console.log(Toast.$el);  // undefined
    // document.body.appendChild(Toast.$el)

    // 1.插件组件构造器
    const toastConstructor = Vue.extend(Toast)

    // 2.new的方式，根据组件构造器，可以创建出来一个组件对象
    const toast = new toastConstructor()

    // 3.将组建对象，手动挂载到某一个元素上
    toast.$mount(document.createElement('div'))

    // 4.toast.$el 对应的就是div
    document.body.appendChild(toast.$el)

    Vue.prototype.$toast = toast;
}

export default obj