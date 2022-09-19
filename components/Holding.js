import { useEffect, useState } from "react"


function Holding({wl, bl, data, holdings, type}) {

    const item = holdings?.filter((address)=>address.contract_address == data)[0]
    console.log(item, type)

    return (
        <>{item ? <h1>{item.contract_name}</h1> : <h1>Loading</h1>}</>
    )
}

export default Holding