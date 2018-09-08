import axios from 'axios'
import iView from 'iview'
import { GET, POST, TOKEN_KEY } from '@/config'
import Cookies from 'js-cookie'
import router from '@/router'
import store from '@/store'

const REFRESH_PAGE_URL = 'https://' + process.env.VUE_APP_DOMAIN + '/#/login/refresh?return_to='
const MENU_API = '/admin/api/v1/authorization/users/menus'
const SINGLE_LOGIN_API = 'https://' + process.env.VUE_APP_DOMAIN + '/admin/api/v1/subsystems/cross'

const defaultHandleResponse = (response: any) => {

  return response
}

const defaultHandleError = async (e: any, headers: Object, method: String, url: String, data: Object, params: Object, loading: boolean) => {
  const status = e.response.status
  switch (status) {
    case 401:
      if (loading) {
        store.commit('ADDPROCESS')
      }
      const res: any = await axios({ method: POST, url: SINGLE_LOGIN_API, withCredentials: true }).catch(e => {
        if (e.response.status === 401) {
          if (params && params.routerPath) {
            window.location.href = REFRESH_PAGE_URL + encodeURIComponent(window.location.origin + '/#' + params.routerPath)
          } else {
            window.location.href = REFRESH_PAGE_URL + encodeURIComponent(window.location.href)
          }
        }
      })
      if (loading) {
        setTimeout(() => store.commit('REDUCEPROCESS'), 30)
      }
      if (res.status === 200) {
        Cookies.set(TOKEN_KEY, res.data)
        if (url !== MENU_API) {
          await store.dispatch('fetchUserInfo')
          await store.dispatch('fetchMenuList')
          if (params && params.routerPath) {
            if (!store.getters.menuRouter[params.routerPath.substring(1)]) {
              router.push({ path: '/nomenu', query: { return_to: params.routerPath, t: new Date().getTime() } })
              return null
            }
          } else {
            if (!store.getters.menuRouter[router.currentRoute.path.substring(1)]) {
              router.push({ path: '/nomenu', query: { return_to: router.currentRoute.path, t: new Date().getTime() } })
              return null
            }
          }
        }
        return restApi({ url, method, data, params, loading })
      }
      break
    case 400:
      if (e.response.data.resultMsg) {
        iView.Message.error(e.response.data.resultMsg)
      } else {
        iView.Message.error(JSON.stringify(e.response))
      }
      console.dir(e)
      break
    case 403:
      console.dir(e)
      router.push({ path: '/norole', query: { t: new Date().getTime() } })
      break
    case 404:
      console.dir(e)
      iView.Message.error('接口404了，问后端咋回事')
      break
    default:
      console.dir(e)
      iView.Message.error(e.toString())
  }
  return null
}

// 获取数据
export const restApi = ({
  url,
  method = GET,
  data = null,
  params = null,
  headers = {},
  auth = true,
  handleResponse = false,
  handleError = false,
  loading = true
}) => {

  if (loading) {
    store.commit('ADDPROCESS')
  }

  if (auth) {
    headers.token = Cookies.get(TOKEN_KEY)
  }

  return axios({
    headers,
    method,
    url,
    data,
    params
  }).then((response) => {

    if (loading) {
      setTimeout(() => store.commit('REDUCEPROCESS'), 30)
    }

    if (!handleResponse) {
      return defaultHandleResponse(response)
    } else if (_.isFunction(handleResponse)) {
      return handleResponse(response)
    }

    return response
  }).catch(async e => {

    if (loading) {
      setTimeout(() => store.commit('REDUCEPROCESS'), 30)
    }

    if (!handleError) {
      return defaultHandleError(e, headers, method, url, data, params, loading)
    } else if (_.isFunction(handleError)) {
      return handleError(e)
    }

    return e
  })
}
