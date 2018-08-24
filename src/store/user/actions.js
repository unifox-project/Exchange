import axios from 'axios';
import errorsHelper from '../../helpers/errors';
import httpHelper from '../../helpers/http';
import router from '../../router/index';
import api from '../../api/user';

export const getById = ({ commit }, userId) => {
    return new Promise((resolve, reject) => {
        commit('SET_PENDING')

        axios.get(
            '/users/' + userId,
            {
                params: {include: 'roles'},
                headers: {
                    Authorization: 'Bearer ' + localStorage.getItem('token')
                }
            }
        ).then(response => {
            if (httpHelper.checkIsOkAnswerStatus(response.status)) {
                commit('GET_USER_BY_ID_SUCCESS', response.data)
                resolve(response)
            } else {
                commit('GET_USER_BY_ID_FAIL')
                reject(errorsHelper.getMessage(response))

                errorsHelper.goByStatusCode(response.status, router)
            }
        }, errors => {
            commit('GET_USER_BY_ID_FAIL')
            reject(errors)

            errorsHelper.goByStatusCode(500, router)
        })
    })
}

export const list = ({commit}, requestParams) => {
    return new Promise((resolve, reject) => {
        commit('SET_PENDING')

        axios.get(
            '/users',
            {
                params: requestParams,
                headers: {
                    Authorization: 'Bearer ' + localStorage.getItem('token')
                }
            }
        ).then(response => {
            if (httpHelper.checkIsOkAnswerStatus(response.status)) {
                commit('GET_USERS_LIST_SUCCESS', response.data)
                resolve(response)
            } else {
                commit('GET_USERS_LIST_FAIL')
                reject(errorsHelper.getMessage(response))

                errorsHelper.goByStatusCode(response.status, router)
            }
        }, errors => {
            commit('GET_USERS_LIST_FAIL')
            reject(errors)

            errorsHelper.goByStatusCode(500, router)
        })
    })
}

