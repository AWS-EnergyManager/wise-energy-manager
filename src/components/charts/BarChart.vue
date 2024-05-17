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
import { watch } from 'vue';
import { useStore } from 'vuex';


export default defineComponent({
    name: 'BarChart',
    components: {
        VChart,
    },
    provide: {
    [THEME_KEY]: 'light',
    },
    setup() {
    const store = useStore(); // 引用 Vuex store
    const option = ref({
        //以下為圖表樣式設定
        xAxis: {
            type: 'category',
            data: [''] //x軸資料
        },
        yAxis: {
            type: 'value'
        },
        //以下為資料區
        series: [
        {
            data: [], // Empty initially, will be filled with values
            type: 'bar',
            stack: 'a',
            name: 'a',
        },
        
        ]
    });
    

    watch(
        () => store.state.powerData,
        (newPowerData) => {
        const temps = [];
        const dates = [];
        console.log("現有資料",newPowerData)
        newPowerData.forEach(([temp, date]) => {
            dates.push(date);
            temps.push(temp);
            console.log(temp, date)
        });
        console.log(temps, dates)
        option.value.xAxis.data = dates;
        option.value.series[0].data = temps;
        },
        { immediate: true }
    );


    return { option };
    }
});
</script>

<style scoped>
.chart {
    width: 100%;
    height: 100%;
}
</style>
