import {  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip , ResponsiveContainer } from 'recharts';

function Radial({nums}) {
	const lessFive = nums?.map((item)=>{
		if(item <= 5) {
				return item 
		} else{
				return
		}
	}).filter((item)=> item !== undefined)

	const fiveFifteen = nums?.map((item)=>{
		if(item <= 15 && item > 5) {
				return item 
		} else{
				return
		}
	}).filter((item)=> item !== undefined)

	const max = nums?.map((item)=>{
		if(item <= 25 && item > 15) {
				return item 
		} else{
				return
		}
	}).filter((item)=> item !== undefined)

	const barData = [
		{
			name: 'total unique votes ',
			uv: nums.length,
			Users: nums.length,
			fill: '#36FFE5',
		},
		{
			name: '1-5',
			uv: lessFive.length,
			Users: lessFive.length,
			fill: '#7EDDC0',
		},
		{
			name: '5-15',
			uv: fiveFifteen.length,
			Users: fiveFifteen.length,
			fill: '#FF9274',
		},
		{
			name: '25-15',
			uv: max.length,
			Users: max.length,
			fill: '#FF7750',
		},
	]

	return (
		<div style={{width:'400px', height:'300px',marginRight:'auto', marginLeft:'auto', overflow:'hidden'}}>
			<ResponsiveContainer width="100%" height="100%">
				<BarChart width={500} height={300} data={barData} margin={{top: 5, right: 30, left: 20, bottom: 5,}} barSize={20}>
					<XAxis dataKey="name" scale="point" padding={{ left: 10, right: 10 }} />
					<YAxis />
					<Tooltip wrapperStyle={{maxWidth:'50px'}}/>
					<CartesianGrid strokeDasharray="3 3" />
					<Bar dataKey="Users" fill="#000000" background={{ fill: '#eee' }} />
				</BarChart>
			</ResponsiveContainer>
		</div>
	)
}

export default Radial