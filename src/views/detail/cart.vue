<template>
  <div>
    <div class="cart-container">
        <div class="cart-box" @click="isShow = !isShow">
            <div class="cart-icon" :class="{'active': total > 0}">
                <span class="iconfont icon-gouwuche1"></span>
                <span class="num" v-show="total">{{total}}</span>
            </div>
            <div class="cart-price" :class="{'active': total > 0}">
                <div class="price">￥{{totalPrice}}</div>
                <div class="deliver">另需配送费￥{{seller.fee}}</div>
            </div>
            <div class="cart-buy" :class="{'active': seller.price < totalPrice}">{{buyDesc}}</div>
        </div>
        <div class="ball-box">
            <div v-for="(item, index) in ballList" :key="index">
                <transition @before-enter="beforeEnter" @enter="enter" @after-enter="afterEnter">
                    <div class="ball" v-show="item.show">
                        <div class="inner"></div>
                    </div>
                </transition>
            </div>
        </div>
        <transition name="fade">
          <div class="cartlist-box" v-show="isShow && total > 0">
          <div class="title"><span @click="clearCart()">清空购物车</span></div>
          <ul class="list-box">
            <li class="list" v-for="(item, index) in selectList" :key="index">
              <span class="name">{{item.name}}</span>
              <span class="price">￥{{item.price}}</span>
              <addCart :type="item.type" :index="item.index"></addCart>
            </li>
          </ul>
          </div>
        </transition>
    </div>
    <div class="mask" v-show="isShow && total > 0" @click="isShow = !isShow"></div>
  </div>
</template>

<script>
import { mapGetters, mapState } from 'vuex'
import addCart from '../../components/add-cart/index.vue'
export default {
  data () {
    return {
      isShow: false
    }
  },
  computed: {
    ...mapGetters('product', ['total', 'totalPrice', 'selectList']),
    buyDesc () {
      if (this.totalPrice === 0) {
        return `￥${this.seller.price}元起送`
      } else if (this.totalPrice < this.seller.price) {
        return `还差￥${this.seller.price - this.totalPrice}元起送`
      } else {
        return '去结算'
      }
    },
    ...mapState('ball', ['ballList'])
  },
  props: ['seller'],
  methods: {
    beforeEnter (el) {
      for (let i = 0; i < this.ballList.length; i++) {
        const ball = this.ballList[i]
        if (ball.show) {
          const pos = ball.el.getBoundingClientRect()
          const x = pos.left - 30
          const y = window.innerHeight - pos.top - 23
          el.style.display = ''
          el.style.transform = `translate3d(0, ${-y}px, 0)`
          const inner = el.getElementsByClassName('inner')[0]
          inner.style.transform = `translate3d(${x}px, 0, 0)`
        }
      }
    },
    enter (el, done) {
      const a = el.offsetWidth
      console.log(a)
      this.$nextTick(() => {
        el.style.transform = 'translate3d(0, 0, 0)'
        const inner = el.getElementsByClassName('inner')[0]
        inner.style.transform = 'translate3d(0, 0, 0)'
        el.addEventListener('transitionend', done)
      })
    },
    afterEnter (el) {
      el.style.display = 'none'
      this.$store.commit('ball/removeBall')
    },
    clearCart () {
      this.$store.commit('product/clearCart')
    }
  },
  components: {
    addCart
  }
}
</script>

<style lang="scss" scoped>
.cart-container {
    position: fixed;
    left: 0;
    bottom: 0;
    width: 100%;
    height: 50px;
    background-color: #3b3b3c;
    z-index: 80;
    .cart-box {
        display: flex;
        .cart-icon {
            width: 50px;
            height: 50px;
            position: absolute;
            top: -10px;
            left: 10px;
            background-color: #3b3b3c;
            border-radius: 50%;
            text-align: center;
            line-height: 50px;
            .num {
                position: absolute;
                right: 0;
                top: 0;
                width: 30px;
                height: 30px;
                line-height: 30px;
                text-align: center;
                background-color: #fb4e44;
                color: #fff;
                border-radius: 50%;
                transform: scale(0.5) translate(50%,-50%);
            }
            .icon-gouwuche1 {
                font-size: 28px;
                color: #c4c4c4;
            }
            &.active {
                background-color: #f8c74e;
                .icon-gouwuche1 {
                    color: #333;
                }
            }
        }
        .cart-price {
            padding-left: 70px;
            flex: 1;
            color: #999;
            background-color: #3b3b3c;
            .price {
                display: none;
            }
            .deliver {
                line-height: 50px;
                font-size: 14px;
            }
            &.active {
                .price {
                    display: block;
                    color: #fff;
                    line-height: 33px;
                    font-size: 24px;
                }
                .deliver {
                    line-height: 16px;
                    font-size: 11px;
                }
            }
        }
        .cart-buy {
            width: 108px;
            color: #999;
            font-size: 14px;
            font-weight: bold;
            text-align: center;
            line-height: 50px;
            background-color: #3b3b3c;
            &.active {
                background-color: #f8c74e;
                color: #333;
                font-size: 18px;
                font-weight: normal;
            }
        }
    }
    .ball {
        position: fixed;
        left: 30px;
        bottom: 23px;
        transition: all 0.4s cubic-bezier(0.48, -0.28, 0.73, 0.42);
        .inner {
            width: 16px;
            height: 16px;
            background-color: #00a0dc;
            border-radius: 50%;
            transition: all 0.4s linear;
        }
    }
    .cartlist-box {
      position: absolute;
      bottom: 50px;
      left: 0;
      width: 100%;
      z-index: -1;
      background: #fff;
      .title {
        height: 30px;
        line-height: 30px;
        padding: 0 10px;
        text-align: right;
        font-size: 12px;
        background: #f4f4f4;
        color: #2c3e50;
      }
      .list-box {
        padding: 0 10px;
      }
      .list {
        padding: 14px 0;
        border-bottom: 1px solid #e4e4e4;
        display: flex;
        .name {
          flex: 1;
          min-width: 0;
          overflow: hidden;
          text-overflow: ellipsis;
          white-space: nowrap;
        }
        .price {
          color: #fb4e44;
          padding: 0 25px;
        }
      }
    }
    .fade-enter {
      transform: translateY(100%);
    }
    .fade-enter-active {
      transition: transform ease 200ms;
    }
    .fade-enter-to {
      transform: translateY(0);
    }
}
.mask {
  position: fixed;
  left: 0;
  top: 0;
  bottom: 0;
  right: 0;
  background-color: rgba(7, 17, 27, 0.6);
  backdrop-filter: blur(10px);
  z-index: 50;
}
</style>
