<template>
  <div id="home">
    <nav-bar class="home-nav">
      <div slot="center">购物街</div>
    </nav-bar>
    <tab-control :title="['流行','新款','精选']"
                 @tabClick="tabClick" ref="tabControl1"
                 :class="{fixed:isTabFixed}"
                 class="tab-control" v-show="isTabFixed"/>
    <scroll class="content"
            ref="scroll"
            :probe-type="3"
            @scroll="contentScroll"
            :pull-up-load="true" @pullingUp="loadMore">
      <home-swiper :banner="banner" @swiperImageLoad="swiperImageLoad"/>
      <recommend-view :recommend="recommend"/>
      <feature-view/>
      <tab-control :title="['流行','新款','精选']"
                   @tabClick="tabClick" ref="tabControl2"
                   :class="{fixed:isTabFixed}"/>
      <goods-list :goods="showGoods"/>
    </scroll>
    <back-top @click.native="backClick" v-show="isShowBackTop"/>
  </div>
</template>

<script>
import HomeSwiper from "./childComps/HomeSwiper";
import RecommendView from "./childComps/RecommendView";
import FeatureView from "./childComps/FeatureView";

import NavBar from "components/common/navbar/NavBar";
import TabControl from "components/content/tabcontrol/TabControl";
import GoodsList from "components/content/goods/GoodsList";

import Scroll from "components/common/scroll/Scroll";
import {getHomeMultidata, getHomeGoods} from "../../network/home";
import {debounce} from "common/utils";
import {itemListenerMixin, backTopMixin} from "common/mixin";

export default {
  name: "Home",
  components: {
    HomeSwiper,
    FeatureView,
    RecommendView,
    NavBar,

    TabControl,
    GoodsList,
    Scroll,
  },
  mixins: [itemListenerMixin, backTopMixin],
  data() {
    return {
      banner: [],
      recommend: [],
      goods: {
        'pop': {page: 0, list: []},
        'new': {page: 0, list: []},
        'sell': {page: 0, list: []}
      },
      currentType: 'pop',
      tabOffSetTop: 0,
      isTabFixed: false,
      saveY: 0,
    }
  },
  computed: {
    showGoods() {
      return this.goods[this.currentType].list
    }
  },
  destroyed() {
    console.log('销毁');
  },
  activated() {
    this.$refs.scroll.scrollTo(0, this.saveY, 0);
    this.$refs.scroll.refresh();
  },
  deactivated() {
    this.saveY = this.$refs.scroll.getScrollY();
    // 2. 取消全局事件的监听
    this.$bus.$off('itemImgLoad', this.itemImgListener)
  },
  created() {
    // 1.请求多个数据
    this.getHomeMultidata();
    // 2.请求商品数据
    this.getHomeGoods('pop');
    this.getHomeGoods('new');
    this.getHomeGoods('sell');
  },
  mounted() {

  },
  methods: {
    /**
     * 事件监听相关
     */
    tabClick(index) {
      switch (index) {
        case 0:
          this.currentType = 'pop'
          break
        case 1:
          this.currentType = 'new'
          break
        case 2:
          this.currentType = 'sell'
          break
      }
      this.$refs.tabControl1.currentIndex = index
      this.$refs.tabControl2.currentIndex = index
    },
    contentScroll(position) {
      // 1.判断backtop是否显示
      this.isShowBackTop = (-position.y) > 1000
      // 2.决定tabcontrol是否吸顶
      this.isTabFixed = (-position.y) > this.tabOffSetTop;
    },
    loadMore() {
      this.getHomeGoods(this.currentType)
    },
    swiperImageLoad() {
      // 获取tabcontrol的offsetTop
      // 组件没有offsetTop属性，但是所有组件都有一个属性$el，用于获取组件中的元素
      this.tabOffSetTop = this.$refs.tabControl2.$el.offsetTop
    },
    /**
     * 网络请求相关
     */
    getHomeMultidata() {
      getHomeMultidata().then(res => {
        this.banner = res.data.banner.list;
        this.recommend = res.data.recommend.list;
      })
    },
    getHomeGoods(type) {
      const page = this.goods[type].page + 1;
      getHomeGoods(type, page).then(res => {
        this.goods[type].list.push(...res.data.list)
        this.goods[type].page += 1
        // 完成上拉加载更多
        this.$refs.scroll.finishPullUp()
      })
    }
  }
}
</script>

<style scoped>
#home {
  height: 100vh;
  position: relative;
}

.home-nav {
  background-color: var(--color-tint);
  color: #fff;

  /*在使用浏览器原生滚动时，为了让导航栏不跟随一起滚动*/
  /*position: fixed;*/
  /*left: 0;*/
  /*right: 0;*/
  /*top: 0;*/
  /*!*需要设置z-index，否则会被挡住*!*/
  position: relative;
  z-index: 9;
}

/*简单通过sticky实现吸顶效果，使用BScroll后失效*/
/*.tab-control {*/
/*  position: sticky;*/
/*  top: 44px;*/
/*  z-index: 9;*/
/*}*/

.content {
  position: absolute;
  top: 44px;
  bottom: 49px;
  left: 0;
  right: 0;
}

.tab-control {
  position: relative;
  z-index: 9;
}
</style>
