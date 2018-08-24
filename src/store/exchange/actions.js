import axios from 'axios'
import errorsHelper from '../../helpers/errors'
import httpHelper from '../../helpers/http'
import router from '../../router/index'
import api from '../../api/exchange';

export const list = ({ commit }, requestParams) => {
    return new Promise((resolve, reject) => {
        commit('SET_PENDING')

        api.ExchangesList(requestParams).then(response => {
        /*axios.get(
            '/exchanges',
            {
                params: requestParams,
                headers: {
                    Authorization: 'Bearer ' + localStorage.getItem('token')
                }
            }
        ).then(response => {*/
            if (httpHelper.checkIsOkAnswerStatus(response.status)) {
                commit('GET_EXCHANGES_LIST_SUCCESS', response.data)
                resolve(response)
            } else {
                commit('GET_EXCHANGES_LIST_FAIL')
                reject(errorsHelper.getMessage(response))

                errorsHelper.goByStatusCode(response.status, router)
            }
        }, errors => {
            commit('GET_EXCHANGES_LIST_FAIL')
            reject(errors)

            errorsHelper.goByStatusCode(500, router)
        })
    })
}

export const commentModeration = ({commit}, exchange) => {
    return new Promise((resolve, reject) => {
        commit('SET_PENDING')

        axios.put(
            '/user/exchanges/' + exchange.id + '/moderation/',
            exchange,
            {
                headers: {
                    Authorization: 'Bearer ' + localStorage.getItem('token')
                }
            }
        ).then(response => {
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

export const getPdf = ({ commit }, userId) => {
    return new Promise((resolve, reject) => {
        commit('SET_PENDING')

        axios.get(
            '/payments/pdf/transactions/' + userId,
            {
                headers: {
                    Authorization: 'Bearer ' + localStorage.getItem('token')
                }
            }
        ).then(response => {
            if (httpHelper.checkIsOkAnswerStatus(response.status)) {
                commit('RESET_PENDING', response.data)
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

export const ExchangeFromList = ({ commit }, requestParams) => {
    return new Promise((resolve, reject) => {
        commit('SET_PENDING')

        api.ExchangeFrom(requestParams).then(response => {
            if (httpHelper.checkIsOkAnswerStatus(response.status)) {
                commit('GET_EXCHANGE_FROM_LIST_SUCCESS', response.data);
                resolve(response);
            } else {
                commit('GET_EXCHANGE_FROM_LIST_FAIL');
                reject(errorsHelper.getMessage(response));

                errorsHelper.goByStatusCode(response.status, router);
            }
        }, errors => {
            commit('GET_EXCHANGE_FROM_LIST_FAIL');
            reject(errors);

            errorsHelper.goByStatusCode(500, router);
        })
    })
}
export const ExchangeToList = ({ commit }, requestParams) => {
    return new Promise((resolve, reject) => {
        commit('SET_PENDING')

        api.ExchangeTo(requestParams).then(response => {
            if (httpHelper.checkIsOkAnswerStatus(response.status)) {
                commit('GET_EXCHANGE_TO_LIST_SUCCESS', response.data);
                resolve(response);
            } else {
                commit('GET_EXCHANGE_TO_LIST_FAIL');
                reject(errorsHelper.getMessage(response));

                errorsHelper.goByStatusCode(response.status, router);
            }
        }, errors => {
            commit('GET_EXCHANGE_TO_LIST_FAIL');
            reject(errors);

            errorsHelper.goByStatusCode(500, router);
        })
    })
}

//http://api.smartex.info/api/user/exchanges/can?amount=100&currency=btc
//Route::post('/user/exchanges/can', 'ExchangeController@canExecuteCurrentUser');
export const ExchangeCan = ({ commit }, requestParams) => {
    return new Promise((resolve, reject) => {
        commit('SET_PENDING')

        api.ExchangeCan(requestParams).then(response => {
            if (httpHelper.checkIsOkAnswerStatus(response.status)) {
                commit('RESET_PENDING', response.data);
                resolve(response);
            } else {
                commit('RESET_PENDING');
                reject(errorsHelper.getMessage(response));

                errorsHelper.goByStatusCode(response.status, router);
            }
        }, errors => {
            commit('RESET_PENDING');
            reject(errors);

            errorsHelper.goByStatusCode(500, router);
        })
    })
}


/*
    http://api.smartex.info/api/exchanges/add
    POST{
        commission_id : 20,
        in_amount : 5,
        email : MazVasil@mail.ru,
        out_payee : bitcoin:3AXQXsbqE2L7fdy4qRuDVYCXFPK71XWDD3?label=Kraken
    }
    Route::post('/exchanges/add', 'ExchangeController@add');
    */
export const ExchangeAdd = ({ commit }, requestParams) => {
    return new Promise((resolve, reject) => {
        commit('SET_PENDING')

        api.ExchangeAdd(requestParams).then(response => {
            if (httpHelper.checkIsOkAnswerStatus(response.status)) {
                commit('RESET_PENDING', response.data);
                resolve(response);
            } else {
                commit('RESET_PENDING');
                reject(errorsHelper.getMessage(response));

                errorsHelper.goByStatusCode(response.status, router);
            }
        }, errors => {
            commit('RESET_PENDING');
            reject(errors);

            errorsHelper.goByStatusCode(500, router);
        })
    })
}

export const getExchangesByUser = ({ commit }, requestParams) => {
    return new Promise((resolve, reject) => {
        commit('SET_PENDING')

        api.getExchangesByUser(requestParams).then(response => {
            if (httpHelper.checkIsOkAnswerStatus(response.status)) {
                commit('GET_TRANSACTIONS_BY_USER_SUCCESS', response.data);
                resolve(response);
            } else {
                commit('GET_TRANSACTIONS_BY_USER_FAIL');
                reject(errorsHelper.getMessage(response));

//                errorsHelper.goByStatusCode(response.status, router);
            }
        }, errors => {
            commit('GET_TRANSACTIONS_BY_USER_FAIL');
            reject(errors);

//            errorsHelper.goByStatusCode(500, router);
        })
    })
}

export const getExchangeByHash = ({ commit }, transactionHash) => {
    return new Promise((resolve, reject) => {
        commit('SET_PENDING')

        api.getExchangeByHash(transactionHash).then(response => {
            if (httpHelper.checkIsOkAnswerStatus(response.status)) {
                commit('GET_EXCHANGE_BY_HASH_SUCCESS', response.data);
                resolve(response);
            } else {
                commit('GET_EXCHANGE_BY_HASH_FAIL');
                reject(errorsHelper.getMessage(response));

//                errorsHelper.goByStatusCode(response.status, router);
            }
        }, errors => {
            commit('GET_EXCHANGE_BY_HASH_FAIL');
            reject(errors);

//            errorsHelper.goByStatusCode(500, router);
        })
    })
}


export const getExchangeById = ({ commit }, ExchangeId) => {
    return new Promise((resolve, reject) => {
        commit('SET_PENDING')

        api.getExchangeById(ExchangeId).then(response => {
            if (httpHelper.checkIsOkAnswerStatus(response.status)) {
                commit('GET_EXCHANGE_BY_ID_SUCCESS', response.data);
                resolve(response);
            } else {
                commit('GET_EXCHANGE_BY_ID_FAIL');
                reject(errorsHelper.getMessage(response));

                errorsHelper.goByStatusCode(response.status, router);
            }
        }, errors => {
            commit('GET_EXCHANGE_BY_ID_FAIL');
            reject(errors);

                errorsHelper.goByStatusCode(500, router);
        })
    })
}

export const getSummary = ({ commit }, requestParams) => {
    return new Promise((resolve, reject) => {
        commit('SET_PENDING')
        
        api.ExchangesSummary(requestParams).then(response => {
            if (httpHelper.checkIsOkAnswerStatus(response.status)) {
                commit('GET_SUMMARY_SUCCESS', response.data);
                resolve(response);
            } else {
                commit('GET_SUMMARY_FAIL');
                reject(errorsHelper.getMessage(response));

//                errorsHelper.goByStatusCode(response.status, router);
            }
        }, errors => {
            commit('GET_SUMMARY_FAIL');
            reject(errors);

//                errorsHelper.goByStatusCode(500, router);
        })
    })
}

export const getLimits = ({ commit }, requestParams) => {
    return new Promise((resolve, reject) => {
        commit('SET_PENDING')
        
        api.ExchangesLimits(requestParams).then(response => {
            if (httpHelper.checkIsOkAnswerStatus(response.status)) {
                commit('GET_LIMIT_SUCCESS', response.data);
                resolve(response);
            } else {
                commit('GET_LIMIT_FAIL');
                reject(errorsHelper.getMessage(response));
            }
        }, errors => {
            commit('GET_LIMIT_FAIL');
            reject(errors);
        })
    })
}






