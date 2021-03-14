<template>
    <div class="tag-box">
      <span @click="changeType(item.id)" class="tag-item" :class="{'active': item.id == currentType}" v-for="item in label" :key="item.id">{{item.name}}（{{item.count}}）</span>
    </div>
</template>

<script>
export default {
  data () {
    return {}
  },
  props: ['label', 'currentType'],
  methods: {
    changeType (id) {
      this.$emit('changeType', id)
    }
  }
}
</script>

<style lang="scss" scoped>
@import "@/assets/css/mixin.scss";
.tag-box {
  padding: 0.3rem 0.28rem 0.1rem;
  position: relative;
  .tag-item {
    padding: 0 0.24rem;
    text-align: center;
    display: inline-block;
    height: 0.52rem;
    line-height: 0.52rem;
    font-size: 0.26rem;
    color: #666;
    margin: 0 0.2rem 0.2rem 0;
    @include border-fix(#bbb, 0.52rem);
    &.active{
      background: #fffbf1;
    @include border-fix(#ffb000, 0.52rem);
    }
  }
}
</style>
