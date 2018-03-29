<template>
<div id="echartBox">
  <div ref="applyUsers" class="chartStyle" style="width: 400px;height: 300px; border:1px solid #dddddd"></div>
  <div ref="appCalls" class="chartStyle" style="width: 400px;height: 300px; border:1px solid #dddddd"></div>
</div>

</template>
<style>
#echartBox{
  display:flex;
}
.chartStyle{
    width:400px;
    height:300px;
    border:1px solid #dddddd;
    float:left;
    margin-left:10px;
  }

</style>

<script>
import echarts from "echarts";
export default {
  name: "",
  data() {
    return {
      charts: "",
      opinion: ["微信", "知乎", "支付宝", "QQ", "网易云音乐"],
      opinionData: [
        { value: 1548, name: "微信" },
        { value: 310, name: "知乎" },
        { value: 934, name: "支付宝" },
        { value: 635, name: "QQ" },
        { value: 335, name: "网易云音乐" }
      ]
    };
  },
  methods: {
    drawPie() {
   
      echarts.init(this.$refs.applyUsers).setOption({
        title: {
                text: '应用程序使用人数',
                x:'center',
                y:'bottom'
            },
        tooltip: {
          trigger: "item",
          formatter: "{a}<br/>{b}:{c} ({d}%)"
        },
        legend: {
          orient: "vertical",
          x: "left",
          data: this.opinion
        },
        series: [
          {
            name: "用户数量",
            type: "pie",
            radius: ["30%", "40%"],
            avoidLabelOverlap: false,
            label: {
              normal: {
                show: false,
                position: "center"
              }
              //    emphasis: {
              //      show: true,
              //      textStyle: {
              //        fontSize: '30',
              //        fontWeight: 'blod'
              //      }
              //    }
            },
            //  labelLine: {
            //    normal: {
            //      show: false
            //    }
            //  },
            data: this.opinionData
          }
        ]
      });



      echarts.init(this.$refs.appCalls).setOption({
         title: {
                text: '应用调用次数'
            },
            tooltip: {},
            legend: {
                data:['用户调用次数']
            },
            xAxis: {
                data: ["微信", "知乎", "支付宝", "QQ", "网易云音乐"]
            },
            yAxis: {},
            series: [{
                name: '销量',
                type: 'bar',
                data: [33, 90, 36, 10,  20]
            }]
      });
    }
  },
  //调用
  mounted() {
    this.$nextTick(function() {
      this.drawPie();
    });
  }
};
</script>
<style scoped>
* {
  margin: 0;
  padding: 0;
  list-style: none;
}
</style>