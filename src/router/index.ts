import VueRouter, { RouteConfig } from 'vue-router';
import Vue from 'vue';
Vue.use(VueRouter);

const routes: Array<RouteConfig> = [
  {
    path: '/',
    component: () => import(/* webpackChunkName: "home" */ '@/views/Home.vue'),
  },
  {
    path: '/about',
    component: () => import(/* webpackChunkName: "About" */ '@/views/About.vue'),
  },
  {
    path: '/worker',
    component: () => import(/* webpackChunkName: "Worker" */ '@/views/Worker.vue'),
  },
  {
    path: '/serviceworker',
    component: () => import(/* webpackChunkName: "ServiceWorker" */ '@/views/ServiceWorker.vue'),
  },
];

export default new VueRouter({ mode: 'hash', routes });
