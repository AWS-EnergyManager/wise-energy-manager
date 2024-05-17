<template>
	<div>
		<PageHeader/>
		<div class="consumption-container">
					<SideList class="col-3"/>
					<div class="consumption-chart" id="consumption-chart">
						<el-button type="primary" @click="fetchData">Energy</el-button>
						<BarChart/>
					</div>
					<ChatbotWindow class="col-3"/>
			</div>
	</div>
</template>

<script>
	import axios from 'axios';
	import PageHeader from '@/components/PageHeader.vue';
	import SideList from '@/components/SideList.vue';
	import BarChart from '@/components/charts/BarChart.vue';
	import ChatbotWindow from '@/components/ChatbotWindow.vue';
import { mapActions } from 'vuex';
	axios.defaults.withCredentials = true;

	export default {
		name: 'EnergyConsumption',
		components: {
			PageHeader,
			SideList,
			BarChart,
			ChatbotWindow,
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
			apiUrl: '/api_url',
			accessToken: localStorage.getItem('accessToken') || '',
			errorMessage: '',
			powerData: []
			}
		},
		methods: {
			...mapActions(['savePowerData']),
			fetchData() {
			axios.post(this.apiUrl + '/v1/simplejson/query/new', this.requestData,{
				headers: {
					'Content-Type': 'application/json',
					'Authorization': 'Bearer ' + this.accessToken
				},
			})
			.then( (response) => {
				// console.log("raw",response.data[0].datapoints);
				this.powerData = response.data[0].datapoints;
				this.powerData.forEach( (item) => {
					item[1] = this.timeStampconver(item[1]);
				})
				console.log("powerData",this.powerData);
				this.savePowerData(this.powerData);
			})
			.catch( (error) => {
				alert("請重新登入")
				console.log(error.response.data.message);
			})
			},
			timeStampconver(timeStamp) {
				const date = new Date(timeStamp * 1000)
				const year = date.getUTCFullYear();
				const month = `0${date.getUTCMonth() + 1}`;
				const day = `0${date.getUTCDate()}`;
				// const hours = date.getHours();
				// const minutes = `0${date.getMinutes()}`;
				// const seconds = `0${date.getSeconds()}`;
				// const formattedTime = `${year}-${month.substr(-2)}-${day.substr(-2)} ${hours}:${minutes.substr(-2)}:${seconds.substr(-2)}`;
				const formattedTime = `${year}-${month.substr(-2)}-${day.substr(-2)}`;
				// console.log(formattedTime);
				return formattedTime;
			},
		}
	}
</script>

<style lang="scss" scoped>
.consumption-container{
	display: flex;
	justify-content: space-between;
	.consumption-chart{
		width: 50%;
		height: 50%;
	}
	.col-3{
		width: 20%;
		// background-color: aqua;
	}
}


</style>