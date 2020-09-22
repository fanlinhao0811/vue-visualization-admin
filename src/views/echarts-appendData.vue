<style>
</style>
<template>
  <div>
    <div id="main"
         style="width: 600px;height:400px;"></div>
  </div>
</template>

<script>

export default {
  name: 'app',
  data () {
    return {
      myChart: null,
      interval: null
    };
  },
  computed: {
  },
  /* eslint-disable */
  created () {
  },
  mounted () {
    this.drawChart();
  },
  methods: {
    drawChart () {
      this.myChart = this.$echarts.init(document.getElementById("main"));
      let option = {
        // animation: true,
        xAxis: { type: 'time', min: 0, max: 1609430400000 },
        yAxis: {},

        series: [{
          name: '模拟数据0',
          data: [[0, 1], [1, 20]],
          type: 'line',
          smooth: true,
          symbol: 'none',
          sampling: function (windowData) {
            return windowData[0]
          }

        }]
      };
      this.myChart.setOption(option);
      let i = 0;
      let j = 0;
      let len = 1000;
      this.interval = setInterval(() => {
        let data = [];
        i++;
        for (j = 1; j < len; j++) {
          data.push([new Date().getTime() + i * len, Math.random() * 10])
        }
        console.time(i * len + j);

        this.myChart.appendData({
          seriesIndex: 0,
          data: data
        });
        console.log(data)

        if (i * len + j > 14000) {
          clearInterval(this.interval);
          //  this.myChart.setOption({ dataZoom: [
          //     {
          //         show: true
          //     }
          // ]});
        }

        // this.myChart.resize();
        console.timeEnd(i * len + j)
      }, 1000);
    }
  },
  components: {
  },
}
</script>
