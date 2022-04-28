// 0x16D56FA9b31479315a05b0b31F83D88f5F8Ca6e4
import {useEffect, useState} from 'react'
import { useQuery } from '@apollo/client'
import { gql } from '@apollo/client'
import ProposalItem from './ProposalItem'
import { useSelector } from 'react-redux'
import {Chart as ChartJS, CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend,} from 'chart.js';
import { Line } from 'react-chartjs-2';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip as ToolTippy, ResponsiveContainer } from 'recharts';
import styles from '../styles/MasterMobile.module.scss'
import Radial from './Radial'


function DAO() {
	const ids = useSelector((state)=>state.ids)


	ChartJS.register(
	CategoryScale,
	LinearScale,
	PointElement,
	LineElement,
	Title,
	Tooltip,
	Legend
);

const wpm = useSelector((state)=>state.wPM)


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
	labels: merged.map((item)=>{return `${item.slice(0,3)} ${item.slice(-4)}`}),
	datasets: [
		{
			label: 'Proposals Each Month',
			data: mapped.map((item) =>{return item.count}),
			borderColor: '#10F9D7',
			backgroundColor: '#10F9D7',
		},
	]}

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
	]}

	const added = votesToAverage.map((val)=>{return val.total}).reduce((x, y) => x + y, 0)
	const length = votesToAverage.length

	const agg = [].concat.apply([], ids)
	const filter = [...new Set(agg)]
	const nums ={}
	agg.forEach(function (x) { nums[x] = (nums[x] || 0) + 1; });
//Final object with each wallet and it's vot

	const arr = filter.map((item)=>{
		return nums[item]
	})

	const [container, setConatiner] = useState([])

	useEffect(()=>{
		if(wpm != []) {
			const uniqueWalletsPerMonth = merged.map((item)=>{
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
			})
			const sorted = uniqueWalletsPerMonth.map((arry)=>{
				const gathered = [].concat.apply([], arry.arry)
				return [...new Set(gathered)]
			})
			setConatiner(sorted)
		}
	},[wpm])

	const lineData3 = {
		labels: merged.map((item)=>{return `${item.slice(0,3)} ${item.slice(-4)}`}),
		datasets: [
			{
				label: 'Unique Wallet Votes Each Month',
				data: container.map((item) =>{return item.length}),
				borderColor: '#10F9D7',
				backgroundColor: '#10F9D7',
			},
		]}
	return (<>
		{nfts ? <div className={styles.home}>
			<aside className={styles.sideBar}>
                <img style={{width:'75px', borderRadius:'20px' }} src="https://ipfs.io/ipfs/QmfQ5Wo9DBg51mQJ7L2bnA3uD3xdGMyypRWdnht2ZgqsSw" alt="" />
                <h1 style={{margin:'0px'}}>ORANGEDAO</h1>
            </aside>
			<aside className={styles.main}>
                <div className={styles.topBar} >
                    <aside >
                        <h1 >Admins</h1>
                        <h1 >Members</h1>
                        <h1 >Followers</h1>
                    </aside>
                    <aside >
                        <h1 >{orange.admins.length}</h1>
                        <h1 >{orange.members.length}</h1>
                        <h1 >{orange?.followersCount}</h1>
                    </aside>
                </div>
                <div  className={styles.stats} >
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
                    <h1 className={styles.head1} >Average number of users voting across all proposals :  <span >{(added/length).toFixed(2)}/{orange?.followersCount}</span></h1>
                    <h1 className={styles.head2}>Proposals ↓</h1>
                    <div  className={styles.props} >
						{!proposals.loading ? 
							<>{proposals?.data.proposals.map((proposal, ind)=>{
								return <ProposalItem key={ind} index={ind} proposal={proposal} />
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