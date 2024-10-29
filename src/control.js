import router from './router'
// import storage from 'store'
import NProgress from 'nprogress' // progress bar
import '@/components/NProgress/nprogress.less' // progress bar custom style
import { setDocumentTitle, domTitle } from '@/utils/title'
// import { ACCESS_TOKEN } from '@/store/mutation'

NProgress.configure({ showSpinner: false }) // NProgress Configuration

// const loginRoutePath = '/user/login'
// const defaultRoutePath = '/weather/list'

router.beforeEach((to, from, next) => {
  NProgress.start() // start progress bar
  to.meta && typeof to.meta.title !== 'undefined' && setDocumentTitle(`${to.meta.title} - ${domTitle}`)
  /* has token */
  // const token = storage.get(ACCESS_TOKEN)
  // if (token) {
  //   if (to.path === loginRoutePath) {
  //     next({ path: defaultRoutePath })
  //     NProgress.done()
  //   } else {
  //     next()
  //   }
  // } else {
  //   if (to.path === loginRoutePath) {
  //     // 在免登录名单，直接进入
  //     next()
  //   } else {
  //     next({ path: loginRoutePath, query: { redirect: to.fullPath } })
  //     NProgress.done() // if current page is login will not trigger afterEach hook, so manually handle it
  //   }
  // }
  next()
})

router.afterEach(() => {
  NProgress.done() // finish progress bar
})
