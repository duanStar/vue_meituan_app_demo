import { getNav } from '../api/home.js'
import Vue from 'vue'
const product = {
  namespaced: true,
  state: {
    prodList: []
  },
  actions: {
    async getNav ({ commit }, id) {
      const { data: res } = await getNav({
        id
      })
      console.log(res)
      res.goods.forEach((item, type) => {
        item.content.forEach((item1, index) => {
          item1.type = type
          item1.index = index
        })
      })
      commit('saveProdList', res.goods)
    }
  },
  mutations: {
    saveProdList (state, arr) {
      state.prodList = [...arr]
    },
    addCart (state, { type, index }) {
      const prod = state.prodList[type].content[index]
      if (prod.count) {
        Vue.set(prod, 'count', prod.count + 1)
      } else {
        Vue.set(prod, 'count', 1)
      }
    },
    reduceCart (state, { type, index }) {
      const prod = state.prodList[type].content[index]
      if (prod.count > 0) {
        Vue.set(prod, 'count', prod.count - 1)
      } else {
        Vue.set(prod, 'count', '')
      }
    },
    clearCart (state) {
      state.prodList.forEach(item => {
        item.content.forEach(item1 => {
          if (item1.count) {
            item1.count = 0
          }
        })
      })
    }
  },
  getters: {
    selectList (state) {
      const result = []
      state.prodList.forEach(item => {
        item.content.forEach(item1 => {
          if (item1.count) {
            result.push(item1)
          }
        })
      })
      return result
    },
    totalPrice (state, getter) {
      return getter.selectList.reduce((price, item) => price + item.count * item.price, 0)
    },
    total (state, getter) {
      return getter.selectList.reduce((total, item) => total + item.count, 0)
    }
  }
}

export default product
