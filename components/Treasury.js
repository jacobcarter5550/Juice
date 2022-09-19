import { useEffect , useState} from "react"
import {getTreasury, checkSpamAPI} from '../lib/api'
import { useSelector } from 'react-redux'
import Holding from './Holding'


function Treasury({ens}) {

    const [ holdings, setHoldings ] = useState()
    const treasury = useSelector((state)=>state.treasury)

    useEffect(() => {

        async function getTres () {
            const res = await getTreasury({ ens:`${ens}`});
            setHoldings(res)
        }
        getTres()
    }, [])

    const [bl, setBL] = useState([])
    const [wl, setWL] = useState([])

    useEffect(()=>{
        const whitelist = JSON.parse(localStorage.getItem('whiteList'))
        const blacklist = JSON.parse(localStorage.getItem('blackList'))

        const isListed = holdings?.map((item)=>{
            if(whitelist.includes(item.contract_address) || blacklist.includes(item.contract_address)){
                return
            } else {
                return item
            }
        }).filter((item)=> item !== undefined) 
        if(isListed && isListed.length > 1){
            checkSpamAPI(isListed).then(list =>{
                const white = list.map((item)=>{if(item.result == 'OK'){ return item.address}}).filter((item)=> item !== undefined).concat(whitelist)
                const black = list.map((item)=>{if(item.result == 'NOTOK'){return item.address}}).filter((item)=> item !== undefined).concat(blacklist)
                localStorage.setItem('blackList', JSON.stringify(black))
                localStorage.setItem('whiteList', JSON.stringify(white))
            },{})
        } else {
            setBL(blacklist)
            setWL(whitelist)
        }
    },[holdings])

    return (
        <div>
            <h1>{treasury.reduce((x,y)=> x+y, 0)}</h1>
            <div>
                <h1>Holdings</h1>
                { wl.map((item, ind)=>{
                    return <Holding key={ind} wl={wl} holdings={holdings} data={item}/>
                })}
            </div>
            {bl.map((address,ind)=>{

                return <Holding key={ind} wl={wl} bl={bl} holdings={holdings} data={address} type={'bl'}/>
            })}
        </div>
    )
}

export default Treasury