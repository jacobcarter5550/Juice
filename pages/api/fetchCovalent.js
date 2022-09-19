import fetch from "node-fetch"

const covaKey = process.env.COVALENT_KEY

const etherScanKey = '92JQSCSGZU4A76HRJ4D9Q4525SZJ5T1MD6'


export default async function fetchCovalent (req, res) {

    const ens = req.body.ens

    const response = await fetch(`https://api.covalenthq.com/v1/1/address/${ens}/balances_v2/?quote-currency=USD&format=JSON&nft=true&key=${covaKey}`, {
        method : 'get',
        headers: {
            'CB-VERSION':'2021-11-12'
        }
    })

    const data = await response.json()

    const addressArr = data.data.items.map((item)=>{
        if(item.type == 'nft') {
            return
        } else {
            return item
        } 
    }).filter((item)=> item !== undefined)


    res.status(200).json(addressArr)

}