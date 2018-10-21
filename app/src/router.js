import Vue from 'vue';
import Router from 'vue-router';

import Home from './home/Home.vue';
import Discourse from './discourse/Discourse.vue';


Vue.use(Router);


const router = new Router({
    routes: [
        {
            path: '/',
            name: 'home',
            component: Home,
            children: [
                {
                    path: 'discourse/:id',
                    name: 'discourse',
                    component: Discourse,
                    children: []
                }
            ]
        }
    ]
});


export default router;
