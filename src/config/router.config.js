// eslint-disable-next-line
import { UserLayout, BasicLayout } from '@/layout'

// const RouteView = {
//   name: 'RouteView',
//   render: h => h('router-view')
// }

export const asyncRouterMap = [
  {
    path: '*',
    redirect: '/404',
    hidden: true
  }
]

/**
 * 基础路由
 * @type { *[] }
 */
export const constantRouterMap = [
  {
    path: '/',
    hidden: true,
    redirect: '/weather/list',
    component: BasicLayout,
    children: [
      {
        name: 'weatherList',
        path: '/weather/list',
        meta: { title: '城市天气', keepAlive: true, icon: 'cloud-outlined' },
        component: () => import('@/views/weather/List')
      }
    ]
  },
  {
    path: '/404',
    hidden: true,
    component: () => import(/* webpackChunkName: "fail" */ '@/views/exception/404')
  },

  {
    path: '/500',
    hidden: true,
    component: () => import(/* webpackChunkName: "fail" */ '@/views/exception/500')
  }
]
