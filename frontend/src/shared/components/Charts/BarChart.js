import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

import './BarChart.css';

const refactorData = data => {
	const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
	const result = months.map(m => ({ month: m, count: 0 }));

	data.forEach(d => {
		const month = new Date(d.deadline).getMonth();
		result[month].count += 1;
	});

	return result;
};

const BarChartComponent = ({ data }) => {
	const refactoredData = refactorData(data);

	return (
		<ResponsiveContainer width='100%' height='100%'>
			<BarChart data={refactoredData}>
				<CartesianGrid strokeDasharray='3 3' />
				<XAxis dataKey='month' />
				<Tooltip />
				<Bar dataKey='count' fill='#1e2123' />
			</BarChart>
		</ResponsiveContainer>
	);
};

export default BarChartComponent;
