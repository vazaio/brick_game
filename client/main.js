import Vue from 'vue'
import VueRouter from 'vue-router'

import App from './App'
import Snake from './components/Snake'
import Cars from './components/Cars'
import About from './components/About'
import Score from './components/Score.vue'

Vue.use(VueRouter);

const router = new VueRouter({
	routes: [
        {
            name: 'about',
            path: '/',
            component: About
        },
		{
			name: 'snake',
			path: '/snake/:w/:h/:ax/:ay/:s/:d',
			component: Snake,
			props: true
		}, 
		{
			name: 'cars',
			path: '/cars/:w/:h/:ax/:ay/:s/:d',
			component: Cars,
			props: true
        },
        {
			name: 'score',
			path: '/cars/:s/:c',
            component: Score,
            props: true
		}
	],
	mode: 'history'
})

new Vue({
	el: '#app',
	render: h=>h(App),
	router
})