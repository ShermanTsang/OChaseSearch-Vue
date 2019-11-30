import VueRouter from 'vue-router'

import IndexPage from '@/pages/index'
import SearchPage from '@/pages/search'

const routes = [
  {
    path: '/',
    name: 'index',
    component: IndexPage,
    meta: {
      title: '首页'
    }
  },
  {
    path: '/s',
    name: 'search',
    component: SearchPage,
    meta: {
      titleArray: ['%keyword','搜索']
    }
  },
]

const router = new VueRouter({
  mode: 'history',
  routes
})

router.beforeEach((to, from, next) => {
  if (to.meta.title) {
    document.title = to.meta.title
  }
  if (to.meta.titleArray) {
    const attribute = { ...to.query,...to.params}
    const newTitleArray = to.meta.titleArray.map(textItem => {
      if(textItem.includes('%') && attribute.hasOwnProperty(textItem.substr(1))) {
        const attrText = attribute[textItem.substr(1)]
        const replaceText = attrText && attrText.length > 18 ? `${attrText.substring(0, 18)}...` : attrText
        return textItem.replace(textItem,replaceText)
      }
      return textItem
    })
    document.title = newTitleArray.join(' - ')
  }
  next()
})


export default router
