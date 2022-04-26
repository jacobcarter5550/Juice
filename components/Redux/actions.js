export const addMonth = (month) => {
    return (dispatch) => {
        return dispatch({
            type : 'addMonth',
            payload : month
        })
    }
}


export const addVotingTotal = (total) => {
    return (dispatch) => {
        return dispatch({
            type : 'addTotal',
            payload : total
        })
    }
}