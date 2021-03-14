<template>
    <div class="list-box">
      <ul class="content">
        <li class="list" v-for="item in list" :key="item.id">
          <div class="img-box">
            <img :src="item.portrait">
          </div>
          <div class="info-box">
            <div class="basic">
              <span class="name">{{item.name}}</span>
              <span class="date">{{item.time}}</span>
            </div>
            <div class="time">{{item.duration}}分钟送达</div>
            <div class="desc">{{item.content}}</div>
          </div>
        </li>
      </ul>
    </div>
</template>

<script>
export default {
  data () {
    return {}
  },
  props: ['list']
}
</script>

<style lang="scss" scoped>
@import "@/assets/css/mixin.scss";
.list-box {
  @include border-top-1px(#e4e4e4);
  .content {
    padding: 0 0.3rem;
    .list {
      display: flex;
      padding: 0.3rem 0 0.2rem 0;
      .img-box {
        width: 0.8rem;
        flex: 0 0 0.8rem;
        margin-right: 0.2rem;
        img {
          width: 100%;
          border-radius: 50%;
        }
      }
      .info-box {
        flex: 1;
        min-width: 0;
        .basic {
          color: #2f2f2f;
          font-size: 0.32rem;
          .date {
            color: #898989;
            font-size: 0.24rem;
            float: right;
          }
        }
        .time {
          color: #666;
          font-size: 0.24rem;
          margin-top: 0.14rem;
        }
        .desc {
          color: #2f2f2f;
          line-height: 0.4rem;
          padding: 0.28rem 0 0.16rem 0;
        }
      }
    }
  }
}
</style>
