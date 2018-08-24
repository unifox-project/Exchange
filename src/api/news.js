import http_config from './axios_config';

const HTTP = http_config.instance;

export default {
    getFormMeta(newsId) {
        let headers = {
            Authorization: 'Bearer ' + localStorage.getItem('jwt_token')
        };

        return HTTP.get('/meta/news', {headers: headers});
    },
    getById(newsId) {
        let headers = {
            Authorization: 'Bearer ' + localStorage.getItem('jwt_token')
        };

        return HTTP.get('/news/show/' + newsId, {headers: headers});
    },
    list(requestParams) {
//        let headers = {
//            Authorization: 'Bearer ' + localStorage.getItem('jwt_token')
//        };

        return HTTP.get('news/view', {params: requestParams});
    },
    add(news) {
        let headers = {
            Authorization: 'Bearer ' + localStorage.getItem('jwt_token')
        };

        return HTTP.post('/news', news, {headers: headers});
    },
    edit(news) {
        let headers = {
            Authorization: 'Bearer ' + localStorage.getItem('jwt_token')
        };

        return HTTP.put('/news/' + news.id, news, {headers: headers});
    },
    delete(newsId) {
        let headers = {
            Authorization: 'Bearer ' + localStorage.getItem('jwt_token')
        };

        return HTTP.delete('/news/' + newsId, {headers: headers});
    }
}