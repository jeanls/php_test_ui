import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter);

const routes = [
    {
        path: '/',
        name: 'MainTemplate',
        component: () => import('../components/MainTemplate'),
        children: [
            {path: 'list', alias: '', name: 'List', component: () => import('../views/List')},
            {path: 'new', alias: '', name: 'New', component: () => import('../views/New')},
            {path: 'edit/:id', alias: '', name: 'Edit', component: () => import('../views/Edit')}
        ]
    }
];

const router = new VueRouter({
    mode: 'history',
    base: process.env.BASE_URL,
    routes
});

export default router
