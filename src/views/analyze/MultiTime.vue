<template>
    <div>
        <PageHeader/>
    </div>
    <div class="linechart-container">
        <SideList/>
        <div class="chart">
            <div id="line" style="width: auto;height: 400px;"></div>
            <div id="bar" style="width: auto;height: 400px;"></div>
        </div>
        
    </div>
    
</template>

<script>
    import PageHeader from '@/components/PageHeader.vue';
	import SideList from '@/components/SideList.vue';
    import * as echarts from 'echarts';
    export default{
        components:{
            PageHeader,
            SideList
        },
        mounted(){
            this.renderLineChart();
            this.renderBarChart();
        },
        methods:{
            renderLineChart(){
                var chartDom = document.getElementById('line');
                var myChart = echarts.init(chartDom);
                var option;

                option = {
                title: {
                    text: '多時間對比'
                },
                tooltip: {
                    trigger: 'axis'
                },
                legend: {
                    data: ['Email', 'Union Ads', 'Video Ads', 'Direct', 'Search Engine']
                },
                grid: {
                    left: '3%',
                    right: '4%',
                    bottom: '3%',
                    containLabel: true
                },
                xAxis: {
                    type: 'category',
                    boundaryGap: false,
                    data: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']
                },
                yAxis: {
                    type: 'value'
                },
                series: [
                    {
                    name: 'Email',
                    type: 'line',
                    stack: 'Total',
                    data: [120, 132, 101, 134, 90, 230, 210]
                    },
                    {
                    name: 'Union Ads',
                    type: 'line',
                    stack: 'Total',
                    data: [220, 182, 191, 234, 290, 330, 310]
                    },
                    {
                    name: 'Video Ads',
                    type: 'line',
                    stack: 'Total',
                    data: [150, 232, 201, 154, 190, 330, 410]
                    },
                    {
                    name: 'Direct',
                    type: 'line',
                    stack: 'Total',
                    data: [320, 332, 301, 334, 390, 330, 320]
                    },
                    {
                    name: 'Search Engine',
                    type: 'line',
                    stack: 'Total',
                    data: [820, 932, 901, 934, 1290, 1330, 1320]
                    }
                ]
                };

                option && myChart.setOption(option);
            },
            renderBarChart(){
                var chartDom = document.getElementById('bar');
                var myChart = echarts.init(chartDom);
                var option;

                option = {
                title: {
                text: '總量統計'
                },
                tooltip: {
                    trigger: 'axis',
                    axisPointer: {
                    type: 'shadow'
                    }
                },
                grid: {
                    left: '3%',
                    right: '4%',
                    bottom: '3%',
                    containLabel: true
                },
                xAxis: [
                    {
                    type: 'category',
                    data: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
                    axisTick: {
                        alignWithLabel: true
                    }
                    }
                ],
                yAxis: [
                    {
                    type: 'value'
                    }
                ],
                series: [
                    {
                    name: 'Direct',
                    type: 'bar',
                    barWidth: '60%',
                    data: [10, 52, 200, 334, 390, 330, 220]
                    }
                ]
                };

                option && myChart.setOption(option);
            }
        },
    }
</script>

<style lang="scss" scoped>
    .linechart-container{
        display: flex;
        justify-content: flex-start;
    }
    .chart{
        flex: auto;
    }
</style>