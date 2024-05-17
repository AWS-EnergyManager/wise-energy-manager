<template>
    <v-chart class="chart" :option="option" autoresize />
    
</template>

<script>
//根據圖表不同的需求，引入不同的組件
import { use } from 'echarts/core'
import { BarChart } from 'echarts/charts'
import { GridComponent } from 'echarts/components'
import { CanvasRenderer } from 'echarts/renderers'

use([GridComponent, BarChart, CanvasRenderer])

//必要兩行
import VChart, { THEME_KEY } from 'vue-echarts';
import { ref, defineComponent } from 'vue';



export default defineComponent({
    name: 'BarChart',
    components: {
    VChart,
    },
    provide: {
    [THEME_KEY]: 'light',
    },
    setup() {
    const option = ref({
        //以下為圖表樣式設定
        xAxis: {
        type: 'category',
        data: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']
        },
        yAxis: {
        type: 'value'
        },
        //以下為資料區
        series: [
        {
            data: [120, 200, 150, 80, 70, 110, 130],
            type: 'bar',
            stack: 'a',
            name: 'a'
        },
        {
            data: [10, 46, 64, '-', 0, '-', 0],
            type: 'bar',
            stack: 'a',
            name: 'b'
        },
        {
            data: [30, '-', 0, 20, 10, '-', 0],
            type: 'bar',
            stack: 'a',
            name: 'c'
        },
        {
            data: [30, '-', 0, 20, 10, '-', 0],
            type: 'bar',
            stack: 'b',
            name: 'd'
        },
        {
            data: [10, 20, 150, 0, '-', 50, 10],
            type: 'bar',
            stack: 'b',
            name: 'e'
        },
        
        ]
    });

    return { option };
    }
});
</script>

<style scoped>
.chart {
    height: 100vh;
}
</style>
