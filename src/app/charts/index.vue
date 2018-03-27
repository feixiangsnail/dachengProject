<template>
<div>


  <!--为echarts准备一个具备大小的容器dom-->
  <div id="main" ref="chartDom" style="width: 300px;height: 300px;"></div>

<div>
    <div ref="chartDom" style="width: 300px;height: 300px;"></div>
</div>
<div>
    <div ref="chartDom2" style="width: 300px;height: 300px;"></div>
</div>
<div>
    <div ref="chartDom3" style="width: 300px;height: 300px;"></div>
</div>







</div>

</template>
<script>
import echarts from "echarts";
export default {
  name: "",
  data() {
    return {
      charts: "",
      opinion: ["直接访问", "邮件营销", "联盟广告", "视频广告", "搜索引擎"],
      opinionData: [
        { value: 335, name: "直接访问" },
        { value: 310, name: "邮件营销" },
        { value: 234, name: "联盟广告" },
        { value: 135, name: "视频广告" },
        { value: 1548, name: "搜索引擎" }
      ]
    };
  },
  methods: {
    drawPie(id) {
        console.log(this,'this')
      echarts.init(this.$refs.chartDom).setOption({
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
            name: "访问来源",
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
    }
  },
  //调用
  mounted() {
    this.$nextTick(function() {
      this.drawPie("main");
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