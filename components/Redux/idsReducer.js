const idsReducer = (state = [], action) =>{
    switch (action.type) {
        case 'addID':
            return [...state, action.payload]
        default:
            return state
    }
}


export default idsReducer