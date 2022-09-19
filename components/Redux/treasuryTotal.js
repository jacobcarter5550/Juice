const treasuryTotal = (state = [0,0,0], action) =>{
    switch (action.type) {
        case 'addToTreasury':
            return [...state, action.payload]
        default:
            return state
    }
}


export default treasuryTotal