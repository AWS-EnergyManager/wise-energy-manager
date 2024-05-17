<template>
	<div>
		<PageHeader/>
		<div class="consumption-container">
			<SideList/>
			<div class="consumption-chart" id="consumption-chart">
				<!-- <el-button type="primary" @click="fetchData">Energy</el-button> -->
				<BarChart/>
				<!-- <PieChart/> -->

			</div>
		</div>
		
	</div>
</template>

<script>
	import axios from 'axios';
	import PageHeader from '@/components/PageHeader.vue';
	import SideList from '@/components/SideList.vue';
	import BarChart from '@/components/charts/BarChart.vue';
	// import PieChart from '@/components/charts/PieChart.vue';
	axios.defaults.withCredentials = true;

	export default {
		name: 'EnergyConsumption',
		components: {
			PageHeader,
			SideList,
			BarChart,
			// PieChart
		},
		data() {
			return {
			requestData: {
				"timeoffset": "00:00:00",
				"timezone": "Asia/Hong_Kong",
				"range": {
				"from": "2024-01-01T16:00:00.000Z",
				"to": "2024-05-01T16:00:00.000Z"
				},
				"language": "zh",
				"targets": [
				{
					"target": "energy",
					"queryType": "bems_multi",
					"apmOrgId": 1,
					"resourceId": "1580",
					"subitemCode": "01000",
					"formulaType": 183,
					"formulaUnit": "day"
				}
				]
			},
			// apiUrl: 'https://api-bee-system-cluster01.iems-acl.wise-insightapm.com',
			apiUrl: '/api_url',
			accessToken: localStorage.getItem('accessToken') || '',
			errorMessage: ''
			}
		},
		methods: {
			fetchData() {
			axios.post(this.apiUrl + '/v1/simplejson/query/new', this.requestData,{
				headers: {
					'Content-Type': 'application/json',
					'Authorization': 'Bearer ' + this.accessToken
				},
			})
			.then( (response) => console.log(response.data))
			.catch( (error) => {
				alert("請重新登入")
				console.log(error.response.data.message);
			})
			}
		}
	}
</script>

<style lang="scss" scoped>
.consumption-container{
	display: flex;
	// justify-content: space-between;
	.consumption-chart{
		width: 100%;
		height: 100%;
	}
}

</style>