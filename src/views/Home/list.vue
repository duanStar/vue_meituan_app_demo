<template>
    <div>
        <van-list
            v-model="loading"
            :finished="finished"
            finished-text="没有更多了"
            @load="onLoad">
        <ul class="list-container">
            <li class="shop-list" v-for="item in shopList" :key="item.id" @click="goDetail(item.id)">
                <div class="img-box">
                    <img :src="item.img">
                </div>
                <div class="info-box">
                    <div class="title">{{item.name}}</div>
                    <div class="rate-box">
                        <div>
                            <star :score='item.score' />
                            <span class="rate">{{item.score}}分</span>
                            <span>月销{{item.num}}</span>
                        </div>
                        <div>
                            <span>{{item.minute}}分钟</span>
                            <span class="left-line">{{item.distance}}</span>
                        </div>
                    </div>
                    <div class="distribution-box">
                        <span>起送{{item.per_capita}}</span>
                        <span class="left-line">配送{{item.fee}}</span>
                        <span class="left-line">人均{{item.price}}</span>
                    </div>
                </div>
            </li>
        </ul>
        </van-list>
    </div>
</template>

<script>
import star from '../../components/star/index.vue'
import { getStore } from '../../api/home.js'
export default {
  data () {
    return {
      shopList: [],
      queryInfo: {
        current: 0,
        size: 10
      },
      loading: false,
      finished: false,
      total: 0
    }
  },
  components: {
    star
  },
  methods: {
    async getData () {
      const { data: res } = await getStore(this.queryInfo)
      this.shopList = this.shopList.concat(res.list)
      this.loading = false
      this.queryInfo.current++
      this.total = res.total
      if (this.shopList.length >= res.total) {
        this.finished = true
      }
    },
    onLoad () {
      setTimeout(() => {
        this.getData()
      }, 1000)
    },
    goDetail (id) {
      this.$router.push('/detail/' + id)
    }
  }
}
</script>

<style lang="scss" scoped>
.list-container {
    padding: 0 0.2rem;
    .shop-list {
        display: flex;
        margin: 0.2rem 0 0.5rem;
        .img-box {
            width: 1.52rem;
            height: 1.14rem;
            margin-right: 0.16rem;
            img {
                width: 100%;
                height: 100%;
            }
        }
        .info-box {
            flex: 1;
            .title {
                font-size: 0.32rem;
                color: #333;
                line-height: 1.4;
                font-weight: 600;
            }
            .rate-box,.distribution-box {
                display: flex;
                color: #333;
                line-height: 1.4;
                font-family: mtsi-font;
                font-size: 11px;
                .rate {
                    margin-right: 0.2rem;
                }
                .left-line::before {
                    content: '';
                    display: inline-block;
                    width: 1px;
                    height: 6px;
                    background-color: #ccc;
                    margin: 0 3px;
                }
            }
            .rate-box {
                justify-content: space-between;
            }
        }
    }
}
</style>
