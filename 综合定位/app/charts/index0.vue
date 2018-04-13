<template>
  <div>
       <el-select v-if="isSuper"  v-model="selectOPId" filterable placeholder="请选择" @change="changeOperator">
      <el-option v-for="item in OperatorList"  :label="item.OPName" :value="item.OPId">
    </el-option>
  </el-select>

      <table id="tableExcel" width="100%" border="1" cellspacing="0" cellpadding="0">
    <tr>
        <td colspan="2" align="center">应用调用次数</td>
    </tr>
    <tr>
        <td>应用ID</td>
        <td>调用次数</td>
       
    </tr>
    <tr v-for = "item in appCall">
        <td>{{item._id}}</td>
        <td>{{item.count}}</td>
        
    </tr>
   
</table>
  </div>
</template>
<script>
import {
  showErrMsg,
  formatDate,
  deepClone,
  isPattern,
  pagesNum
} from "../common/utils.js";
export default {
  data() {
    return {
      appCall: [],
      maxTime: [],
      appIp: [],
      count: [],
      OperatorList: [],
      selectOPId: ""
    };
  },
  created() {
    this.isSuper = this.$store.state.is_super;
    this.selectOPId = this.$store.state.OPId;

    if (this.isSuper) {
      this.getOperatorList();
    }
    this.getAppCall();
    this.getAppIp();
    this.getMaxTime();
    this.getCount();
  },

  methods: {
    changeOperator() {
      this.getAppCall();
    },
    getOperatorList() {
      var that = this;
      $.ajax({
        type: "post",
        data: null,
        url: "/operators/getlist_index",
        dataType: "json",
        timeout: 20000,
        success: function(d) {
          if (d.code == 99) {
            that.OperatorList = [];
            return;
          }
          that.OperatorList = d.data["List"] || [];
          console.log(that.OperatorList, "that.OperatorList");
          console.log(that.$store.state.OPId, "that.$store.state.OPId");
        },
        error: function(XMLHttpRequest, textStatus, errorThrown) {
          showErrMsg(that, textStatus, "请求失败" + XMLHttpRequest.status);
        }
      });
    },
    getCount() {
      let that = this;
      $.ajax({
        type: "post",
        data: {
          opid: this.selectOPId,
          token: this.$store.state.usr_token
        },
        url: "/statistics/maxtime",
        dataType: "json",
        timeout: 20000,
        success: function(d) {
          if (d.code == 55) {
            showErrMsg(that, 55, "token验证失效，请重新登录");
            that.$router.push({ path: "/login" });
            return;
          }
          that.count = d.data || [];
          console.log(d, "appip");
        },
        error: function(XMLHttpRequest, textStatus, errorThrown) {
          showErrMsg(that, textStatus);
        }
      });
    },
    getMaxTime() {
      let that = this;
      $.ajax({
        type: "post",
        data: {
          opid: this.selectOPId,
          token: this.$store.state.usr_token
        },
        url: "/statistics/maxtime",
        dataType: "json",
        timeout: 20000,
        success: function(d) {
          if (d.code == 55) {
            showErrMsg(that, 55, "token验证失效，请重新登录");
            that.$router.push({ path: "/login" });
            return;
          }
          that.maxTime = d.data || [];
          console.log(d, "appip");
        },
        error: function(XMLHttpRequest, textStatus, errorThrown) {
          showErrMsg(that, textStatus);
        }
      });
    },

    getAppIp() {
      let that = this;
      $.ajax({
        type: "post",
        data: {
          opid: this.selectOPId,
          token: this.$store.state.usr_token
        },
        url: "/statistics/top10/app_ip",
        dataType: "json",
        timeout: 20000,
        success: function(d) {
          if (d.code == 55) {
            showErrMsg(that, 55, "token验证失效，请重新登录");
            that.$router.push({ path: "/login" });
            return;
          }
          that.appCall = d.data || [];
          console.log(d, "appip");
        },
        error: function(XMLHttpRequest, textStatus, errorThrown) {
          showErrMsg(that, textStatus);
        }
      });
    },
    getAppCall() {
      let that = this;
      $.ajax({
        type: "post",
        data: {
          opid: this.selectOPId,
          token: this.$store.state.usr_token
        },
        url: "/statistics/getappcall",
        dataType: "json",
        timeout: 20000,
        success: function(d) {
          if (d.code == 55) {
            showErrMsg(that, 55, "token验证失效，请重新登录");
            that.$router.push({ path: "/login" });
            return;
          }
          that.appCall = d;
          console.log(d, "chart");
        },
        error: function(XMLHttpRequest, textStatus, errorThrown) {
          showErrMsg(that, textStatus);
        }
      });
    }
  }
};
</script>