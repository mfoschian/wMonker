import Vue from 'vue'
import VueRouter from 'vue-router'
import AddPage from '../pages/new-item.vue'
import ListPage from '../pages/main-list.vue'

Vue.use(VueRouter)

const routes = [
	{
		path: '/',
		name: 'Main',
		component: AddPage
	},
	{
		path: '/list',
		name: 'List',
		// route level code-splitting
		// this generates a separate chunk (about.[hash].js) for this route
		// which is lazy-loaded when the route is visited.
		// component: () => import(/* webpackChunkName: "about" */ '../pages/main-list.vue')
		component: ListPage
	}
]

const router = new VueRouter({
	routes
})

export default router
