import Vue from 'vue';
import VueRouter from 'vue-router';
import Vuex from 'vuex';
import assert from 'assert';

require('~/plugins/firebase')
require('mdi/scss/materialdesignicons.scss')

Vue.use(Vuex)
Vue.use(VueRouter)

// Alias nuxt --> VueRouter
Vue.component('nuxt', Vue.component('router-view'))

const router = new VueRouter({
  routes: [
    { path: '/', component: require('~/pages/index.vue'), name: 'index' },
    { path: '/diaries/:id/:date?', component: require('~/pages/diaries/_id/_date.vue'), name: 'diaries-id-date' },
  ]
})

document.addEventListener('DOMContentLoaded', () =>  {
  const app = new Vue({
    el: '#root',
    router,
    render(h) {
      return h(
        require('../layouts/default.vue')
      )
    },
  })
})
