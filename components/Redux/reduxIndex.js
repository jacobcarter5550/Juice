import { combineReducers } from "redux";
import monthReducer from './monthReducer'
import votingAverage from './votingAverage'

const reducers = combineReducers({
    months : monthReducer,
    votingTotals : votingAverage
})

export default reducers