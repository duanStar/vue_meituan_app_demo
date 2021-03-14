<template>
    <div>
        <ul class="cate-box">
            <li class="cate-list" v-for="item in cateList" :key="item.id">
                <img  class="cate-image" :src="item.img" alt="">
                <p class="cate-title">{{item.name}}</p>
            </li>
        </ul>
    </div>
</template>

<script>
import { getCategory } from '../../api/home'
export default {
  data () {
    return {
      cateList: []
    }
  },
  async created () {
    const res = await getCategory()
    this.cateList = res.data
  }
}
</script>

<style lang="scss" scoped>
.cate-box {
    display: flex;
    flex-wrap: wrap;
    .cate-list {
        width: 20%;
        padding-top: 0.3rem;
        text-align: center;
        font-size: 11px;
        .cate-image {
            width: 0.88rem;
            height: 0.88rem;
            padding-bottom: 0.1rem;
        }
    }
}
</style>
