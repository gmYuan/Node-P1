import * as echarts from 'echarts';

const dom = document.getElementById('main');

const clientWidth = document.documentElement.clientWidth;
dom.style.width = clientWidth + 'px';
dom.style.height = clientWidth * 1.2 + 'px';


const myChart = echarts.init(dom);

myChart.setOption({
	baseOption: {
		xAxis: {
			type: 'category',
			data: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']
		},
		yAxis: {
			type: 'value'
		},
		series: [
			{
				lineStyle: {
					// color: 'blue'
				},
				data: [150, 230, 224, 218, 135, 147, 260],
				type: 'line'
			}
		]
	},
	media: [
		{
			query: {
				maxWidth: 500
			},
			option: {
				series: [
					{
						itemStyle: {
							color: 'green',
							borderWidth: 40,
						}
					}
				]
			}
		}
	]
});