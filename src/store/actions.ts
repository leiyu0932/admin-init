import iView from 'iview'
import model from '@/models'

export default {
  /**
   * 获取菜单
   */
  fetchMenuList ({ commit }) {
    return new Promise(async (resolve, reject) => {
      const response = await model.fetchPermissionsMenu()
      if (response) {
        if (response.data.isSuccess) {
          commit('FETCHMENULIST', response.data.data)
        } else {
          console.log(response.data.resultMsg)
          iView.Message.error(response.data.resultMsg)
        }
      }
      resolve()
    })
  },
  fetchUserInfo ({ commit }) {
    return new Promise(async (resolve, reject) => {
      const response = await model.restApi({ url: '/im/v1/users/me' })
      if (response) {
        if (response.data.isSuccess) {
          commit('FETCHUSERINFO', response.data.data)
        } else {
          console.log(response.data.resultMsg)
          iView.Message.error(response.data.resultMsg)
        }
      }
      resolve()
    })
  },
  fetchContacts ({ commit }) {
    return new Promise(async (resolve, reject) => {
      const response = await model.restApi({ url: '/im/v1/users' })
      if (response) {
        if (response.data.isSuccess) {
          commit('FETCHCONTACTS', response.data.data)
        } else {
          console.log(response.data.resultMsg)
          iView.Message.error(response.data.resultMsg)
        }
      }
      resolve()
    })
  }
}
