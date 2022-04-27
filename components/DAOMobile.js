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

const labels = ["January", "February", "March", "April", "May", "June",
	"July", "August", "September", "October", "November", "December"
]

		const [nfts, setNfts] = useState()
		const months = useSelector((state)=>state.months)
		const votesToAverage = useSelector((state)=>state.votingTotals)

		useEffect(()=>{
				setTimeout(() => {
					
				  setNfts('hey!')
				}, 5000);
		},[])

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

		const monthNames = ["January", "February", "March", "April", "May", "June",
	"July", "August", "September", "October", "November", "December"
]

	const mapped = monthNames.map((item)=>{
		return {
			month : item,
			count : stats[item] ?? 0
		}
	})


const lineData = {
	labels,
	datasets: [
		{
			label: '',
			data: mapped.map((item) =>{return item.count}),
			borderColor: '#10F9D7',
			backgroundColor: '#10F9D7',
		},
	]}

const lineData2 = {
	labels:proposals?.data?.proposals.map((item)=>{return `${item.title.slice(0, 9)}...`}),
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
                    <h1 className={styles.head1} >Average number of votes across all proposals : <span >{(added/length).toFixed(2)}/{orange?.followersCount}</span></h1>
                    <h1 className={styles.head2}>Proposals ↓</h1>
                    <div  className={styles.props} >
                        {proposals?.data.proposals.map((proposal, ind)=>{
                            return <ProposalItem key={ind} index={ind} proposal={proposal} />
                        })}
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