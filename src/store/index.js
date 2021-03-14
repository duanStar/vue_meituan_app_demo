import Vue from 'vue'
import Vuex from 'vuex'
import product from './product.js'
import ball from './ball.js'

Vue.use(Vuex)

export default new Vuex.Store({
  modules: {
    product,
    ball
  }
})
