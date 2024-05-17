<template>
	<div>
		<PageHeader/>
		<div class="consumption-container">
					<SideList class="col-3"/>
					<div class="consumption-chart" id="consumption-chart">
						<div class="datePicker">
							<el-date-picker
								v-model="requestData.range.from"
								type="date"
								placeholder="起始時間"
								@change="this.toISO(this.requestData.range.from)"
							/>
							<el-date-picker
								v-model="requestData.range.to"
								type="date"
								placeholder="結束時間"
								@change="this.toISO(this.requestData.range.to)"
							/>
							<el-button type="primary" @click="fetchData">查詢</el-button>
						</div>
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
				"from": "", //起始時間
				"to": "" //結束時間
				},
				"language": "zh",
				"targets": [
				{
					"target": "energy",
					"queryType": "bems_multi",
					"apmOrgId": 1,
					"resourceId": "1580",//建築物ID
					"subitemCode": "01000",
					"formulaType": 183,
					"formulaUnit": "day"//時間單位
				}
				]
			},
			apiUrl: '/api_url',
			accessToken: localStorage.getItem('accessToken') || '',
			errorMessage: '',
			powerData: [],
			}
		},
		methods: {
			...mapActions(['savePowerData']),
			fetchData() {
			// this.requestData.range.from = this.toISO(this.requestData.range.from);
			// this.requestData.range.to = this.toISO(this.requestData.range.to);
			axios.post(this.apiUrl + '/v1/simplejson/query/new', this.requestData,{
				headers: {
					'Content-Type': 'application/json',
					'Authorization': 'Bearer ' + this.accessToken
				},
			})
			.then( (response) => {
				console.log("raw",response.data[0]);
				this.powerData = response.data[0].datapoints;
				this.powerData = this.powerData.map((item) => {

					return [item[0], this.timeStampconver(item[1])];
				});

				console.log("電量資料：",this.powerData);
				console.log("時間範圍：",this.requestData.range)
				this.savePowerData(this.powerData);
			})
			.catch( (error) => {
				alert("請重新登入")
				console.log(error.response.data.message);
			})
			},
			timeStampconver(timeStamp) {
				const date = new Date(timeStamp * 1000);
				const year = date.getFullYear();
				const month = `0${date.getMonth() + 1}`.slice(-2); // 月份从 0 开始，所以需要 +1
				const day = `0${date.getDate()}`.slice(-2);
				const formattedTime = `${year}-${month}-${day}`;
				return formattedTime;
			},
			toISO(date) {
				// 获取本地时间的 UTC 时间戳
				const localDate = new Date(date);
				const utcDate = new Date(localDate.getTime() - (localDate.getTimezoneOffset() * 60000));
				
				// 格式化为 YYYY-MM-DDTHH:mm:ss.sssZ
				const year = utcDate.getUTCFullYear();
				const month = `0${utcDate.getUTCMonth() + 1}`.slice(-2); // 月份从 0 开始，所以需要 +1
				const day = `0${utcDate.getUTCDate()}`.slice(-2);
				const hours = `0${utcDate.getUTCHours()}`.slice(-2);
				const minutes = `0${utcDate.getUTCMinutes()}`.slice(-2);
				const seconds = `0${utcDate.getUTCSeconds()}`.slice(-2);
				const milliseconds = `00${utcDate.getUTCMilliseconds()}`.slice(-3);
				
				return `${year}-${month}-${day}T${hours}:${minutes}:${seconds}.${milliseconds}Z`;
			}
		}
	}
</script>

<style lang="scss" scoped>
.consumption-container{
	height: calc(100vh - 5em);
	display: flex;
	align-items: center;
	justify-content: space-between;
	.consumption-chart{
		width: 70%;
		height: 70%;
		// background-color: aqua;
		.datePicker{
			display: flex;
			justify-content: center;
			align-items: center;
			.el-date-picker{
				width: 200px;
				margin: 0 10px;
			}
		}
	}
	.col-3{
		width: 20%;
		// background-color: aqua;
	}
}


</style>