export const RESET_PENDING = (state) => {
    state.period = false;
}
export const SET_PENDING = (state) => {
    state.period = true;
}


export const GET_SEND_FEEDBACK_SUCCESS = (state, responseData) => {
    state.period = false;
}
export const GET_SEND_FEEDBACK_FAIL = (state) => {
    state.period = false;
}