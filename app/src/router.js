import Vue from 'vue';
import Router from 'vue-router';

import Home from './home/Home.vue';
import Debate from './debate/Debate.vue';


Vue.use(Router);


const router = new Router({
    routes: [
        {
            path: '/',
            name: 'home',
            component: Home,
            children: [
                {
                    path: 'debate',
                    name: 'debate',
                    component: Debate,
                    children: []
                }
            ]
        }
    ]
});


export default router;
