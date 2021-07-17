import { request } from './request'

export function getDetail(iid) {
    return request({
        url: '/detail',
        params: {
            iid
        }
    })
}

export function getRecommend() {
    return request({
        url: '/recommend'
    })
}

// 数据较多,先整合
// 抽离组件需要的商品信息
export class Goods {
    constructor(itemInfo, columns, services) {
        // 商品标题
        this.title = itemInfo.title
        // 商品描述
        this.desc = itemInfo.desc
        // 商品新价格
        this.newPrice = itemInfo.price
        // 商品旧价格
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

// 抽离组件需要的商家店铺信息
export class Shop {
    constructor(shopInfo) {
        // Logo
        this.logo = shopInfo.shopLogo
        // 店铺名
        this.name = shopInfo.name
        // 粉丝
        this.fans = shopInfo.cFans
        // 销量
        this.sells = shopInfo.cSells
        // 评分
        this.score = shopInfo.score
        // 库存
        this.goodsCount = shopInfo.cGoods
    }
}

// 抽离组件需要的商品参数信息
export class GoodsParam {
    constructor(info, rule) {
        // 尺码表
        this.sizes = rule.tables
        // 参数详情
        this.infos = info.set
        // 图片
        // 注: images可能没有值(某些商品有值, 某些没有值)
        this.image = info.images ? info.images[0] : ''
    }
}