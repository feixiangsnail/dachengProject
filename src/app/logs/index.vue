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
    <el-select v-if="isSuper"  v-model="selectOPId" filterable placeholder="请选择" @change="getAppList">
      <el-option v-for="(item,index) in OperatorList" :key="index" :label="item.OPName" :value="item.OPId">
    </el-option>
  </el-select>
  <el-select v-model="selectAppId" filterable placeholder="请选择" @change="getLogList">
    <el-option
      v-for="(item,index) in appList"
      :key="index" 
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
      selectOPId: "", //选中的运营商token
      OperatorList: [],
      selectAppId: ""
    };
  },
  created() {
    this.isSuper = this.$store.state.is_super;
    this.selectOPId = this.$store.state.OPId;
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
       
        }
      });
    },
    //获取应用列表
    getAppList() {      
      var that = this;
      $.ajax({
        type: "post",
        data: {
          OPId: this.selectOPId,
          Index: this.currentPage,
          PageSize: this.pageSize
        },
        url: "/application/getlist_index",
        dataType: "json",
        timeout: 20000,
        success: function(d) {
        
          if (d.code == 99) {
            that.selectAppId ='';
            that.appList = [];
            return;
          }
          that.appList = d.data["List"] || [];
          that.selectAppId = d.data['List'][0].APId;
          

          that.getLogList();
        },
        error: function(XMLHttpRequest, textStatus, errorThrown) {
          showErrMsg(that, textStatus, "请求失败" + XMLHttpRequest.status);
         
        }
      });
    },
    getLogList() {
     
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
        
          if (d.code == 99) {
            that.logData = [];
            return;
          }
          that.listCount = d.data.Count;
          that.logData = d.data["List"] || [];
        },
        error: function(XMLHttpRequest, textStatus, errorThrown) {
          showErrMsg(that, textStatus, "请求失败" + XMLHttpRequest.status);
        
        }
      });
    }
  }
};
</script>