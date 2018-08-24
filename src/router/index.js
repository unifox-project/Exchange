import Vue from 'vue';
import VueRouter from 'vue-router';

import routes from './routes';
import access from '../config/access';

Vue.use(VueRouter);

const Router = new VueRouter({
    /*
     * NOTE! Change Vue Router mode from quasar.conf.js -> build.env.VUE_ROUTER_MODE
     *
     * If you decide to go with "history" mode, please also set "build.publicPath"
     * to something other than an empty string.
     * Example: '/' instead of ''
     */

    // Leave as is and change from quasar.conf.js instead!
//    mode: process.env.VUE_ROUTER_MODE,
    //base: process.env.VUE_ROUTER_BASE,
    mode: 'history',
    scrollBehavior: () => ({ y: 0 }),
    can: function (routeMeta) {
        let storageRole = localStorage.getItem('role')
        let can = false
        if (storageRole) {
            let jwtRole = JSON.parse(atob(localStorage.getItem('role')))

            if (routeMeta.role === undefined) {
                can = true
            } else {
                Object.values(jwtRole).forEach(function (value, key, arr) {
                    if (routeMeta.role.indexOf(access.user) !== -1 || routeMeta.role.indexOf(value.name) !== -1) {
                        can = true
                    }
                })
            }
        }

        return can
    },
    routes
});

// This callback runs before every route change, including on page load.
Router.beforeEach((to, from, next) => {
    // This goes through the matched routes from last to first, finding the closest route with a title.
    // eg. if we have /some/deep/nested/route and /some, /deep, and /nested have titles, nested's will be chosen.
    const nearestWithTitle = to.matched.slice().reverse().find(r => r.meta && r.meta.title);

    // Find the nearest route element with meta tags.
    const nearestWithMeta = to.matched.slice().reverse().find(r => r.meta && r.meta.metaTags);
    const previousNearestWithMeta = from.matched.slice().reverse().find(r => r.meta && r.meta.metaTags);

    // If a route with a title was found, set the document (page) title to that value.
    if(nearestWithTitle) document.title = nearestWithTitle.meta.title;

    // Remove any stale meta tags from the document using the key attribute we set below.
    Array.from(document.querySelectorAll('[data-vue-router-controlled]')).map(el => el.parentNode.removeChild(el));

    // Skip rendering meta tags if there are none.
    if(!nearestWithMeta) return next();

    // Turn the meta tag definitions into actual elements in the head.
    nearestWithMeta.meta.metaTags.map(tagDef => {
      const tag = document.createElement('meta');

      Object.keys(tagDef).forEach(key => {
        tag.setAttribute(key, tagDef[key]);
      });

      // We use this to track which meta tags we create, so we don't interfere with other ones.
      tag.setAttribute('data-vue-router-controlled', '');

      return tag;
    })
    // Add the meta tags to the document head.
    .forEach(tag => document.head.appendChild(tag));

    next();
});

export default Router;