import Vue from 'vue'
import Vuex from 'vuex'
import createPersistedState from 'vuex-persistedstate'

import User from './user/index'
import Course from './course/index'
import Log from './log/index'
import Commission from './commission/index'
import Dashboard from './dashboard/index'
import News from './news/index'
import Wallet from './wallet/index'
import Exchange from './exchange/index'
import Payment from './payment/index'
import Rates from './rates/index'
import Contacts from './contacts/index'

Vue.use(Vuex)

const store = new Vuex.Store({
    modules: {
        User,
        Course,
        Log,
        Commission,
        Dashboard,
        News,
        Wallet,
        Exchange,
        Payment,
        Rates,
        Contacts
    },
    plugins: [createPersistedState()]
})

export default store
