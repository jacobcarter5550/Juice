


const etherScanKey = '92JQSCSGZU4A76HRJ4D9Q4525SZJ5T1MD6'


export default async function checkSpam (req, res) {


    const holdings= req.body
    
    async function checkSpam (addy) {
        try{
            const resp = await fetch(`https://api.etherscan.io/api?module=contract&action=getabi&address=${addy}&apikey=92JQSCSGZU4A76HRJ4D9Q4525SZJ5T1MD6`,{
                method : 'get',
                'Access-Control-Allow-Origin': 'http://localhost:3000'
            })
            return await resp.json()
        } catch(error) {
            console.log(error)
            return JSON.stringify(error)
        }
    }
    function sleep (milliseconds) {
        return new Promise((resolve) => setTimeout(resolve, milliseconds))
    }
    
    
    async function getEther() {
        const results = []
        for(const item of holdings) {
            const respp = await checkSpam(item.contract_address)
            console.log({address: item.contract_address, result : respp.message})

            results.push({address: item.contract_address, result : respp.message})
            await sleep(200)
        }
        return results
    }


    res.json(await getEther())
    res.status(200)
}