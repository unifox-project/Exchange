export const RESET_PENDING = (state) => {
    state.pending = false
}

export const SET_PENDING = (state) => {
    state.pending = true
}

export const GET_EXCHANGES_LIST_SUCCESS = (state, responseData) => {
    state.exchangesList = responseData.data
    state.meta = responseData.meta

    state.pending = false
}

export const GET_EXCHANGES_LIST_FAIL = (state) => {
    state.exchangesList = []
    state.meta = {}

    state.pending = false
}


export const GET_TRANSACTIONS_BY_USER_SUCCESS = (state, responseData) => {
    state.transactionsList = responseData.data
    state.meta = responseData.meta

    state.pending = false
}

export const GET_TRANSACTIONS_BY_USER_FAIL = (state) => {
    state.transactionsList = []
    state.meta = {}

    state.pending = false
}

export const GET_EXCHANGE_BY_HASH_SUCCESS = (state, responseData) => {
    state.transaction = responseData.data
    try{
        if(JSON.parse(state.transaction.out_payee)) 
            state.transaction.out_payee = JSON.parse(state.transaction.out_payee);
    }catch (err){
        console.log(err.message);
    }
    try{
        if(JSON.parse(state.transaction.in_payee)) 
            state.transaction.in_payee = JSON.parse(state.transaction.in_payee);
    }catch (err){
        console.log(err.message);
    }
    state.pending = false
}

export const GET_EXCHANGE_BY_HASH_FAIL = (state) => {
    state.transaction = {}
    state.pending = false
}


export const GET_EXCHANGE_FROM_LIST_SUCCESS = (state, responseData) => {
    state.from = responseData.data;
    state.pending = false;
}
export const GET_EXCHANGE_FROM_LIST_FAIL = (state) => {
    state.from = [];
    state.pending = false;
}

export const GET_EXCHANGE_TO_LIST_SUCCESS = (state, responseData) => {
    state.to = responseData.data;
    state.pending = false;
}
export const GET_EXCHANGE_TO_LIST_FAIL = (state) => {
    state.to = [];
    state.pending = false;
}

export const GET_EXCHANGE_BY_ID_SUCCESS = (state, responseData) => {
    state.exchange = responseData.data;
    state.pending = false;
}
export const GET_EXCHANGE_BY_ID_FAIL = (state) => {
    state.exchange = [];
    state.pending = false;
}

export const GET_SUMMARY_SUCCESS = (state, responseData) => {
    state.summary = responseData.data;
    state.pending = false;
}
export const GET_SUMMARY_FAIL = (state) => {
    state.summary = {};
    state.pending = false;
}

export const GET_LIMIT_SUCCESS = (state, responseData) => {
    state.limit = responseData.data;
    state.pending = false;
}
export const GET_LIMIT_FAIL = (state) => {
    state.limit = null;
    state.pending = false;
}
