<template>
<div id="operatorPage">
  <el-table :data="logData" border style="width: 100%">
    <el-table-column prop="OPId" label="运营商ID"></el-table-column>
    <el-table-column prop="APId" label="应用ID"></el-table-column>    
    <el-table-column prop="Type" label="应用协议类型"> </el-table-column>
    <el-table-column prop="VisitTime" :formatter="formatDate" label="访问时间"></el-table-column>
    <el-table-column prop="Ip"  label="调用者IP"></el-table-column>
    <el-table-column prop="Port"  label="调用者端口"></el-table-column>    
  </el-table>
  <div>
    <el-select v-if="isSuper"  v-model="selectToken" filterable placeholder="请选择" @change="getAppList">
      <el-option v-for="item in OperatorList" :key="item.Token" :label="item.OPName" :value="item.Token">
    </el-option>
  </el-select>
  <el-select v-model="selectAppId" filterable placeholder="请选择" @change="getLogList">
    <el-option
      v-for="item in appList"
      :key="item.APId"
      :label="item.APName"
      :value="item.APId">
    </el-option>
  </el-select>
  </div>
<el-pagination background v-show="listCount" layout="prev, pager, next" :total="listCount"
@current-change="changePage" :current-page="currentPage" :page-size="pageSize"
></el-pagination>
</div>
</template>
<style>
.el-pagination {
  text-align: center;
}
</style>
<script>
import { showErrMsg, formatDate } from "../common/utils.js";
export default {
  data() {
    return {
      currentPage: 1,
      pageSize: 2,
      listCount: null,
      logData: [],
      appList: [],
      isSuper: true,
      selectToken: "", //选中的运营商token
      OperatorList: [
        {
          Token: "11111",
          OPName: "xiaoma"
        }
      ],
      selectAppId: ""
    };
  },
  created() {
    this.isSuper = this.$store.state.is_super;
    this.selectToken = this.$store.state.usr_token;
    if (this.isSuper) {
      this.getOperatorList();
    }
    this.getAppList();
    
  },
  methods: {
    //格式化时间
    formatDate(t) {
      return formatDate(parseInt(t.VisitTime));
    },
    //跳转到第几页
    changePage(currentPage) {
      this.currentPage = currentPage;
      this.getAppList();
    },
    //获取运营商列表
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
        },
        error: function(XMLHttpRequest, textStatus, errorThrown) {
          showErrMsg(that, textStatus, "请求失败" + XMLHttpRequest.status);
          console.log(XMLHttpRequest.status, "XMLHttpRequest.status");
        }
      });
    },
    //获取应用列表
    getAppList() {      
      var that = this;
      $.ajax({
        type: "post",
        data: {
          Token: this.selectToken,
          Index: this.currentPage,
          PageSize: this.pageSize
        },
        url: "/application/getlist_index",
        dataType: "json",
        timeout: 20000,
        success: function(d) {
          if (d.code == 99) {
            that.appList = [];
            return;
          }
          that.appList = d.data["List"] || [];
          that.selectAppId = d.data['List'][0].APId;
          console.log(that.appList,'applist')

          that.getLogList();
        },
        error: function(XMLHttpRequest, textStatus, errorThrown) {
          showErrMsg(that, textStatus, "请求失败" + XMLHttpRequest.status);
          console.log(XMLHttpRequest.status, "XMLHttpRequest.status");
        }
      });
    },
    getLogList() {
      console.log(this.selectAppId,',this.selectAppId')
      console.log("getLogList");
      var that = this;
      $.ajax({
        type: "post",
        data: {
          Index: this.currentPage,
          PageSize: this.pageSize,
          APId: this.selectAppId
        },
        url: "/applicationrecord/getlist_index",
        dataType: "json",
        timeout: 20000,
        success: function(d) {
          console.log(d,'ddddd')
          if (d.code == 99) {
            that.logData = [];
            return;
          }
          that.logData = d.data["List"] || [];
        },
        error: function(XMLHttpRequest, textStatus, errorThrown) {
          showErrMsg(that, textStatus, "请求失败" + XMLHttpRequest.status);
          console.log(XMLHttpRequest.status, "XMLHttpRequest.status");
        }
      });
    }
  }
};
</script>