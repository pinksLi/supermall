import { debounce } from "./utils"
import { BACK_POSITION, POP, NEW, SELL } from "common/const";
import BackTop from 'components/content/backTop/BackTop'

export const itemListenerMixin = {
    data() {
        return {
            itemImgListener: null,
            refresh: null
        }
    },
    mounted() {
        this.refresh = debounce(this.$refs.scroll.refresh, 100)
        this.itemImgListener = () => {
            this.refresh()
        }
        this.$bus.$on('itemImgLoad', this.itemImgListener)
        // console.log('我是混入中的内容');
    }
}

export const tabControlMixin = {
    data() {
        return {
            // 默认选中类型
            // currentType: 'pop',
            // 常量替换
            currentType: POP
        }
    },
    methods: {
        tabClick(index) {
            // console.log(index);
            switch (index) {
                case 0:
                    // this.currentType = 'pop'
                    // 常量替代
                    this.currentType = POP
                    break
                case 1:
                    // this.currentType = 'new'
                    this.currentType = NEW
                    break
                case 2:
                    // this.currentType = 'sell'
                    this.currentType = SELL
                    // 如果最后有 default，这里必须要写break，否则会产生 case 穿透
                    break
            }
            // 让两个TabControl的currentIndex保持一致
            // 解决currentIndex不存在(第一种方案)
            if (this.$refs.topTabControl !== undefined) {
                this.$refs.topTabControl.currentIndex = index
                this.$refs.tabControl.currentIndex = index
            }
            // 让两个TabControl的currentIndex保持一致
            // 解决currentIndex不存在(第二种方案)
            // this.$refs.topTabControl.currentIndex = index
            // this.$refs.tabControl.currentIndex = index
        },
    }
}


export const backTopMixin = {
    data() {
        return {
            isShowBackTop: false,
        }
    },
    components: {
        BackTop
    },
    methods: {
        backTop() {
            this.$refs.scroll.scrollTo(0, 0, 300)
        },
        listenShowBackTop(position) {
            // this.isShowBackTop = (-position.y) > 1000
            // 常量替换
            this.isShowBackTop = (-position.y) > BACK_POSITION
        }
    }
}