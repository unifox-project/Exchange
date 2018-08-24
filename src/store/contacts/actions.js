import axios from 'axios'
import errorsHelper from '../../helpers/errors'
import httpHelper from '../../helpers/http'
import router from '../../router/index'
import api from '../../api/contacts';

export const sendFeedback = ({ commit }, requestParams) => {
    return new Promise((resolve, reject) => {
        commit('SET_PENDING')

        api.sendFeedback(requestParams).then(response => {
            if (httpHelper.checkIsOkAnswerStatus(response.status)) {
                commit('GET_SEND_FEEDBACK_SUCCESS', response.data)
                resolve(response)
            } else {
                commit('GET_SEND_FEEDBACK_FAIL')
                reject(errorsHelper.getMessage(response))

//                errorsHelper.goByStatusCode(response.status, router)
            }
        }, errors => {
            commit('GET_SEND_FEEDBACK_FAIL')
            reject(errors)

//            errorsHelper.goByStatusCode(500, router)
        })
    })
}

export const resetPending = ({ commit }) => {
    commit('RESET_PENDING')
}






