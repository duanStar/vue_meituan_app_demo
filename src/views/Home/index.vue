<template>
    <div>
        <van-sticky>
            <div class="header" :offset-top="0">
                <input type="text" class="search" placeholder="请输入商家或商品名称">
            </div>
        </van-sticky>
        <category/>
        <div class="title">附近商家</div>
        <list/>
    </div>
</template>

<script>
import category from './category.vue'
import list from './list.vue'
export default {
  data () {
    return {}
  },
  components: {
    category,
    list
  }
}
</script>

<style lang="scss" scoped>
.header {
    background-color: #1c1b20;
    padding: 0.2rem;
    .search {
        width: 100%;
        height: 0.66rem;
        line-height: 0.6rem;
        border: none;
        border-radius: 0.3rem;
        box-sizing: border-box;
        padding: 0 0.2rem;
    }
}
.title {
  font-size: .34rem;
  font-weight: 800;
  text-align: center;
  height: 0.46rem;
  line-height: 0.46rem;
  margin: 0.3rem 0;
}
.title::before,.title::after {
  content: '';
  height: 1px;
  transform:  scaleY(0.5);
  width: 30px;
  display: inline-block;
  background-color: #666;
  vertical-align: middle;
}
</style>
