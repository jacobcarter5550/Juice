import { combineReducers } from "redux";
import monthReducer from './monthReducer'
import votingAverage from './votingAverage'
import yearReducer from './yearReducer'
import idsReducer from './idsReducer'
import walletsPerMonthReducer from './walletsPerMonthReducer'
import treasuryTotal from './treasuryTotal'

const reducers = combineReducers({
    months : monthReducer,
    votingTotals : votingAverage,
    years: yearReducer,
    ids: idsReducer,
    wPM: walletsPerMonthReducer,
    treasury : treasuryTotal
})

export default reducers