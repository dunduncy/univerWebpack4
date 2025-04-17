<template>
    <div class="outer">
        <div class="about" ref="lineChart" style="width:100%;height:100%;">
        </div>
    </div>
</template>
 
<script>
import * as echarts from 'echarts';
export default {
    data() {
        return {
            chartLineColors: {
                '谷': '#65B984',
                '平': '#409EFF',
                '峰': '#F99915',
                '尖': '#F93915',
            },
            options: {
                // title: {
                //     text: '某地区1.5倍工商业分月用电价格表',
                //     left: 'center',
                //     top: 20,
                //     textStyle: {
                //         fontSize: 16
                //     }
                // },

                tooltip: {
                    trigger: 'axis',
                    axisPointer: {
                        type: 'cross',
                        label: {
                            backgroundColor: '#6a7985'
                        }
                    }
                },
                legend: {
                    padding: [20, 0, 0, 0]
                },
                grid: {
                    left: '0%',
                    right: '0%',
                    top: 60,
                    bottom: 20,
                    containLabel: true
                },
                xAxis: [
                    {
                        type: 'category',
                        boundaryGap: true,
                        data: []
                    }
                ],
                yAxis: [
                    {
                        name: this.$t('system$elePriceInfo$index_vue.yuan')+'/kWh',
                        nameTextStyle: {
                            padding: [0, 0, 0, 60]
                        },
                        axisTick: {
                            show: false
                        },
                        axisLine: {
                            show: false
                        },
                        type: 'value'
                    }
                ],
                series: []
            }
        }
    },
    props: {
        xdata: {
            type: Array,
            default() {
                return []
            }
        },
        unit: {
            type: String,
            default: ''
        },
        seriesData: {
            type: Array,
            default() {
                return []
            }
        }
    },
    methods: {
        initChart() {
            this.options.xAxis[0].data = this.xdata
            this.options.yAxis.name = this.unit
            this.options.series = this.seriesData
            this.myChart = echarts.init(this.$refs.lineChart);
            this.myChart.clear()
            this.myChart.setOption(this.options);
        },
    },
    created(){
        console.log(2)
    },
    mounted() {
        console.log(1)
        this.initChart()
    }
}
</script>
 
<style>
.outer {
    width: 100%;
    height: 100%;
}
</style>