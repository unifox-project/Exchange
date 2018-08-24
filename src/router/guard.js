import store from '../store/index';
import access from '../config/access';

export default (to, from, next) => {
    let jwtToken = localStorage.getItem('jwt_token');

    if (jwtToken !== null) {
        let jwtRole = JSON.parse(atob(localStorage.getItem('jwt_role')));
        let can = false;

        if (to.meta.role === undefined) {
            can = true;
        } else {
            Object.values(jwtRole).forEach(function(value, key, arr) {
                if (to.meta.role.indexOf(access.user) !== -1 || to.meta.role.indexOf(value.name) !== -1) {
                    can = true;
                }
            });
        }

        if (can) {
            next();
        } else {
            next({path: '/#modal-auth'});
        }
    } else if(localStorage.getItem('jwt_token')){
        store.dispatch('User/logout').then(() => {
            next({path: '/#modal-auth'});
        });
    } else {
        next({path: '/#modal-auth'});
    }
}