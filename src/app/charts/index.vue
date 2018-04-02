<template>
<div id="echartBox">
  <div ref="ipTop10Today" class="chartStyle" ></div>
  <div ref="ipTop10Month" class="chartStyle" ></div>
  <div ref="appTop10Today" class="chartStyle" ></div>
  <div ref="appTop10Month" class="chartStyle" ></div>
  <div ref="concurrency" class="chartStyle" ></div>
  <div ref="operatorTop10" class="chartStyle" ></div>
</div>
</template>
<style>
#echartBox {
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
}
.chartStyle {
  width: 600px;
  height: 300px;
  border: 1px solid #dddddd;
}
</style>
<script>
import echarts from "echarts";
import axios from "axios";
import { barGraph, lineGraph, pieGraph } from "../common/chartGraph.js";

let getIpTop10Today = function() {
  return axios.post("/statistics/top10/ipvisit", { type: 0 });
};
let getIpTop10Month = function() {
  return axios.post("/statistics/top10/ipvisit", { type: 1 });
};
let getAppTop10Today = function() {
  return axios.post("/statistics/top10/appvisit", { type: 0 });
};
let getAppTop10Month = function() {
  return axios.post("/statistics/top10/appvisit", { type: 1 });
};
let getConcurrency = function() {
  return axios.post("/statistics/concurrent");
};
let getOperatorTop10 = function() {
  return axios.post("/statistics/top10/appcount");
};
export default {
  name: "",
  data() {
    return {
      charts: "",
      ipTop10Today: [],
      ipTop10Month: [],
      appTop10Today: [],
      appTop10Month: [],
      concurrency: [],
      operatorTop10: []
    };
  },
  mounted() {
    this.initData();
  },
  methods: {
    initData() {
      var that = this;
      axios
        .all([
          getIpTop10Today(),
          getIpTop10Month(),
          getAppTop10Today(),
           getAppTop10Month(),
           getConcurrency(),
          getOperatorTop10()
        ])
        .then(
          axios.spread(function(d1,d2,d3,d4,d5,d6) {
            console.log(d1,d2,d3,d4,d5,d6,'123456')
            that.ipTop10Today = d1.data || [];
            that.ipTop10Month = d2.data || [];
            that.appTop10Today = d3.data || [];
            that.appTop10Month = d4.data || [];
            that.concurrency  = d5.data || [];
            that.operatorTop10 = d6.data || [];
            that.$nextTick(function() {
              that.drawPie();
            });
          })
        );
    },
    getIpTop10Today() {
      var that = this;
      $.ajax({
        type: "post",
        data: {
          type: 1
        },
        url: "/statistics/top10/ipvisit",
        dataType: "json",
        timeout: 20000,
        success: function(d) {
          if (d.code == 55) {
            showErrMsg(that, 55, "token验证失效，请重新登录");
            that.$router.push({ path: "/login" });
            return;
          }
          if (d.code == 99) {
            that.appData = [];
            return;
          }
          that.ipTop10Month = d.data || [];
          that.$nextTick(function() {
            that.drawPie();
          });
        },
        error: function(XMLHttpRequest, textStatus, errorThrown) {
          showErrMsg(that, textStatus, "请求失败" + XMLHttpRequest.status);
        }
      });
    },

    drawPie() {
      echarts.init(this.$refs.ipTop10Today).setOption(
        barGraph({
          title: "今日top10IP访问排行(次数)",
          xData: this.ipTop10Today.map(x => x.name),
          yData: this.ipTop10Today.map(y => y.value)
        })
      );

      echarts.init(this.$refs.ipTop10Month).setOption(
        barGraph({
          title: "最近24天top10IP访问排行(次数)",
          xData: this.ipTop10Month.map(x => x["_id"]),
          yData: this.ipTop10Month.map(y => y["count"])
        })
      );
      echarts.init(this.$refs.appTop10Today).setOption(
        barGraph({
          title: "今日top10 应用访问排行(次数)",
          xData: this.ipTop10Today.map(x => x.name),
          yData: this.ipTop10Today.map(y => y.value)
        })
      );
      echarts.init(this.$refs.appTop10Month).setOption(
        barGraph({
          title: "本月top10 应用访问排行(次数)",
          xData: this.ipTop10Today.map(x => x.name),
          yData: this.ipTop10Today.map(y => y.value)
        })
      );
      echarts.init(this.$refs.concurrency).setOption(
        lineGraph({
          title: "当前并发量（5秒次数统计/5）",
          xData: this.xData,
          yData: this.yData
        })
      );
      echarts.init(this.$refs.operatorTop10).setOption(
        pieGraph({
          title: "top10 应用商应用数量统计",
          pieData: this.ipTop10Today
        })
      );
    }
  }
};
</script>
