const monthReducer = (state = [], action) =>{
    switch (action.type) {
        case 'addMonth':
            return [...state, action.payload]
        default:
            return state
    }
}


export default monthReducer