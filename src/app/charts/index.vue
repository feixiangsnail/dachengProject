<template>
<div>
          <el-select v-if="isSuper"  v-model="selectOPId" filterable placeholder="请选择" @change="changeOperator">
      <el-option v-for="item in OperatorList"  :label="item.OPName" :value="item.OPId">
    </el-option>
  </el-select>

      <div class="chartTitle">
          应用调用次数
      </div>
     <el-table
      :data="appCall"
      style="width:100%">
      <el-table-column
        prop="APName"
        label="应用名称"
       >
      </el-table-column>
      <el-table-column
        prop="count"
        label="调用次数"
        >
      </el-table-column>
      
    </el-table>


      <div class="chartTitle">
          TOP10调用次数最高的应用和每个应用中TOP10的IP
      </div>
     <!-- <el-table
      :data="appIp"
      style="width:100%">
      <el-table-column
        prop="name"
        label="应用名称"
       >
      </el-table-column>
      
       <el-table-column
       prop="ips"
        label="ip列表"
        >
         <template slot-scope="scope">
                      <el-input v-model="appIp.ips" placeholder="请输入内容"></el-input>  
                    </template> 
      </el-table-column>





    </el-table> -->

     <table id="tableExcel" width="100%" border="1" cellspacing="0" cellpadding="0">
    
    <tr style="height:50px;background:#cde9ff">
        <th >应用名称</th>
        <th>调用次数</th>
        <th>ip列表</th>
       
    </tr>
    <tr v-for = "item in appIp" >
        <td>{{item.name? item.name.APName:item.name}}</td>
        <td>{{item.name? item.name.Call:item.name}}</td>
       
        <td>

<el-collapse v-model="item.name? item.name.APName:item.name" >
  <el-collapse-item  :name="item.name? item.name.APName:item.name">
    <div v-for = 'i in item.ips'>{{i}}</div>
   
  </el-collapse-item>
 
</el-collapse>



        </td>
    </tr>
   
</table>


      <div class="chartTitle">
          TOP10接口调用时间

      </div>
     <el-table
      :data="maxTime"
      style="width:100%">
      <el-table-column
        prop="_id"
        label="接口"
       >
      </el-table-column>
      <el-table-column
        prop="time"
        label="调用时间"
        >
      </el-table-column>
      
    </el-table>

      <div class="chartTitle">
          总运营，总应用和总调用次数
      </div>
     <el-table
      :data="count"
      style="width:100%">
      <el-table-column
        prop="OPCount"
        label="总运营调用次数"
       >
      </el-table-column>
      <el-table-column
        prop="APPCount"
        label="总应用调用次数"
        >
      </el-table-column>
      <el-table-column
        prop="Count"
        label="月总调用次数"
        >
      </el-table-column>
      <el-table-column
        prop="WCount"
        label="周调用次数"
        >
      </el-table-column>
    </el-table>







    </div>
  </template>
<style>
#tableExcel tr {
  height: 50px;
}
#tableExcel tr > th,
#tableExcel tr > td {
  text-align: center;
  line-height: 50px;
}
.chartTitle {
  margin-top: 10px;
  width: 100%;
  height: 30px;
  line-height: 30px;
  text-align: center;
  font-weight: 600;
  font-size: 16px;
  background: gray;
}
</style>

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
      activeNames: ["1"],
      appCall: [null],
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
        data:  {
          opid: this.selectOPId,
          token: this.$store.state.usr_token
        },
        url: "/operators/getlist",
        dataType: "json",
        timeout: 20000,
        success: function(d) {

          if (d.code == 55) {
            showErrMsg(that, 55, "token验证失效，请重新登录");
            that.$router.push({ path: "/login" });
            return;
          }
          if (d.code == 99) {
            that.OperatorList = [];
            return;
          }
        
          that.OperatorList = d.data || [];
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
        url: "/statistics/count",
        dataType: "json",
        timeout: 20000,
        success: function(d) {
          if (d.code == 55) {
            showErrMsg(that, 55, "token验证失效，请重新登录");
            that.$router.push({ path: "/login" });
            return;
          }

          that.count = d.data || [];
          console.log(d, "that.count");
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
          console.log(that.maxTime, "maxTime");
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
          that.appIp = d.data.app || [];

          console.log(that.appIp, d, "appip");
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