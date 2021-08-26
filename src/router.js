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
                title: '张月铭博物馆'
            }
        },
        {
            path: '/zym-gallary',
            name: 'Gallary2',
            component: Gallary,
            meta: {
                title: '张月铭博物馆'
            }
        },
        {
            path: '/home',
            name: 'Gallary3',
            component: Gallary,
            meta: {
                title: '张月铭博物馆'
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
                title: '月亮列车停靠站'
            }
        }
    ]
})