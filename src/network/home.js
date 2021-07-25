import { request } from './request';

export function getHomeMultidata() {
    return request({
        // 以后如果接口有变化只要改这里就行了（面向模块开发）
        url: '/home/multidata'
    })
}
export function getHomeGoods(type, page) {
    return request({
        // 此接口已更新，已经替换为最新的
        url: '/home/data',
        params: {
            type,
            page
        }
    })

}

// 函数调用 -> 压入函数栈（保存函数调用过程中所有变量）
// 函数调用结束 -> 弹出函数站（释放函数所有的变量）
// function test() {
//     const names = ['曹操', '司马懿', '刘备', '诸葛亮', '孙权', '周瑜']
// }

// test()

// test()


// 往数组中添加元素
// let totalNums = []

// const nums1 = [20, 301, 22, 12, 58]
// const nums2 = [111, 22, 333]

// // for (let n of nums1) {
// //     totalNums.push(n)
// // }

// totalNums.push(...nums1)