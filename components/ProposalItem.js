import {useEffect} from 'react'
import {useQuery, gql} from '@apollo/client'
import { useDispatch } from 'react-redux'
import { bindActionCreators } from 'redux'
import { actionCreators } from './Redux/allActions'
import { isMobile } from 'react-device-detect'

function ProposalItem({proposal, index}) {

	const dispatch = useDispatch()
	const { addMonth, addVotingTotal } = bindActionCreators(actionCreators, dispatch)

	const individualProp = gql`query { proposal(id:"${proposal.id}") {
	id
	title
	body
	choices
	start
	end
	snapshot
	state
	author
	created
	scores
	scores_by_strategy
	scores_total
	scores_updated
	plugins
	network
	strategies {
		name
		network
		params
	}
	space {
		id
		name
	}
	}
	}`

	const {loading, errror, data} = useQuery(individualProp)

	const votes = gql`query {
	votes (
		first: 1000
		skip: 0
		where: {
		proposal: "${data?.proposal?.id}"
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

	const monthNames = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"]

	const month = monthNames[new Date(data?.proposal.created * 1000).getMonth()]

	useEffect(()=>{
	if(month!== undefined){addMonth(month)}
	},[data?.proposal.created])

	useEffect(()=>{
	if(votesFromProp.data !== undefined && votesFromProp.data.votes.length !== 0){
		addVotingTotal({total :votesFromProp.data.votes.length, position:index})
	}
	},[votesFromProp.data])

	const width = isMobile ? '20vh' : '200px'
	const font = isMobile ? '.9em' : ''

	return (<div style={{width:width, padding:'10px', border:'2px solid black', borderRadius:'6px', margin:'15px', fontSize: font}}>
	<h3>{proposal.title}</h3>
	<h3>Votes : {votesFromProp.data?.votes.length}</h3>
	</div>)
}

export default ProposalItem