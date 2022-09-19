import fetch from 'node-fetch'




export default async function tryingDeep (req,res) {
    const response = await fetch('https://api.deepdao.io/v0.1/organizations/30d12da9-5fd5-411a-8ca8-1422a4ce1373', {
        method : 'get',
        headers: {
            accept: '*/*',
            'x-api-key': 'SAFY8deRYz6NgQ1datyaD1zg26vWyNBe4T2AupyO'
        },
    })

    res.status(200).json(response)
}