import http_config from './axios_config';

const HTTP = http_config.instance;

export default {
    getById(paymentId) {
        return HTTP.get('/payments/' + paymentId, {
            params: {
                include: 'user,paymentSystem'
            }, 
            headers: {
                Authorization: 'Bearer ' + localStorage.getItem('jwt_token')
            }
        });
    },
    confirm(paymentId) {
        return HTTP.put('/payments/' + paymentId + '/confirm', {}, 
        {
            headers: {
                Authorization: 'Bearer ' + localStorage.getItem('jwt_token')
            }
        });
    },
    confirmByUser(paymentId) {
        return HTTP.put('/user/exchanges/' + paymentId + '/income/confirm', {}, 
        {
            headers: {
                Authorization: 'Bearer ' + localStorage.getItem('jwt_token')
            }
        });
    },
}