<template>
    <div class="commentBox" ref="commentBox">
        <div>
          <score :comment="comment"></score>
        <div class="tag-container">
          <tag :label="comment.label" :currentType="type" @changeType="change($event)"></tag>
        </div>
        <list :list="comment.rate"></list>
        </div>
    </div>
</template>

<script>
import score from './score.vue'
import tag from './tag.vue'
import list from './list.vue'
import { getComment } from '../../api/home.js'
import BScroll from 'better-scroll'
export default {
  data () {
    return {
      // 标签id
      type: 1,
      label: {},
      comment: {},
      scrollBox: null
    }
  },
  components: {
    score,
    tag,
    list
  },
  methods: {
    async getData () {
      const { data: res } = await getComment({
        id: this.$route.params.id,
        type: this.type
      })
      this.comment = res
    },
    change (id) {
      this.type = id
      this.getData()
    }
  },
  async created () {
    await this.getData()
    this.$nextTick(() => {
      this.scrollBox = new BScroll('.commentBox', {
        bounce: false,
        click: true
      })
    })
  }
}
</script>

<style lang="scss" scoped>
.tag-container {
  border-top: 0.2rem solid #f4f4f4;
}
.commentBox {
  height: calc(100vh - 44px);
}
</style>
