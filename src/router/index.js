import VueRouter from 'vue-router'

import IndexPage from '@/pages/index'

const routes = [
    { path: '/', component: IndexPage },
]

const router = new VueRouter({
    mode: 'history',
    routes
})

export default router
