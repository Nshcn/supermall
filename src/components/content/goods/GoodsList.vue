<template>
  <div class="goods-list">
    <goods-list-item v-for="item in goods" :goods-item="item" class="item"/>
  </div>
</template>

<script>
import GoodsListItem from "./GoodsListItem";

export default {
  name: "GoodsList",
  components: {
    GoodsListItem
  },
  props: {
    goods: {
      type: Array,
      default() {
        return []
      }
    }
  },
}
</script>

<style scoped>
.goods-list {
  display: flex;
  /*设置子元素是否换行，默认为nowrap*/
  flex-wrap: wrap;
  padding: 5px;
  /*平分剩余空间*/
  justify-content: space-around;
}

.goods-list .item {
  width: 48%;
}
</style>
