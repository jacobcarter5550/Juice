import { combineReducers } from "redux";
import monthReducer from './monthReducer'
import votingAverage from './votingAverage'
import yearReducer from './yearReducer'
import idsReducer from './idsReducer'
import walletsPerMonthReducer from './walletsPerMonthReducer'

const reducers = combineReducers({
    months : monthReducer,
    votingTotals : votingAverage,
    years: yearReducer,
    ids: idsReducer,
    wPM: walletsPerMonthReducer
})

export default reducers