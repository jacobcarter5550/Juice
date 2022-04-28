const yearReducer = (state = [], action) =>{
    switch (action.type) {
        case 'addYear':
            return [...state, action.payload]
        default:
            return state
    }
}


export default yearReducer