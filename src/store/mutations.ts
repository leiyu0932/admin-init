export default {
  ['FETCHMENULIST'] (state: any, menuList: any) {
    state['menuList'] = menuList
  },
  ['FETCHPAGEDATA'] (state: any, pageData: any) {
    state['pageData'] = pageData
  },
  ['ADDPROCESS'] (state: any, num: any) {
    state['pendingLength']++
  },
  ['REDUCEPROCESS'] (state: any, num: any) {
    state['pendingLength']--
  },
  ['SETHANDLING'] (state: any, handling: any) {
    state['handling'] = handling
  },
  ['FETCHUSERINFO'] (state: any, user: any) {
    state['user'] = user
  },
  ['FETCHCONTACTS'] (state: any, contacts: any) {
    state['contacts'] = contacts
  }
}
