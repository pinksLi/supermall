module.exports = {
    plugins: {
        // 用来给不同的浏览器自动添加相应前缀，如-webkit-,-moz-等等
        autoprefixer: {},
        "postcss-px-to-viewport": {
            // UI设计稿的宽度(这里以iPhone6为例-750px*1334px)
            viewportWidth: 375,
            // UI设计稿的高度
            viewportHeight: 667,
            // 转换后的精度，即小数点位数
            unitPrecision: 5,
            // 指定需要转换成的视窗单位，默认vw
            viewportUnit: 'vw',
            // 指定不转换为视窗单位的类名(转换黑名单)
            selectorBlackList: ['ignore', 'tab-bar'],
            // 默认值1，小于或者等于1px则不进行转换
            minPixelValue: 1,
            // 是否在媒体查询的css代码中也进行转换，默认false
            mediaQuery: true,
            // 设置忽略文件，用正则做目录名匹配
            exclude: [/TabBar/],
            // 是否处理横屏情况
            landscape: false
        }
    }
}