import {useEffect, useState} from 'react'
import { useQuery } from '@apollo/client'
import { gql } from '@apollo/client'
import ProposalItem from './ProposalItem'
import { useSelector } from 'react-redux'
import {Chart as ChartJS, CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend,} from 'chart.js';
import { Line, Pie } from 'react-chartjs-2';
import styles from '../styles/Master.module.scss'
import Radial from './Radial'
import PropModal from './PropModal'
import Treasury from './Treasury'

function DAO() {
	ChartJS.register(
	CategoryScale,
	LinearScale,
	PointElement,
	LineElement,
	Title,
	Tooltip,
	Legend
	);
	const options = {
		responsive: true,
		scales: {
			yAxes:{
				grid: {
					drawBorder: true,
					color: '#000000',
				},
				ticks:{
					beginAtZero: true,
					color: 'black',
					fontSize: 12,
				}
			},
			xAxes: {
				grid: {
					drawBorder: true,
					color: '#000000',
				},
				ticks:{
					beginAtZero: true,
					color: 'black',
					fontSize: 12,
				}
			}
		},
		plugins: {
			legend: {
				position: 'top',
				color:'#000'
			},
			title: {
				display: true,
				color:'#000'
			},
		},
	};

	const ids = useSelector((state)=>state.ids)
	const wpm = useSelector((state)=>state.wPM)

	const [nfts, setNfts] = useState()
	const months = useSelector((state)=>state.months)
	const years = useSelector((state)=>state.years)

	const uniq = [...new Set(years)]
	const uniq2 = [...new Set(months)]

	const accurateYears = uniq.map((item)=>{
		return uniq2.filter((it)=>it.includes(`${item}`))
	})

	const merged = [].concat.apply([], accurateYears).reverse()



	const votesToAverage = useSelector((state)=>state.votingTotals)
		
	const EXCHANGE_RATES = gql`query Spaces($id_in: [String]) {
		spaces(where: {id_in: $id_in}) {
					id
					name
					about
					network
					symbol
					network
					terms
					skin
					avatar
					twitter
					website
					github
					private
					domain
					members
					admins
					categories
					plugins
					followersCount
					voting {
					delay
					period
					type
					quorum
					hideAbstain
			}
			strategies {
					name
					network
					params
			}
			validation {
					name
					params
			}
			filters {
					minScore
					onlyMembers
				}
	},
	}`

	const { loading, error, data } = useQuery(EXCHANGE_RATES, {
		variables: {id_in: ["orangedaoxyz.eth", null]},
	})

	useEffect(()=>{
		data !== undefined ? setNfts('asd'): null
	},[data])

	const orange = data?.spaces[0]

	const propsQuery = gql`query {
		proposals (
			first: 99,
			skip: 0,
			where: {
				space_in: ["orangedaoxyz.eth"],
				state: "open"
			},
			orderBy: "created",
			orderDirection: desc
		) {
			id
			title
			body
			choices
			start
			end
			snapshot
			state
			author
			space {
				id
				name
			}
		}
	}`
	const stats = {}
	const proposals = useQuery(propsQuery)

	months.forEach(function (x) { stats[x] = (stats[x] || 0) + 1; });

	const mapped = merged.map((item)=>{
		return {
			month : item,
			count : stats[item] ?? 0
		}
	})

	const lineData = {
		labels: merged,
		datasets: [
			{
				label: 'Proposals Each Month',
				data: mapped.map((item) =>{return item.count}),
				borderColor: '#10F9D7',
				backgroundColor: '#10F9D7',
			},
		]
	}

	const lineData2 = {
		labels:proposals?.data?.proposals.map((item)=>{return `${item.title.slice(0, 6)}...`}),
		datasets: [
			{
				label: 'Votes per Proposals',
				data: proposals?.data?.proposals.map((item, ind) =>{
					return votesToAverage.filter((vote)=> vote.position == ind)[0]?.total}),
				borderColor: '#10F9D7',
				backgroundColor: '#10F9D7',
			},
		]
	}

	const added = votesToAverage.map((val)=>{return val.total}).reduce((x, y) => x + y, 0)
	const length = votesToAverage.length

	const agg = [].concat.apply([], ids)
	const filter = [...new Set(agg)]
	const nums ={}
	agg.forEach(function (x) { nums[x] = (nums[x] || 0) + 1; });

	const arr = filter.map((item)=>{
		return nums[item]
	})

	const [container, setConatiner] = useState([])

	useEffect(()=>{
		if(wpm != []) {
			setConatiner(merged.map((item)=>{
				const trying = wpm.map((month)=>{
					if(month.time == item){
						return month.votes
					} else {
						return
					}
				}).filter((item)=> item !== undefined)

				return {
					time: item,
					arry: trying
				}
			}).map((arry)=>{
				return [...new Set([].concat.apply([], arry.arry))]
			}))
		}
	},[wpm])

	const lineData3 = {
		labels: merged,
		datasets: [
			{
				label: 'Unique Wallet Votes Each Month',
				data: container.map((item) =>{return item.length}),
				borderColor: '#10F9D7',
				backgroundColor: '#10F9D7',
			},
		]}

	const [open, setOpen] = useState(false)
	const [selected, setSelected] = useState()

	return (<>
		{nfts ? <div className={styles.home}>
			<aside className={styles.sideBar}>
                <img src="https://ipfs.io/ipfs/QmfQ5Wo9DBg51mQJ7L2bnA3uD3xdGMyypRWdnht2ZgqsSw" alt="" />
                <img src="/home.svg" alt="" />
            </aside>
			<aside style={{overflow:'scroll',backdropFilter: open ? 'none' : 'blur(20px)'}} className={styles.main}>
                <div className={styles.topBar} >
                    <h1 style={{margin:'0px'}}>ORANGEDAO</h1>
                    <h1 >Admins: {orange.admins.length}</h1>
                    <h1 >Members: {orange.members.length}</h1>
                    <h1 >Followers: {orange?.followersCount}</h1>
                </div>
                <div className={styles.stats} >
                    <aside className={styles.data} >
                        <div>
                            <h1>Proposals Each Months</h1>
                            <Line options={options} data={lineData} />
                        </div>
                        <div>
                            <h1>Votes per proposal</h1>
                            <Line options={options} data={lineData2} />
                        </div>
                    </aside>
					<aside className={styles.data}>
						<div>
							<h1>Unique Wallet Votes Each Month</h1>
							<Line options={options} data={lineData3} />
						</div>
						<div>
							{Object.keys(nums).length !== 0 ? <>
								<h1 style={{marginBottom:'50px'}}>Number of times unique wallets have voted</h1>
								<Radial nums={arr}/>
							</> :
							<h1>Loading</h1>}
						</div>
					</aside>
					<Treasury ens='orangedaoxyz.eth'/>
                    <h1>Average number of users voting across all proposals : <span style={{fontWeight:'500'}}>{(added/length).toFixed(2)?? 0}/{orange?.followersCount}</span></h1>
                    <h1>Proposals ↓</h1>
                    <div className={styles.props} >
						{!proposals.loading ? 
							<>{proposals?.data.proposals.map((proposal, ind)=>{
								return <>
								{open && selected == ind && <PropModal setSel={setSelected} setOpen={setOpen} open={open} index={ind} proposal={proposal}/>}
								<ProposalItem key={ind} index={ind} proposal={proposal} setSel={setSelected} setOpen={setOpen} open={open} />
								</>
							})}</>
						:
							<h1>Loading</h1>
						}
                    </div>
                </div>
            </aside>
		</div>
		:
		<h1>Loading!</h1>
		}
	</>)
}

export default DAO


//How many snapshot props come from gauntlet derived data