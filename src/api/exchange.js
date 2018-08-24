import http_config from './axios_config';

const HTTP = http_config.instance;
let headers;

export default {
    ExchangeFrom(requestParams) {
        return HTTP.get('/payment-systems/from', {params: requestParams});
    },
    ExchangeTo(requestParams) {
        return HTTP.get('/payment-systems/to', {params: requestParams});
    },
    ExchangeCan(requestParams) {
        if(localStorage.getItem('jwt_token')) headers = {
            Authorization: 'Bearer ' + localStorage.getItem('jwt_token')
        };
        return HTTP.post('/user/exchanges/can', requestParams, { headers: headers || null });
    },
    ExchangeAdd(requestParams) {
        if(localStorage.getItem('jwt_token')) headers = {
            Authorization: 'Bearer ' + localStorage.getItem('jwt_token')
        };
        return HTTP.post('/exchanges/add', requestParams, { headers: headers || null });
    },
    ExchangesList(requestParams) {
        if(localStorage.getItem('jwt_token')) headers = {
            Authorization: 'Bearer ' + localStorage.getItem('jwt_token')
        };
        return HTTP.get('/exchanges', {
            params: requestParams, 
            headers: headers || null
        });
    },
    ExchangesSummary(requestParams) {
        if(localStorage.getItem('jwt_token')) headers = {
            Authorization: 'Bearer ' + localStorage.getItem('jwt_token')
        };
        return HTTP.get('/exchanges/summary/', {
            params: requestParams,
            headers: headers || null
        });
    },
    ExchangesLimits(requestParams) {
        if(localStorage.getItem('jwt_token')) headers = {
            Authorization: 'Bearer ' + localStorage.getItem('jwt_token')
        };
        return HTTP.get('/exchanges/limits/', {
            params: requestParams,
            headers: headers || null
        });
    },
    getExchangesByUser(requestParams) {
        if(localStorage.getItem('jwt_token')) headers = {
            Authorization: 'Bearer ' + localStorage.getItem('jwt_token')
        };
        return HTTP.get('/user/exchanges/', {
            params: requestParams,
            headers: headers || null
        });
    },
    getExchangeById(ExchangeId) {
        if(localStorage.getItem('jwt_token')) headers = {
            Authorization: 'Bearer ' + localStorage.getItem('jwt_token')
        };
        return HTTP.get('/user/exchanges/' + ExchangeId, {
            headers: headers || null
        });
    },
    getExchangeByHash(ExchangeHash) {
        if(!localStorage.getItem('jwt_token')) return this.getExchangeByHashNoAuth(ExchangeHash);
        
        return HTTP.get('/user/exchanges/' + ExchangeHash, {
            headers: {
                Authorization: 'Bearer ' + localStorage.getItem('jwt_token')
            }
        });
    },
    getExchangeByHashNoAuth(ExchangeHash) {
        return HTTP.get('/user/not-auth/exchanges/' + ExchangeHash);
    },
}