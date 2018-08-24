export const RESET_PENDING = (state) => {
    state.periodStatisticsPending = false;
}
export const SET_PENDING = (state) => {
    state.periodStatisticsPending = true;
}


export const GET_PERIOD_STATISTICS_SUCCESS = (state, responseData) => {
    state.periodStatisticsItems = responseData.data;
    state.periodStatisticsPending = false;
}
export const GET_PERIOD_STATISTICS_FAIL = (state) => {
    state.periodStatisticsItems = null;
    state.periodStatisticsPending = false;
}