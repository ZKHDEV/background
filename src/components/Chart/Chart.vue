<template>
    <div class="chart-container" v-title="'统计'">
        <el-row :gutter="10">
            <el-col :span="6">
                <div class="card">
                    <line-chart :height="400" :chart-data="lineDataCollection" :options="options"></line-chart>
                </div>
            </el-col>
            <el-col :span="6">
                <div class="card">
                    <bar-chart :height="400" :chart-data="barDataCollection" :options="options"></bar-chart>
                </div>
            </el-col>
            <el-col :span="6">
                <div class="card">
                    <pie-chart :height="400" :chart-data="pieDataCollection" :options="options"></pie-chart>                    
                </div>
            </el-col>
            <el-col :span="6">
                <div class="card">
                    <hor-bar-chart :height="400" :chart-data="barDataCollection" :options="options"></hor-bar-chart>
                </div>
            </el-col>
        </el-row>
        <el-row :gutter="10">
            <el-col :span="12">
                <div class="card">
                    <radar-chart :height="400" :chart-data="radarDataCollection" :options="options"></radar-chart>
                </div>
            </el-col>
            <el-col :span="12">
                <div class="card">
                    <doughnut-chart :height="400" :chart-data="pieDataCollection" :options="options"></doughnut-chart>                    
                </div>
            </el-col>
        </el-row>
        <el-row>
            <el-col :span="24">
                <div class="card">
                    <line-chart :height="200" :chart-data="lineDataCollection" :options="options"></line-chart>
                </div>
            </el-col>
        </el-row>
    </div>
</template>

<script>
import LineChart from './LineChart.js'
import BarChart from './BarChart.js'
import HorBarChart from './HorBarChart.js'
import RadarChart from './RadarChart.js'
import PieChart from './PieChart.js'
import DoughnutChart from './DoughnutChart.js'
export default {
    data() {
        return {
            options: {
                responsive: true,
                maintainAspectRatio: false
            },
            lineDataCollection: {
                labels: ['January', 'February'],
                datasets: [
                    {
                        label: 'Data One',
                        backgroundColor: 'rgba(254,120,100,0.6)',
                        data: [this.getRandomInt(), this.getRandomInt()]
                    }, {
                        label: 'Data One',
                        backgroundColor: 'rgba(0,240,120,0.6)',
                        data: [this.getRandomInt(), this.getRandomInt()]
                    }
                ]
            },
            barDataCollection: {
                labels: ['January', 'February'],
                datasets: [
                    {
                        label: 'Data One',
                        backgroundColor: '#f87979',
                        data: [this.getRandomInt(), this.getRandomInt()]
                    }
                ]
            },
            radarDataCollection: {
                labels: ['Running', 'Swimming', 'Eating', 'Cycling'],
                datasets: [{
                    label: 'Data One',
                    backgroundColor: 'rgba(223,222,124,0.6)',
                    data: [20, 12, 9, 17]
                }, {
                    label: 'Data Two',
                    backgroundColor: 'rgba(23,217,124,0.6)',
                    data: [10, 21, 12, 19]
                }]
            },
            pieDataCollection: {
                labels: ['One','Two','Three','Four'],
                datasets: [{
                    label: 'Data One',
                    backgroundColor: ['#FF0000','#B3EE3A','#009ACD','#EEEE00'],
                    data: [10,20,30,40]
                }]
            }
        }
    },
    methods: {
        getRandomInt() {
            return Math.floor(Math.random() * (50 - 5 + 1)) + 5
        }
    },
    components: {
        LineChart,
        BarChart,
        HorBarChart,
        RadarChart,
        PieChart,
        DoughnutChart
    }
}
</script>

<style lang="scss" scoped>
$themeColor: #20A0FF;
.chart-container {
    text-align: center;
    padding: 10px;
}

.card {
    margin: 0;
    margin-bottom: 10px;
    padding: 16px;
}
</style>