<template>
    <div>
        <div class="order-box">
            <div class="menu-box" ref="menuBox">
                <ul>
                    <li class="menu-list" :class="{'active':currentindex === index}" v-for="(item, index) in prodList" :key="index" @click="changeMenu(index)">{{item.name}}</li>
                </ul>
            </div>
            <div class="prod-box" ref="prodBox">
                <ul>
                    <li class="cate-list" v-for="(item, typeIndex) in prodList" :key="typeIndex">
                        <div class="cate-title">{{item.name}}</div>
                        <ul>
                            <li class="prod-list" v-for="(item1, index) in item.content" :key="item1.id">
                                <div class="prod-img-box">
                                    <img :src="item1.img">
                                </div>
                                <div class="prod-info">
                                    <div class="prod-name">{{item1.name}}</div>
                                    <div class="prod-sale">
                                        <span class="num">{{item1.num}}</span>
                                        <span>赞 {{item1.nav_id}}</span>
                                    </div>
                                    <div class="prod-price">￥{{item1.price}}</div>
                                </div>
                                <div class="add-cart-container">
                                  <addCart :type="typeIndex" :index="index"></addCart>
                                </div>
                            </li>
                        </ul>
                    </li>
                </ul>
            </div>
        </div>
    </div>
</template>

<script>
import { mapState } from 'vuex'
import BScroll from 'better-scroll'
import addCart from '../../components/add-cart/index.vue'
export default {
  data () {
    return {
      menuScroll: null,
      prodScroll: null,
      currentindex: 0,
      posY: [],
      scrollY: 0,
      menuList: []
    }
  },
  methods: {
    initScroll () {
      this.menuScroll = new BScroll('.menu-box', {
        bounce: false
      })
      this.prodScroll = new BScroll('.prod-box', {
        bounce: false,
        click: true,
        probeType: 3
      })
      this.getPosY()
      this.menuList = this.$refs.menuBox.getElementsByClassName('menu-list')
      this.prodScroll.on('scroll', e => {
        this.scrollY = Math.abs((Math.round(e.y)))
      })
    },
    changeMenu (index) {
      this.currentindex = index
      const prodList = this.$refs.prodBox.getElementsByClassName('cate-list')
      const el = prodList[index]
      this.prodScroll.scrollToElement(el, 300)
    },
    getPosY () {
      const prodList = this.$refs.prodBox.getElementsByClassName('cate-list')
      let y = 0
      for (let i = 0; i < prodList.length; i++) {
        if (i === 0) {
          this.posY.push(y)
        } else {
          const prevEle = prodList[i - 1]
          y += prevEle.offsetHeight
          this.posY.push(y)
        }
      }
    }
  },
  async created () {
    await this.$store.dispatch('product/getNav', this.$route.params.id)
    this.$nextTick(() => {
      this.initScroll()
    })
  },
  computed: {
    ...mapState('product', ['prodList'])
  },
  watch: {
    scrollY (val) {
      for (let i = 0; i < this.posY.length; i++) {
        const pos1 = this.posY[i]
        const pos2 = this.posY[i + 1]
        if (pos1 <= val && pos2 > val) {
          this.menuScroll.scrollToElement(this.menuList[i], 300, 0, -100)
          this.currentindex = i
          break
        }
      }
    }
  },
  components: {
    addCart
  }
}
</script>

<style lang="scss" scoped>
.order-box {
    display: flex;
    height: calc(100vh - 44px);
    .menu-box {
        width: 1.6rem;
        height: calc(100vh - 94px);
        flex: 0 0 1.6rem;
        background: #f5f5f5;
        overflow: hidden;
        .menu-list {
            color: #2c3e50;
            font-size: 0.26rem;
            padding: 0.18rem 0.24rem 0.44rem;
            line-height: 0.36rem;
            &.active {
                color: #f00;
            }
        }
    }
    .prod-box {
        flex: 1;
        min-width: 0;
        height: calc(100vh - 94px);
        background: #fff;
        overflow: hidden;
        .cate-list {
            padding: 0 0.2rem;
            .cate-title {
                height: 0.72rem;
                line-height: 0.72rem;
            }
            .prod-list {
                position: relative;
                display: flex;
                margin-bottom: 0.4rem;
                .prod-img-box {
                    width: 1.5rem;
                    flex: 0 0 1.5rem;
                    margin-right: 0.15rem;
                    img {
                        width: 100%;
                    }
                }
                .prod-info {
                    flex: 1;
                    min-width: 0;
                    .prod-name {
                        font-size: 0.32rem;
                        color: #333;
                        font-weight: bold;
                        overflow: hidden;
                        text-overflow: ellipsis;
                        white-space: nowrap;
                        margin-bottom: 0.04rem;
                    }
                    .prod-sale {
                        color: #666;
                        font-size: 11px;
                        margin-bottom: 0.06rem;
                        .num {
                            margin-right: 0.2rem;
                        }
                    }
                    .prod-price {
                        color: #fb4e44;
                        font-size: 0.36rem;
                    }
                }
                .add-cart-container {
                  position: absolute;
                  right: 0;
                  bottom: 0;
                }
            }
        }
    }
}
</style>
