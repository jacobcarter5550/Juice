const votingAverage = (state = [], action) =>{
    switch (action.type) {
        case 'addTotal':
            return [...state, action.payload]
        default:
            return state
    }
}


export default votingAverage