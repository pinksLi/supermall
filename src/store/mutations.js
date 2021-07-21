import { ADD_COUNTER, ADD_TO_CART } from './mutation-types'

export default {
    // 要么增加数量
    // addCounter(state, payload) {
    // 常量替换
    [ADD_COUNTER](state, payload) {
        payload.count++
    },
    // 要么添加到购物车
    // addToCart(state, payload) {
    // 常量替换
    [ADD_TO_CART](state, payload) {
        payload.checked = true
        state.cartList.push(payload)
    }

    // mutations唯一的目的就是修改state中的状态
    // mutations中的每个方法尽可能完成的事情要比较单一一点

    // // 建议写到actions中
    // addCart(state, payload) {
    //     // // 方法1：for循环遍历
    //     // // 1.payload新添加的商品是否已经存在于 cartList 中
    //     // let oldProduct = null
    //     // for (let item of state.cartList) {
    //     //     if (item.id === payload.id) {
    //     //         oldProduct = item
    //     //     }
    //     // }
    //     // // 2.判断 oldProduct
    //     // if (oldProduct) {
    //     //     oldProduct.count += 1
    //     // } else {
    //     //     payload.count = 1
    //     //     state.cartList.push(payload)
    //     // }

    //     // // 方法2：indexOf()
    //     // // 1.payload新添加的商品是否已经存在于 cartList 中
    //     // let index = state.cartList.indexOf(payload)
    //     // // 2.判断 oldProduct
    //     // if (index === -1) {
    //     //     let oldProduct = state.cartList[index]
    //     //     oldProduct.count += 1
    //     // } else {
    //     //     payload.count = 1
    //     //     state.cartList.push(payload)
    //     // }

    //     // 方法3：find()
    //     // 1.payload新添加的商品是否已经存在于 cartList 中
    //     let oldProduct = state.cartList.find(item => item.id === payload.id)
    //     // 2.判断 oldProduct
    //     if (oldProduct) {
    //         oldProduct.count += 1
    //     } else {
    //         payload.count = 1
    //         state.cartList.push(payload)
    //     }
    // }
}