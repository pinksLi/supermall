import { request } from './request'

export function getDetail(iid) {
    return request({
        url: '/detail',
        params: {
            iid
        }
    })
}

// 抽离组件需要的商品信息
// 数据较多,先整合
export class Goods {
    constructor(itemInfo, columns, services) {
        // 商品标题
        this.title = itemInfo.title
        // 商品描述
        this.desc = itemInfo.desc
        // 商品新价格
        this.newPrice = itemInfo.price
        // 旧价格
        this.oldPrice = itemInfo.oldPrice
        // 宣传语 折扣 活动
        this.discount = itemInfo.discountDesc
        // 最低价
        this.realPrice = itemInfo.lowNowPrice
        // 专栏 其他信息
        this.columns = columns
        // 售后
        this.services = services
    }
}