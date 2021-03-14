<template>
    <div class="scrollBox">
      <div>
        <seller-header :seller="seller"/>
        <van-tabs v-model="active" sticky animated color="#ffda41">
        <van-tab title="菜单" class="caidan">
          <order></order>
        </van-tab>
        <van-tab title="评价" class="pingjia">
          <comment></comment>
        </van-tab>
        <van-tab title="商家" class="shangjia">
          <seller :seller="seller"></seller>
        </van-tab>
      </van-tabs>
      </div>
      <cart v-if="active === 0" :seller="seller"/>
    </div>
</template>

<script>
import { getDetail } from '../../api/home.js'
import sellerHeader from './seller-header.vue'
import order from './order.vue'
import BScroll from 'better-scroll'
import cart from './cart.vue'
import comment from '../comment/index.vue'
import seller from '../seller/index.vue'
export default {
  data () {
    return {
      seller: {},
      active: 0,
      scrollBox: null
    }
  },
  methods: {
    async getStoreMsg () {
      const { data: res } = await getDetail({
        id: this.$route.params.id
      })
      this.seller = res
    }
  },
  created () {
    this.getStoreMsg()
  },
  components: {
    sellerHeader,
    order,
    cart,
    comment,
    seller
  },
  mounted () {
    this.$nextTick(() => {
      this.scrollBox = new BScroll('.scrollBox', {
        bounce: false,
        click: true
      })
    })
  }
}
</script>

<style lang="scss" scoped>
.scrollBox {
  height: 100%;
}
</style>
