const walletsPerMonthReducer = (state = [], action) =>{
    switch (action.type) {
        case 'addBatch':
            return [...state, action.payload]
        default:
            return state
    }
}


export default walletsPerMonthReducer