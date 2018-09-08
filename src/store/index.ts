import Vue from 'vue'
import Vuex from 'vuex'
import actions from './actions'
import mutations from './mutations'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    // 菜单树
    menuList: null,
    // 页面初始数据
    pageData: null,
    // 列表页面每页显示数据量
    pageSize: 10,
    // 在ajax pending的数量
    pendingLength: 0,
    // 是否在处理信息中
    handling: false,
    // 联系人
    contacts: null,
    // 用户信息
    user: null
  },
  getters: {
    // 根据菜单树得到菜单对象
    menuRouter: (state: any) => {
      const router: any = {}
      const list = state.menuList
      if (list) {
        list.forEach((item: any) => {
          if (item.children && item.children.length > 0) {
            item.children.forEach((childItem: any) => {
              router[childItem.enName] = item.enName
            })
          } else {
            router[item.enName] = item.enName
          }
        })
        return router
      }
      return null
    }
  },
  actions,
  mutations
})
