<template>
	<div>
		<PageHeader/>
		<div class="consumption-container">
			<SideList/>
			<div class="consumption-chart" id="consumption-chart">
				<el-button type="primary" @click="fetchData">Energy</el-button>
				<LineChart/>
				<!-- <div class="da" v-for="">

				</div> -->
			</div>
		</div>
		
	</div>
</template>

<script>
	import axios from 'axios';
	import PageHeader from '@/components/PageHeader.vue';
	import SideList from '@/components/SideList.vue';
	import LineChart from '@/components/charts/BarChart.vue';
	axios.defaults.withCredentials = true;

	export default {
		name: 'EnergyConsumption',
		components: {
			PageHeader,
			SideList,
			LineChart
		},
		data() {
			return {
			requestData: {
				"timeoffset": "00:00:00",
				"timezone": "Asia/Hong_Kong",
				"range": {
				"from": "2024-05-05T16:00:00.000Z",
				"to": "2024-05-12T16:00:00.000Z"
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
			apiUrl: '/api_url',
			accessToken: localStorage.getItem('accessToken') || '',
			data: []
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
			.then( (response) => {
				console.log(response.data[0].datapoints)
				this.data = response.data[0].datapoints
			})
			.catch( (error) => console.log(error))
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