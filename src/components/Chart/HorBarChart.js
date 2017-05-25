import { HorizontalBar, mixins } from 'vue-chartjs'
const { reactiveProp } = mixins

export default HorizontalBar.extend({
  mixins: [reactiveProp],
  props: ['options'],
  mounted () {
    this.renderChart(this.chartData, this.options)
  }
})