export const getFormMeta = ({commit}) => {
    return new Promise((resolve, reject) => {
        commit('SET_PENDING')

        axios.get(
            '/meta/users',
            {
                headers: {
                    Authorization: 'Bearer ' + localStorage.getItem('token')
                }
            }
        ).then(response => {
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

export const add = ({commit}, user) => {
    return new Promise((resolve, reject) => {
        commit('SET_PENDING')

        axios.post(
            '/users',
            user,
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

export const edit = ({commit}, user) => {
    return new Promise((resolve, reject) => {
        commit('SET_PENDING')

        axios.put(
            '/users/' + user.id,
            user,
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

export const remove = ({commit}, userId) => {
    return new Promise((resolve, reject) => {
        commit('SET_PENDING')

        axios.delete(
            '/users/' + userId,
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

export const login = ({ commit }, formData) => {
    return new Promise((resolve, reject) => {
        commit('SET_PENDING')

        api.login(formData).then(response => {
        /*axios.post(
            '/login',
            {
                email: formData.email,
                password: formData.password
            }
        ).then(response => {*/
            if (httpHelper.checkIsOkAnswerStatus(response.status)) {
                commit('LOGIN_SUCCESS', response.data)
                resolve(response)
            } else {
                commit('LOGIN_FAIL')
                reject(errorsHelper.getMessage(response))

                errorsHelper.goByStatusCode(response.status, router)
            }
        }, errors => {
            commit('LOGIN_FAIL')
            reject(errors)

            errorsHelper.goByStatusCode(500, router)
        })
    })
}

export const getProfile = ({ commit }, requestParams) => {
    return new Promise((resolve, reject) => {
        commit('SET_PENDING')

        api.getProfile(requestParams).then(response => {
        /*axios.get(
            '/me',
            {
                params: requestParams,
                headers: {
                    Authorization: 'Bearer ' + localStorage.getItem('token')
                }
            }
        ).then(response => {*/
            if (httpHelper.checkIsOkAnswerStatus(response.status)) {
                commit('GET_PROFILE_SUCCESS', response.data)
                resolve(response)
            } else {
                commit('GET_PROFILE_FAIL')
                reject(errorsHelper.getMessage(response))
                if(401===response.status) commit('LOGOUT')
                errorsHelper.goByStatusCode(response.status, router)
            }
        }, errors => {
            commit('GET_PROFILE_FAIL')
            commit('LOGOUT')
            reject(errors)

            errorsHelper.goByStatusCode(500, router)
        })
    })
}

export const updateProfile = ({ commit }, profile) => {
    return new Promise((resolve, reject) => {
        commit('SET_PENDING')

        api.updateProfile(profile).then(response => {
        /*axios.put(
            '/me',
            profile,
            {
                headers: {
                    Authorization: 'Bearer ' + localStorage.getItem('token')
                }
            }
        ).then(response => {*/
            if (httpHelper.checkIsOkAnswerStatus(response.status)) {
                commit('PROFILE_UPDATE_SUCCESS', response.data)
                resolve(response)
            } else {
                commit('RESET_PENDING')
                reject(errorsHelper.getMessage(response))
                if(401===response.status) commit('LOGOUT')
                errorsHelper.goByStatusCode(response.status, router)
            }
        }, errors => {
            commit('RESET_PENDING')
            reject(errors)

            errorsHelper.goByStatusCode(500, router)
        })
    })
}

export const resetPassword = ({ commit }, email) => {
    return new Promise((resolve, reject) => {
        commit('SET_PENDING')

        api.resetPassword(email).then(response => {
        /*axios.post(
            '/user/password/reset',
            {
                email: email
            }
        ).then(response => {*/
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
            commit('LOGOUT')
            reject(errors)

            errorsHelper.goByStatusCode(500, router)
        })
    })
}
export const checkResetPassword = ({ commit }, hash) => {
    return new Promise((resolve, reject) => {
        commit('SET_PENDING')

        api.checkResetPassword(hash).then(response => {
            if (httpHelper.checkIsOkAnswerStatus(response.status)) {
                commit('RESET_PENDING', response.data)
                resolve(response)
            } else {
                commit('RESET_PENDING')
                reject(errorsHelper.getMessage(response))
            }
        }, errors => {
            commit('RESET_PENDING')
            commit('LOGOUT')
            reject(errors)
        })
    })
}
export const confirmResetPassword = ({ commit }, formData) => {
    return new Promise((resolve, reject) => {
        commit('SET_PENDING')

        api.confirmResetPassword(formData).then(response => {
            if (httpHelper.checkIsOkAnswerStatus(response.status)) {
                commit('RESET_PENDING', response.data)
                resolve(response)
            } else {
                commit('RESET_PENDING')
                reject(errorsHelper.getMessage(response))
            }
        }, errors => {
            commit('RESET_PENDING')
            commit('LOGOUT')
            reject(errors)
        })
    })
}

export const logout = ({ commit }) => {
    return new Promise((resolve, reject) => {
        commit('SET_PENDING')
        
        api.logout().then(response => {
//        api.logout();
        /*axios.get(
            '/logout',
            {
                headers: {
                    Authorization: 'Bearer ' + localStorage.getItem('token')
                }
            }
        ).then(response => {*/
            if (httpHelper.checkIsOkAnswerStatus(response.status)) {
                commit('LOGOUT')
                resolve(response)
            } else {
                commit('RESET_PENDING')
                reject(errorsHelper.getMessage(response))
                if(401===response.status) commit('LOGOUT')
            }
        }, errors => {
            commit('RESET_PENDING')
            reject(errors)
        })
    })
}

export const resetPending = ({ commit }) => {
    commit('RESET_PENDING')
}



/* New methods */
export const register = ({ commit }, formData) => {
    return new Promise((resolve, reject) => {
        commit('SET_PENDING')

        api.register(formData).then(response => {
        /*axios.post(
            '/login',
            {
                email: formData.email,
                password: formData.password
            }
        ).then(response => {*/
            if (httpHelper.checkIsOkAnswerStatus(response.status)) {
                commit('REGISTER_SUCCESS', response.data)
                resolve(response)
            } else {
                commit('REGISTER_FAIL')
                reject(errorsHelper.getMessage(response))

                errorsHelper.goByStatusCode(response.status, router)
            }
        }, errors => {
            commit('REGISTER_FAIL')
            reject(errors)

            errorsHelper.goByStatusCode(500, router)
        })
    })
}
export const loginLogs = ({ commit }) => {
    return new Promise((resolve, reject) => {
        commit('SET_PENDING')

        api.loginLogs().then(response => {
            if (httpHelper.checkIsOkAnswerStatus(response.status)) {
                commit('LOGIN_LOGS_SUCCESS', response.data);
                resolve(response);
            } else {
                commit('LOGIN_LOGS_FAIL');
                reject(errorsHelper.getMessage(response));
                if(401===response.status) commit('LOGOUT')
                errorsHelper.goByStatusCode(response.status, router);
            }
        }, errors => {
            commit('LOGIN_LOGS_FAIL');
            reject(errors);

            errorsHelper.goByStatusCode(500, router);
        })
    })
}
export const tokenRevoke = ({ commit }, id) => {
    return new Promise((resolve, reject) => {
        commit('SET_PENDING')

        api.tokenRevoke(id).then(response => {
            if (httpHelper.checkIsOkAnswerStatus(response.status)) {
                commit('TOKEN_REVOKE_SUCCESS', response.data);
                resolve(response);
            } else {
                commit('TOKEN_REVOKE_FAIL');
                reject(errorsHelper.getMessage(response));
                if(401===response.status) commit('LOGOUT')
                errorsHelper.goByStatusCode(response.status, router);
            }
        }, errors => {
            commit('TOKEN_REVOKE_FAIL');
            reject(errors);
            errorsHelper.goByStatusCode(500, router);
        })
    })
}
export const updatePassword = ({ commit }, password) => {
    return new Promise((resolve, reject) => {
        commit('SET_PENDING')

        api.updatePassword(password).then(response => {
            if (httpHelper.checkIsOkAnswerStatus(response.status)) {
                commit('UPDATE_PASSWORD_SUCCESS', response.data);
                resolve(response);
            } else {
                commit('UPDATE_PASSWORD_FAIL');
                reject(errorsHelper.getMessage(response));
                if(401===response.status) commit('LOGOUT')
                errorsHelper.goByStatusCode(response.status, router);
            }
        }, errors => {
            commit('UPDATE_PASSWORD_FAIL');
            reject(errors);

            errorsHelper.goByStatusCode(500, router);
        })
    })
}
export const sendPhoneCode = ({ commit }, phone) => {
    return new Promise((resolve, reject) => {
        commit('SET_PENDING')

        api.sendVerificationPhoneCode(phone.country.dialCode, phone.number.replace('+'+phone.country.dialCode,'')).then(response => {
            if (httpHelper.checkIsOkAnswerStatus(response.status)) {
                commit('RESET_PENDING');
                resolve(response);
            } else {
                commit('RESET_PENDING');
                reject(errorsHelper.getMessage(response));
                if(401===response.status) commit('LOGOUT')
                errorsHelper.goByStatusCode(response.status, router);
            }
        }, errors => {
            commit('RESET_PENDING');
            reject(errors);

            errorsHelper.goByStatusCode(500, router);
        })
    })
}
export const VerificationEmail = ({ commit }, hash) => {
    return new Promise((resolve, reject) => {
        commit('SET_PENDING')

        api.SubmitVerificationEmail(hash).then(response => {
            if (httpHelper.checkIsOkAnswerStatus(response.status)) {
                commit('RESET_PENDING');
                resolve(response);
            } else {
                commit('RESET_PENDING');
                reject(errorsHelper.getMessage(response));
                
                //errorsHelper.goByStatusCode(response.status, router);
            }
        }, errors => {
            commit('RESET_PENDING');
            reject(errors);

            //errorsHelper.goByStatusCode(500, router);
        })
    })
}
export const ReVerificationEmail = ({ commit }, email) => {
    return new Promise((resolve, reject) => {
        commit('SET_PENDING')

        api.ReVerificationEmail(email).then(response => {
            if (httpHelper.checkIsOkAnswerStatus(response.status)) {
                commit('RESET_PENDING');
                resolve(response);
            } else {
                commit('RESET_PENDING');
                reject(errorsHelper.getMessage(response));
                
                //errorsHelper.goByStatusCode(response.status, router);
            }
        }, errors => {
            commit('RESET_PENDING');
            reject(errors);

            //errorsHelper.goByStatusCode(500, router);
        })
    })
}
export const VerificationPhoneCode = ({ commit }, phone) => {
    return new Promise((resolve, reject) => {
        commit('SET_PENDING')

        api.SubmitVerificationPhoneCode(phone.country.dialCode, phone.number.replace('+'+phone.country.dialCode,''), phone.code).then(response => {
            if (httpHelper.checkIsOkAnswerStatus(response.status)) {
                commit('RESET_PENDING');
                resolve(response);
            } else {
                commit('RESET_PENDING');
                reject(errorsHelper.getMessage(response));
                if(401===response.status) commit('LOGOUT')
                errorsHelper.goByStatusCode(response.status, router);
            }
        }, errors => {
            commit('RESET_PENDING');
            reject(errors);

            errorsHelper.goByStatusCode(500, router);
        })
    })
}
export const VerificationPasport = ({ commit }, requestParams) => {
    return new Promise((resolve, reject) => {
        commit('SET_PENDING')

        api.SubmitVerificationPasport(requestParams).then(response => {
            if (httpHelper.checkIsOkAnswerStatus(response.status)) {
                commit('RESET_PENDING');
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
export const VerificationKYC = ({ commit }, image64) => {
    return new Promise((resolve, reject) => {
        commit('SET_PENDING')

        api.SubmitVerificationKYC(image64).then(response => {
            if (httpHelper.checkIsOkAnswerStatus(response.status)) {
                commit('RESET_PENDING');
                resolve(response);
            } else {
                commit('RESET_PENDING');
                reject(errorsHelper.getMessage(response));
                if(401===response.status) commit('LOGOUT')
                errorsHelper.goByStatusCode(response.status, router);
            }
        }, errors => {
            commit('RESET_PENDING');
            reject(errors);

            errorsHelper.goByStatusCode(500, router);
        })
    })
}
export const ReferrerList = ({ commit }) => {
    return new Promise((resolve, reject) => {
        commit('SET_PENDING')

        api.ReferrerList().then(response => {
            if (httpHelper.checkIsOkAnswerStatus(response.status)) {
                commit('REFERRER_LIST_SUCCESS', response.data);
                resolve(response);
            } else {
                commit('REFERRER_LIST_FAIL');
                reject(errorsHelper.getMessage(response));

//                errorsHelper.goByStatusCode(response.status, router);
            }
        }, errors => {
            commit('REFERRER_LIST_FAIL');
            reject(errors);

//            errorsHelper.goByStatusCode(500, router);
        })
    })
}

export const ReferWithdrawRequest = ({ commit }, requestParams) => {
    return new Promise((resolve, reject) => {
        commit('SET_PENDING')
        
        api.ReferWithdrawRequest(requestParams).then(response => {
            if (httpHelper.checkIsOkAnswerStatus(response.status)) {
                commit('RESET_PENDING', response.data);
                resolve(response);
            } else {
                commit('RESET_PENDING');
                reject(errorsHelper.getMessage(response));
            }
        }, errors => {
            commit('RESET_PENDING');
            reject(errors);
        })
    })
}
