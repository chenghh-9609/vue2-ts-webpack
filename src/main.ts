import Vue from 'vue';
import App from './App.vue';
import './style.css';
import router from './router';
import ElementUI from '@/lib/element';
import "@/assets/css/element.scss";
Vue.use(ElementUI);
new Vue({ router, render: (h) => h(App) }).$mount('#app');
