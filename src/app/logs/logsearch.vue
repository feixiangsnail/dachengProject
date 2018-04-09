<template>
<div id="operatorPage">
  <p class="tit">
    日志查询
  </p>
  <search-header :search="searchHeaderList" :starttime="starttime" :endtime="endtime" :keywords="keywords"></search-header>
  <el-table style="width: 100%" :data="[null]">
    <el-table-column  label="访问时间">
       <template slot-scope="scope">
          <el-date-picker
            v-model="starttime"
            type="datetime"
            placeholder="选择日期时间">
          </el-date-picker>
        </template>
    </el-table-column>
 <el-table-column  label="访问时间">
       <template slot-scope="scope">
          <el-date-picker
            v-model="endtime"
            type="datetime"
            placeholder="选择日期时间">
          </el-date-picker>
        </template>
    </el-table-column>

    <el-table-column  label="ip关键字">
       <template slot-scope="scope">
          <el-input v-model="key" placeholder=""></el-input> 
        </template>
    </el-table-column>
   
      <el-table-column  label="操作" >
              <template slot-scope="scope">
                <el-button type="primary" @click="search" :disabled="disableSearch">
                  查询
                </el-button>
              </template>
       </el-table-column>
  </el-table>
  <el-table :data="logData" border style="width: 100%" v-show="logData.length>0">
   
    <el-table-column prop="Type" label="应用协议类型"> </el-table-column>
    <el-table-column prop="VisitTime" :formatter="formatDate" label="访问时间">
    </el-table-column>
    <el-table-column prop="Ip"  label="调用者IP"></el-table-column>
    <el-table-column prop="Port"  label="调用者端口"></el-table-column>    
  </el-table>
  <div>
  </div>
<el-pagination background v-show="listCount" layout="prev, pager, next" :total="listCount"
@current-change="changePage" :current-page="currentPage" :page-size="pageSize"
></el-pagination>
</div>
</template>
<style>

</style>
<script>
import { showErrMsg, formatDate, pagesNum } from "../common/utils.js";
console.log(pagesNum - 2, "pagesnum");
export default {
  data() {
    return {
      keywords: "",
      starttime: "",
      endtime: "",
      disableSearch: false,
      currentPage: 1,
      pageSize: pagesNum - 2,
      listCount: null,
      logData: [],
      appList: [],
      isSuper: true,
      selectOPId: "", //选中的运营商token
      OperatorList: [],
      selectAppId: "",
      starttime: "",
      endtime: "",
      key: ""
    };
  },
  components: {
    SearchHeader: require("../components/searchHeader.vue")
  },
  methods: {
    searchHeaderList(){
      console.log('chaxun')
    },
    //格式化时间
    formatDate(t) {
      return formatDate(parseInt(t.VisitTime));
    },
    //跳转到第几页
    changePage(currentPage) {
      this.currentPage = currentPage;

      this.searchLog();
    },
    search() {
      this.currentPage = 1;
      this.searchLog();
    },
    searchLog() {
      //  this.disableSearch = true;
      var that = this;

      let starttime = new Date(this.starttime).getTime();
      let endtime = new Date(this.endtime).getTime();
      console.log(starttime, endtime, this.key, "key");
      $.ajax({
        type: "post",
        data: {
          starttime: starttime,
          endtime: endtime,
          key: this.key,
          Index: this.currentPage,
          Pagesize: parseInt(this.pageSize)
        },
        url: "/statistics/logs",
        dataType: "json",
        timeout: 20000,
        success: function(d) {
          if (d.code == 99) {
            that.logData = [];
            return;
          }
          that.logData = d.data.List || [];
          that.listCount = d.data.Count;
          console.log(d, "dddddlogs");
        },
        error: function(XMLHttpRequest, textStatus, errorThrown) {
          showErrMsg(that, textStatus, "请求失败" + XMLHttpRequest.status);
        }
      });
    }
  }
};
</script>