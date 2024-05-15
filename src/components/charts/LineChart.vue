<template>
    <div>
        <div id="main" style="width: 600px;height:400px;"></div>
    </div>
</template>

<script>
    import * as echarts from 'echarts/core'; // 導入 ECharts
    import {
        BarChart
    } from 'echarts/charts'; // 導入柱狀圖
    import {
        GridComponent, 
        TooltipComponent,
        LegendComponent
    } from 'echarts/components'; // 導入網格、提示和圖例組件
    import {
        CanvasRenderer
    } from 'echarts/renderers'; // 導入畫布渲染器

    echarts.use([GridComponent, TooltipComponent, LegendComponent, BarChart, CanvasRenderer]); // 使用所需的 ECharts 組件和渲染器

    export default {
        mounted() { // 組件掛載後執行
            var chartDom = document.getElementById('main'); // 獲取圖表的 DOM 元素
            var myChart = echarts.init(chartDom); // 初始化 ECharts 實例

            // 定義圖表選項
            var option;

            // 定義系列數據
            var series = [
                {
                    data: [120, 200, 150, 80, 70, 110, 130],
                    type: 'bar',
                    stack: 'a', // 將這些數據堆疊在一起，形成一個堆疊區域
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
                }
            ];

            // 計算堆疊區域的信息
            const stackInfo = {};
            for (let i = 0; i < series[0].data.length; ++i) {
                for (let j = 0; j < series.length; ++j) {
                    const stackName = series[j].stack;
                    if (!stackName) {
                        continue;
                    }
                    if (!stackInfo[stackName]) {
                        stackInfo[stackName] = {
                            stackStart: [],
                            stackEnd: []
                        };
                    }
                    const info = stackInfo[stackName];
                    const data = series[j].data[i];
                    if (data && data !== '-') {
                        if (info.stackStart[i] == null) {
                            info.stackStart[i] = j;
                        }
                        info.stackEnd[i] = j;
                    }
                }
            }

            // 設置每個柱子的上下邊界
            for (let i = 0; i < series.length; ++i) {
                const data = series[i].data;
                const info = stackInfo[series[i].stack];
                for (let j = 0; j < series[i].data.length; ++j) {
                    const isEnd = info.stackEnd[j] === i;
                    const topBorder = isEnd ? 20 : 0;
                    const bottomBorder = 0;
                    data[j] = {
                        value: data[j],
                        itemStyle: {
                            borderRadius: [topBorder, topBorder, bottomBorder, bottomBorder]
                        }
                    };
                }
            }

            // 設置圖表選項
            option = {
                xAxis: {
                    type: 'category',
                    data: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'] // x 軸數據
                },
                yAxis: {
                    type: 'value' // y 軸類型
                },
                series: series // 系列數據
            };

            // 如果存在選項，則設置圖表選項
            option && myChart.setOption(option);
        }
    }
</script>

<style lang="scss" scoped>
/* CSS 樣式 */
</style>
