export const RESET_PENDING = (state) => {
    state.pending = false
}

export const SET_PENDING = (state) => {
    state.pending = true
}

export const GET_USERS_LIST_SUCCESS = (state, responseData) => {
    state.users = responseData.data
    state.meta = responseData.meta

    state.pending = false
}

export const GET_USERS_LIST_FAIL = (state) => {
    state.users = []
    state.meta = {}

    state.pending = false
}

export const GET_META_SUCCESS = (state, responseData) => {
    state.meta = responseData.meta

    state.pending = false
}

export const GET_META_FAIL = (state) => {
    state.meta = {}

    state.pending = false
}

export const LOGIN_SUCCESS = (state, responseData) => {
    localStorage.setItem('token', responseData.data.access_token)
    localStorage.setItem('jwt_token', responseData.data.access_token)
    state.token = responseData.data.access_token

    state.pending = false
}

export const LOGIN_FAIL = (state) => {
    localStorage.removeItem('token')
    localStorage.removeItem('jwt_token')
    localStorage.removeItem('role')
    localStorage.removeItem('jwt_role')
    localStorage.removeItem('vuex')
    state.isLoggedIn = false
    state.token = null
    state.role = null

    state.pending = false
}

export const REGISTER_SUCCESS = (state, responseData) => {
    localStorage.removeItem('refer')
    state.pending = false
}

export const REGISTER_FAIL = (state) => {
    state.pending = false
}

export const PROFILE_UPDATE_SUCCESS = (state, responseData) => {
    state.profile = responseData.data
    state.pending = false
}

export const GET_PROFILE_SUCCESS = (state, responseData) => {
    state.profile = responseData.data
    state.isLoggedIn = true

    if (responseData.data.roles.data !== undefined) {
        let role = []

        responseData.data.roles.data.forEach(function (item, i, arr) {
            role.push({'id': item.id, 'name': item.name, 'displayName': item.display_name})
        })

        state.role = role
        localStorage.setItem('role', btoa(JSON.stringify(role)));
        localStorage.setItem('jwt_role', btoa(JSON.stringify(role)));
    }

    state.pending = false
}

export const GET_PROFILE_FAIL = (state) => {
    localStorage.removeItem('token')
    localStorage.removeItem('jwt_token')
    localStorage.removeItem('role')
    localStorage.removeItem('jwt_role')
    localStorage.removeItem('vuex')
    state.isLoggedIn = false
    state.token = null
    state.role = null

    state.pending = false
}

export const LOGOUT = (state) => {
    localStorage.removeItem('token')
    localStorage.removeItem('jwt_token')
    localStorage.removeItem('role');
    localStorage.removeItem('jwt_role')
    localStorage.removeItem('vuex')
    state.isLoggedIn = false
    state.profile = null
    state.token = null
    state.role = null

    state.pending = false
}

export const GET_USER_BY_ID_SUCCESS = (state, responseData) => {
    state.user = responseData.data
    state.meta = responseData.meta

    state.pending = false
}

export const GET_USER_BY_ID_FAIL = (state) => {
    state.user = {}
    state.meta = {}

    state.pending = false
}


export const LOGIN_LOGS_SUCCESS = (state, responseData) => {
    state.loginLogsItems = responseData.data;
    state.pending = false;
}
export const LOGIN_LOGS_FAIL = (state) => {
    state.pending = false;
}

export const TOKEN_REVOKE_SUCCESS = (state, responseData) => {
    state.pending = false;
}
export const TOKEN_REVOKE_FAIL = (state) => {
    state.pending = false;
}

export const UPDATE_PASSWORD_SUCCESS = (state, responseData) => {
    state.pending = false;
}
export const UPDATE_PASSWORD_FAIL = (state) => {
    state.pending = false;
}

export const REFERRER_LIST_SUCCESS = (state, responseData) => {
    state.referrers = responseData.data;
    state.referrersCount = responseData.meta.count;
    state.pending = false;
}
export const REFERRER_LIST_FAIL = (state) => {
    state.referrers = null;
    state.referrerCount = 0;
    state.pending = false;
}