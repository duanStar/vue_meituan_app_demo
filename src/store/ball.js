import Vue from 'vue'
const ball = {
  namespaced: true,
  state: {
    ballList: [{
      show: false
    },
    {
      show: false
    },
    {
      show: false
    },
    {
      show: false
    },
    {
      show: false
    },
    {
      show: false
    }],
    runList: []
  },
  mutations: {
    show (state, el) {
      for (let i = 0; i < state.ballList.length; i++) {
        const ball = state.ballList[i]
        if (!ball.show) {
          Vue.set(ball, 'show', true)
          Vue.set(ball, 'el', el)
          state.runList.push(ball)
          break
        }
      }
    },
    removeBall (state) {
      const ball = state.runList.shift()
      if (ball) {
        Vue.set(ball, 'show', false)
      }
    }
  }
}
export default ball
