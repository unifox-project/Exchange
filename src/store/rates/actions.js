import axios from 'axios'
import errorsHelper from '../../helpers/errors'
import httpHelper from '../../helpers/http'
import router from '../../router/index'
import api from '../../api/main';

export const periodStatistics = ({ commit }, period) => {
    return new Promise((resolve, reject) => {
        commit('SET_PENDING')

        api.PeriodStatistics('BTC','CZK').then(response => {
            if (httpHelper.checkIsOkAnswerStatus(response.status)) {
                commit('GET_PERIOD_STATISTICS_SUCCESS', response.data)
                resolve(response)
            } else {
                commit('GET_PERIOD_STATISTICS_FAIL')
                reject(errorsHelper.getMessage(response))

//                errorsHelper.goByStatusCode(response.status, router)
            }
        }, errors => {
            commit('GET_PERIOD_STATISTICS_FAIL')
            reject(errors)

//            errorsHelper.goByStatusCode(500, router)
        })
    })
}

export const resetPending = ({ commit }) => {
    commit('RESET_PENDING')
}






