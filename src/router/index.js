import Vue from 'vue';
import Router from 'vue-router';

import article from '@/components/article';
import user from '@/components/user';
import main from '@/components/main';

Vue.use(Router);

export default new Router({
    routes: [{
        path: '/',
        name: 'RootPath',
        components: {
            main: main,
        },
    }, {
        path: '/topic/:id',
        name: 'articleRoute',
        components: {
            main: article,
        },
    }, {
        path: '/user/:userName',
        name: 'userRoute',
        components: {
            main: user,
        },
    }],
});
