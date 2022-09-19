import axios from "axios"


export const tryDeepDao = async(data) => {
    const endp = '/api/tryingDeep'
    const res = await axios.get(endp)
    console.log(res)
    return res.data

}


export const getTreasury = async (data) => {
    const endp ='/api/fetchCovalent'
    const res = await axios.post(endp, data)
    console.log(res)
    return res.data
}

export const checkSpamAPI = async (data) =>{
    const endp= '/api/checkSpam'
    const res = await axios.post(endp, data)
    console.log(res.data)
    return res.data
}