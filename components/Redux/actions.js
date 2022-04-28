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

export const addYear = (total) => {
    return (dispatch) => {
        return dispatch({
            type : 'addYear',
            payload : total
        })
    }
}

export const addID = (total) => {
    return (dispatch) => {
        return dispatch({
            type : 'addID',
            payload : total
        })
    }
}

export const addBatch = (total) => {
    return (dispatch) => {
        return dispatch({
            type : 'addBatch',
            payload : total
        })
    }
}