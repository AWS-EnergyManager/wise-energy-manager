<template>
    <div>
        <PageHeader/>
        <el-button type="primary" @click="fetchData">Data</el-button>
    </div>
</template>

<script>
    import axios from 'axios';
    import PageHeader from '@/components/PageHeader.vue';
    axios.defaults.withCredentials = true;
    export default {
        name: 'EnergyConsumption',
        components: {
            PageHeader
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
                            "queyType": "bems_multi",
                            "apmOrgId": 1,
                            "resourceId": "1581",
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
            .then( (response) => console.log(response))
            .catch( (error) => console.log(error))
        }
        }
        
    }
</script>

<style lang="scss" scoped>

</style>