<template>
  <div id="detail">
    <detail-nav-bar></detail-nav-bar>
    <detail-swiper :top-images="topImages"/>
    <detail-base-info :goods="goods"/>
  </div>
</template>

<script>
import DetailNavBar from "./childComps/DetailNavBar";
import DetailSwiper from "./childComps/DetailSwiper";
import DetailBaseInfo from "./childComps/DetailBaseInfo";

import {getDetail, Goods} from "network/detail";

export default {
  name: "Detail",
  components: {DetailBaseInfo, DetailSwiper, DetailNavBar},
  data() {
    return {
      iid: null,
      topImages: [],
      goods: {}
    }
  },
  created() {
    // 1. 请求iid
    this.iid = this.$route.params.iid
    // 2.请求详情数据
    getDetail(this.iid).then(res => {
      // 1. 获取顶部的图片数据
      const data = res.result;
      console.log(res);
      this.topImages = data.itemInfo.topImages;
      // 2. 获取商品的基本信息数据
      this.goods = new Goods(data.itemInfo, data.columns, data.shopInfo.services)
    })
  }
}
</script>

<style scoped>

</style>
