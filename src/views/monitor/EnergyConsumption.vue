<template>
	<div>
		<PageHeader/>
		<div class="consumption-container">
					<SideList class="col-4"/>
					<div class="consumption-chart" id="consumption-chart">
						<div class="datePicker">
							<!--<el-input-->
							<!--	v-model="requestData.resourceId"-->
							<!--	style="width: 240px"-->
							<!--	placeholder="大樓ID"-->
							<!--	type="number"-->
							<!--	clearable-->
							<!--/>-->
							<el-date-picker
								v-model="requestDataDateRangeFromModified"
								type="date"
								value-format="YYYY-MM-DDTHH:mm:ss.SSSZ"
								placeholder="起始時間"
							/>
							<el-date-picker
								v-model="requestDataDateRangeToModified"
								type="date"
								value-format="YYYY-MM-DDTHH:mm:ss.SSSZ"
								placeholder="結束時間"
							/>
							<el-button type="primary" @click="fetchData">查詢</el-button>
						</div>
						<BarChart/>
						<!--<el-button type="primary" @click="getBuildingList">建築物</el-button>-->
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
						"from": "2024-04-01T16:00:00.000Z",
						"to": "2024-04-14T16:00:00.000Z",
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
			}
		},
		computed: {
			requestDataDateRangeFromModified: {
				set(value){
					this.requestData.range.from = new Date(value).toISOString();
					
				},
				get(){
					return this.requestData.range.from;
				}
			},
			requestDataDateRangeToModified: {
				set(value){
					// 將儲存日期往後一天
					console.log(value);
					const date = new Date(value);
					date.setDate(date.getDate() + 1);
					this.requestData.range.to = date.toISOString();
				},
				get(){
					// 將顯示日期往前一天
					const date = new Date(this.requestData.range.to);
					date.setDate(date.getDate() - 1);
					return date.toISOString();
				}
			},
		},
		methods: {
			...mapActions(['savePowerData']),
			//獲取電量資料
			fetchData() {
			axios.post(this.apiUrl + '/v1/simplejson/query/v1', this.requestData,{
				headers: {
					'Content-Type': 'application/json',
					'Authorization': 'Bearer ' + this.accessToken
				},
			})
			.then( (response) => {
				let powerData = response.data[0].datapoints;
				powerData = powerData.map((item) => {
					return [item[0], this.timeStampconver(item[1])];
				});
				this.savePowerData(powerData);
			})
			.catch( (error) => {
				alert("請重新登入")
				console.error("Error: ",error);
				console.log(error.response.data.message);
			})
			},
			//獲取建築物清單
			getBuildingList() {
				axios.get(this.apiUrl + '/v1/resources/neworganizations',{
					headers: {
						'Content-Type': 'application/json',
						'Authorization': 'Bearer ' + this.accessToken
					},
				})
				.then( (response) => {
					console.log("建築物清單：",response.data);
				})
				.catch( (error) => {
					console.error("Error: ",error);
					console.log("錯誤訊息：",error.response);
				})
			},
		
			//轉換時間戳
			timeStampconver(timeStamp) {
				// Turn the UNIX timestamp into a human-readable date string like "2021-01-01" with UTC+8
				return new Date(timeStamp * 1000).toLocaleDateString('zh-Hans-CN', {
					year: 'numeric',
					month: '2-digit',
					day: '2-digit',
				});
			},
			
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
		}
	}
	.col-3{
		width: 30%;
		// background-color: aqua;
	}
	.col-4{
		width: 20%;
		// background-color: aqua;
	}
}




</style>