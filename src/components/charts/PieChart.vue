<template>
    <v-chart class="chart" :option="option" autoresize />
</template>

<script>
//根據圖表不同的需求，引入不同的組件
import { use } from 'echarts/core';
import { CanvasRenderer } from 'echarts/renderers';
import { PieChart } from 'echarts/charts';
import {
    TitleComponent,
    TooltipComponent,
    LegendComponent,
} from 'echarts/components';

use([
    CanvasRenderer,
    PieChart,
    TitleComponent,
    TooltipComponent,
    LegendComponent,
]);

//必要兩行
import VChart, { THEME_KEY } from 'vue-echarts';
import { ref, defineComponent } from 'vue';



export default defineComponent({
    name: 'PieChart',
    components: {
    VChart,
    },
    provide: {
    [THEME_KEY]: 'light',
    },
    setup() {
    const option = ref({
        title: {
        text: 'Traffic Sources',
        left: 'center',
        },
        tooltip: {
        trigger: 'item',
        formatter: '{a} <br/>{b} : {c} ({d}%)',
        },
        legend: {
        orient: 'vertical',
        left: 'left',
        data: ['Direct', 'Email', 'Ad Networks', 'Video Ads', 'Search Engines'],
        },
        series: [
        {
            name: 'Traffic Sources',
            type: 'pie',
            radius: '55%',
            center: ['50%', '60%'],
            data: [
            { value: 335, name: 'Direct' },
            { value: 310, name: 'Email' },
            { value: 234, name: 'Ad Networks' },
            { value: 135, name: 'Video Ads' },
            { value: 1548, name: 'Search Engines' },
            ],
            emphasis: {
            itemStyle: {
                shadowBlur: 10,
                shadowOffsetX: 0,
                shadowColor: 'rgba(0, 0, 0, 0.5)',
            },
            },
        },
        ],
    });

    return { option };
    },
});
</script>

<style scoped>
.chart {
    height: 100vh;
}
</style>
