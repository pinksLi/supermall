import { ADD_COUNTER, ADD_TO_CART } from './mutation-types'

export default {
    addCart(context, payload) {
        // return new Promise((resolve, reject) => {
        return new Promise((resolve) => {
            // 1.payload新添加的商品是否已经存在于 cartList 中
            let oldProduct = context.state.cartList.find(item => item.id === payload.id)
            // 2.判断 oldProduct
            if (oldProduct) {
                // oldProduct.count += 1
                // context.commit('addCounter', oldProduct)
                // 常量替换
                context.commit(ADD_COUNTER, oldProduct)
                resolve('当前的商品数量+1')
            } else {
                payload.count = 1
                // context.state.cartList.push(payload)
                // context.commit('addToCart', payload)
                //  常量替换
                context.commit(ADD_TO_CART, payload)
                resolve('添加了新的商品')
            }
        })
    }
}