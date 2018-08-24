import axios from 'axios'
import errorsHelper from '../../helpers/errors'
import httpHelper from '../../helpers/http'
import router from '../../router/index'
import api from '../../api/commission';

export const getById = ({ commit }, commissionId) => {
    return new Promise((resolve, reject) => {
        commit('SET_PENDING')

        api.getById(commissionId).then(response => {
        /*axios.get(
            '/commissions/' + commissionId,
            {
                headers: {
                    Authorization: 'Bearer ' + localStorage.getItem('token')
                }
            }
        ).then(response => {*/
            if (httpHelper.checkIsOkAnswerStatus(response.status)) {
                commit('GET_COMMISSION_BY_ID_SUCCESS', response.data)
                resolve(response)
            } else {
                commit('GET_COMMISSION_BY_ID_FAIL')
                reject(errorsHelper.getMessage(response))

                errorsHelper.goByStatusCode(response.status, router)
            }
        }, errors => {
            commit('GET_COMMISSION_BY_ID_FAIL')
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
            '/commissions',
            {
                params: requestParams,
                headers: {
                    Authorization: 'Bearer ' + localStorage.getItem('token')
                }
            }
        ).then(response => {*/
            if (httpHelper.checkIsOkAnswerStatus(response.status)) {
                commit('GET_COMMISSION_LIST_SUCCESS', response.data)
                resolve(response)
            } else {
                commit('GET_COMMISSION_LIST_FAIL')
                reject(errorsHelper.getMessage(response))

                errorsHelper.goByStatusCode(response.status, router)
            }
        }, errors => {
            commit('GET_COMMISSION_LIST_FAIL')
            reject(errors)

            errorsHelper.goByStatusCode(500, router)
        })
    })
}
export const pairList = ({commit}, requestParams) => {
    return new Promise((resolve, reject) => {
        commit('SET_PENDING')

        api.pairList(requestParams).then(response => {
            if (httpHelper.checkIsOkAnswerStatus(response.status)) {
                commit('GET_COMMISSION_LIST_SUCCESS', response.data)
                resolve(response)
            } else {
                commit('GET_COMMISSION_LIST_FAIL')
                reject(errorsHelper.getMessage(response))

//                errorsHelper.goByStatusCode(response.status, router)
            }
        }, errors => {
            commit('GET_COMMISSION_LIST_FAIL')
            reject(errors)

//            errorsHelper.goByStatusCode(500, router)
        })
    })
}

export const getFormMeta = ({commit}) => {
    return new Promise((resolve, reject) => {
        commit('SET_PENDING')

        api.getFormMeta().then(response => {
        /*axios.get(
            '/meta/commissions',
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

export const add = ({commit}, commission) => {
    return new Promise((resolve, reject) => {
        commit('SET_PENDING')

        api.add(commission).then(response => {
        /*axios.post(
            '/commissions',
            commission,
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

export const edit = ({commit}, commission) => {
    return new Promise((resolve, reject) => {
        commit('SET_PENDING')

        api.edit(commission).then(response => {
        /*axios.put(
            '/commissions/' + commission.id,
            commission,
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

export const remove = ({commit}, commissionId) => {
    return new Promise((resolve, reject) => {
        commit('SET_PENDING')

        api.delete(commission).then(response => {
        /*axios.delete(
            '/commissions/' + commissionId,
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
