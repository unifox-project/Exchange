// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import $ from 'jquery'
import Vue from 'vue';
import BootstrapVue from 'bootstrap-vue';
import VueResource from 'vue-resource';
import Vuetify from 'vuetify';
import { sync } from 'vuex-router-sync';
import Acl from 'vue-acl';
import App from './App.vue';
import router from './router';
import store from './store/index';
import VueMoment from 'vue-moment';
import moment from 'moment-timezone';
import VueTruncate from 'vue-truncate-filter';
import VueCurrencyFilter from 'vue-currency-filter';
import VueTelInput from 'vue-tel-input';
import VueScrollTo from 'vue-scrollto';

sync(store, router);

Vue.use(VueResource);
Vue.use(VueTruncate);
Vue.use(VueCurrencyFilter, {
    symbol : '',
    thousandsSeparator: " ",
    fractionCount: 0,
    fractionSeparator: ".",
    symbolPosition: 'front',
    symbolSpacing: true
});
Vue.use(BootstrapVue);
Vue.use(Vuetify);
Vue.use(VueTelInput);
Vue.use(VueScrollTo);

Vue.config.productionTip = false;

Vue.use(VueMoment, {
    moment,
});

import VueGtm from 'vue-gtm';
Vue.use(VueGtm, {
  enabled: true, // defaults to true. Plugin can be disabled by setting this to false for Ex: enabled: !!GDPR_Cookie (optional)
  debug: false, // Whether or not display console logs debugs (optional)
  vueRouter: router, // Pass the router instance to automatically sync with router (optional)
//  ignoredViews: ['homepage'] // If router, you can exclude some routes name (case insensitive) (optional)
});

import 'vuetify/dist/vuetify.min.css';
import 'bootstrap/dist/css/bootstrap.css';
import 'bootstrap-vue/dist/bootstrap-vue.css';
import 'vue-tel-input/dist/vue-tel-input.css';
import 'tiny-slider/dist/tiny-slider.css';

import  '../static/css/custom.css';

/* eslint-disable no-new */
new Vue({
    el: '#app',
    router,
    store,
    beforeMount: function () {
        this.$store.dispatch('User/resetPending')
        this.$store.dispatch('Payment/resetPending')
        this.$store.dispatch('Commission/resetPending')
        this.$store.dispatch('Course/resetPending')
        this.$store.dispatch('Exchange/resetPending')
        this.$store.dispatch('Log/resetPending')
        this.$store.dispatch('News/resetPending')
        this.$store.dispatch('Wallet/resetPending')
        this.$store.dispatch('Rates/resetPending')
        this.$store.dispatch('Contacts/resetPending')
    },
    render: h => h(App)
});

