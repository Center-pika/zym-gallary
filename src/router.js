import Vue from 'vue'
import Router from 'vue-router'
import Gallary from '@/components/Gallary'
import About from '@/components/About'
import Secret from '@/components/Secret'

Vue.use(Router)

export default new Router({
    // mode: 'history',
    base: '/gallary',
    routes: [
        {
            path: '/',
            name: 'Gallary',
            component: Gallary,
            meta: {
                title: '启铭星博物馆'
            }
        },
        {
            path: '/about',
            name: 'About',
            component: About,
            meta: {
                title: '关于'
            }
        },
        {
            path: '/secret',
            name: 'Secret',
            component: Secret,
            meta: {
                title: '星空邮局投递箱',
                requiresAuth: true
            }
        }
    ]
})