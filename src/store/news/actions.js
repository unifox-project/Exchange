import axios from 'axios';
import errorsHelper from '../../helpers/errors';
import httpHelper from '../../helpers/http';
import router from '../../router/index';
import api from '../../api/news';

export const getFormMeta = ({commit}) => {
    return new Promise((resolve, reject) => {
        commit('SET_PENDING')

        api.getFormMeta().then(response => {
        /*axios.get(
            '/meta/news',
            {
                headers: {
                    Authorization: 'Bearer ' + localStorage.getItem('token')
                }
            }
        ).then(response => {*/
            if (httpHelper.checkIsOkAnswerStatus(response.status)) {
                commit('GET_META_SUCCESS', response.data)
                resolve(response)
            } else {
                commit('GET_META_FAIL')
                reject(errorsHelper.getMessage(response))

                errorsHelper.goByStatusCode(response.status, router)
            }
        }, errors => {
            commit('GET_META_FAIL')
            reject(errors)

            errorsHelper.goByStatusCode(500, router)
        })
    })
}

export const getById = ({ commit }, newsId) => {
    return new Promise((resolve, reject) => {
        commit('SET_PENDING')
        api.getById(newsId).then(response => {
        /*axios.get(
            '/news/' + newsId,
            {
                headers: {
                    Authorization: 'Bearer ' + localStorage.getItem('token')
                }
            }
        ).then(response => {*/
            if (httpHelper.checkIsOkAnswerStatus(response.status)) {
                commit('GET_NEWS_BY_ID_SUCCESS', response.data)
                resolve(response)
            } else {
                commit('GET_NEWS_BY_ID_FAIL')
                reject(errorsHelper.getMessage(response))

                errorsHelper.goByStatusCode(response.status, router)
            }
        }, errors => {
            commit('GET_NEWS_BY_ID_FAIL')
            reject(errors)

            errorsHelper.goByStatusCode(500, router)
        })
    })
}

export const list = ({commit}, requestParams) => {
    return new Promise((resolve, reject) => {
        commit('SET_PENDING')

        api.list(requestParams).then(response => {
        /*axios.get(
            '/news',
            {
                params: requestParams,
                headers: {
                    Authorization: 'Bearer ' + localStorage.getItem('token')
                }
            }
        ).then(response => {*/
            if (httpHelper.checkIsOkAnswerStatus(response.status)) {
                commit('GET_NEWS_LIST_SUCCESS', response.data)
                resolve(response)
            } else {
                commit('GET_NEWS_LIST_FAIL')
                reject(errorsHelper.getMessage(response))

                errorsHelper.goByStatusCode(response.status, router)
            }
        }, errors => {
            commit('GET_NEWS_LIST_FAIL')
            reject(errors)

            errorsHelper.goByStatusCode(500, router)
        })
    })
}

export const add = ({commit}, news) => {
    return new Promise((resolve, reject) => {
        commit('SET_PENDING')

        api.add(news).then(response => {
        /*axios.post(
            '/news',
            news,
            {
                headers: {
                    Authorization: 'Bearer ' + localStorage.getItem('token')
                }
            }
        ).then(response => {*/
            if (httpHelper.checkIsOkAnswerStatus(response.status)) {
                commit('RESET_PENDING')
                resolve(response)
            } else {
                commit('RESET_PENDING')
                reject(errorsHelper.getMessage(response))

                errorsHelper.goByStatusCode(response.status, router)
            }
        }, errors => {
            commit('RESET_PENDING')
            reject(errors)

            errorsHelper.goByStatusCode(500, router)
        })
    })
}

export const edit = ({commit}, news) => {
    return new Promise((resolve, reject) => {
        commit('SET_PENDING')

        api.edit(news).then(response => {
        /*axios.put(
            '/news/' + news.id,
            news,
            {
                headers: {
                    Authorization: 'Bearer ' + localStorage.getItem('token')
                }
            }
        ).then(response => {*/
            if (httpHelper.checkIsOkAnswerStatus(response.status)) {
                commit('RESET_PENDING')
                resolve(response)
            } else {
                commit('RESET_PENDING')
                reject(errorsHelper.getMessage(response))

                errorsHelper.goByStatusCode(response.status, router)
            }
        }, errors => {
            commit('RESET_PENDING')
            reject(errors)

            errorsHelper.goByStatusCode(500, router)
        })
    })
}

export const remove = ({commit}, newsId) => {
    return new Promise((resolve, reject) => {
        commit('SET_PENDING')

        api.delete(newsId).then(response => {
        /*axios.delete(
            '/news/' + newsId,
            {
                headers: {
                    Authorization: 'Bearer ' + localStorage.getItem('token')
                }
            }
        ).then(response => {*/
            if (httpHelper.checkIsOkAnswerStatus(response.status)) {
                commit('RESET_PENDING')
                resolve(response)
            } else {
                commit('RESET_PENDING')
                reject(errorsHelper.getMessage(response))

                errorsHelper.goByStatusCode(response.status, router)
            }
        }, errors => {
            commit('RESET_PENDING')
            reject(errors)

            errorsHelper.goByStatusCode(500, router)
        })
    })
}

export const resetPending = ({ commit }) => {
    commit('RESET_PENDING')
}
