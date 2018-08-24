import http_config from './axios_config';

const HTTP = http_config.instance;

export default {
    sendFeedback(data) {
        let headers = {
            Authorization: 'Bearer ' + localStorage.getItem('jwt_token')
        };

        return HTTP.post('/sendFeedback/', data, {headers: headers});
    },
}