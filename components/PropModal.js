import {useRef, useState} from 'react'
import useOutside from './Functions/useOutside'
import { gql , useQuery} from '@apollo/client'
import styles from '../styles/scss/PropModal.module.scss'

function PropModal({proposal, index, setSel, setOpen, open,}) {

    const votes = gql`query {
        votes (
            first: 1000
            skip: 0
            where: {
            proposal: "${proposal?.id}"
            }
            orderBy: "created",
            orderDirection: desc
        ) {
            id
            voter
            vp
            vp_by_strategy
            vp_state
            created
            proposal {
            id
            }
            choice
            space {
            id
            }
        }
        }`
    const votesFromProp = useQuery(votes)

    const modal = useRef()

    function close () {
        setOpen(!open)
        setSel()
    }

    useOutside(modal, close)

    const [expanded, setExpanded] = useState(false)
    const start = `${new Date(proposal.start * 1000)}`
    const end = `${new Date(proposal.end * 1000)}`

    const stateOf = proposal.state.charAt(0).toUpperCase() + proposal.state.slice(1)
    
    return (
        <section className={styles.modal} >
            <aside className={styles.inner} ref={modal} >
                <h1>{proposal.title}</h1>
                <aside style={{ marginBottom:'0px', justifyContent:'space-between'}}>
                    <h1>Body</h1>
                    <h1 >Votes : {votesFromProp.data?.votes.length}</h1>
                    <h1 style={{marginRight:'15%'}}>{stateOf}</h1>
                </aside>
                {!expanded ? 
                <p onClick={()=>{setExpanded(!expanded)}}>{proposal.body.slice(0,400)}...(click to expand)</p>
                :
                <p onClick={()=>{setExpanded(!expanded)}}>{proposal.body}</p>
                }
                <aside style={{marginTop:'40px'}}>
                    <h1>Started : {start.slice(0,25)}</h1>
                    <h1 style={{marginLeft:'20%'}}>Ended : {end.slice(0,25)}</h1>
                </aside>
            </aside>
        </section>
    )
}

export default PropModal