<template>
    <div>
        <PageHeader/>
        <div class="container">
            <div class="sidelist-container">
                <SideList/>
            </div>
            <div id="main" style="width: 600px;height:400px;"></div>
        </div>
    </div>
</template>

<script>
    import * as echarts from 'echarts';
    import PageHeader from '@/components/PageHeader.vue';
	import SideList from '@/components/SideList.vue';

export default {
    components:{
        PageHeader,
        SideList
    },
    mounted() {
    this.renderChart();
    },
    methods: {
    renderChart() {
    const chartDom = document.getElementById('main');
    const myChart = echarts.init(chartDom);
    const option = {
        xAxis: {
            type: 'category',
            data: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']
        },
        yAxis: {
            type: 'value'
        },
        series: [
            {
                data: [150, 230, 224, 218, 135, 147, 260],
                type: 'line'
            }
        ]
        };
            myChart.setOption(option);
        }
    }
};
</script>

<style lang="scss" scoped>
    .container{
        display: flex;
        justify-content: flex-start;
    }
</style>