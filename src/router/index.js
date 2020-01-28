import VueRouter from 'vue-router'

const IndexPage = () => import( '@/pages/index')
const SearchPage = () => import( '@/pages/search')
const TestPage = () => import('@/pages/test')

const routes = [
  {
    path: '/',
    name: 'index',
    component: IndexPage,
    meta: {
      titleArray: ['逐搜搜索']
    }
  },
  {
    path: '/s',
    name: 'search',
    component: SearchPage,
    meta: {
      titleArray: ['%keyword', '逐搜搜索']
    }
  },
  {
    path: '/test',
    name: 'test',
    component: TestPage,
    meta: {
      title: '测试'
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
    const attribute = {...to.query, ...to.params}
    const newTitleArray = to.meta.titleArray.map(textItem => {
      if (textItem.includes('%') && attribute.hasOwnProperty(textItem.substr(1))) {
        const attrText = attribute[textItem.substr(1)]
        const replaceText = (attrText && attrText.length > 18) ? `${attrText.substring(0, 18)}...` : attrText
        return attrText ? textItem.replace(textItem, replaceText) : ''
      }
      return textItem
    })
    document.title = newTitleArray.filter(item => {
      return !item.includes('%')
    }).join(' - ')
  }
  next()
})


export default router
