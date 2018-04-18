<template>
<div id="opsPage">
<p class="tit">
    运维日志
  </p>
  <div class="clearfix">
      <div class="selectLeft">
        <el-select v-if="isSuper"  v-model="selectOPId" filterable placeholder="请选择" @change="getAppList">
          <el-option v-for="(item,index) in OperatorList" :key="index" :label="item.OPName" :value="item.OPId">
        </el-option>
      </el-select>
      <el-select v-model="selectAppId" filterable placeholder="请选择" @change="selectApp">
        <el-option
          label="所有记录"
          value="">
        </el-option>
        <el-option
          v-for="(item,index) in appList"
          :key="index" 
          :label="item.APName"
          :value="item.APId">
        </el-option>
      </el-select>
      </div>
 
   <div class="searchInfo">
      <el-date-picker
            v-model="starttime"
            type="datetime"
            :editable = "false"
            placeholder="选择开始时间">
      </el-date-picker>
       <el-date-picker
            v-model="endtime"
            type="datetime"
            :editable = "false"
            placeholder="选择截止时间">
      </el-date-picker>
      关键字：
      <el-input v-model="keywords" class="keywords" placeholder="请输入关键字"></el-input>
      <el-button type="primary" :disabled="disableSearch" @click="getLogList">搜索</el-button>
  </div>
 </div>

  <el-table :data="logData" style="width: 100%">
    <!-- <el-table-column prop="OPName" label="运营商名称"></el-table-column> -->
    <el-table-column prop="APName" label="应用名称"></el-table-column>    
    <el-table-column prop="Type" label="应用协议类型"> </el-table-column>
    <el-table-column prop="VisitTime" :formatter="formatDate" label="访问时间"></el-table-column>
    <el-table-column prop="Ip"  label="调用者IP"></el-table-column>
    <el-table-column prop="Port"  label="调用者端口"></el-table-column>    
    <el-table-column prop="Cost"  label="调用时长（毫秒）"></el-table-column>
      <el-table-column label="操作" width="150">
    <template slot-scope="scope" >       
      <el-button  @click="showDetail(scope)">查看</el-button>
      
    </template>
  </el-table-column>
  </el-table>
   <el-dialog  v-if="dialogVisible" :visible.sync="dialogVisible" width="30%">
  
  <div>
    <p class="tit tit2"> 请求参数</p>  
    <p v-for="(value,key,index) in selectLog.row.Query">
     <span v-if=" key != 'picture' ">
          {{key}}:{{value}}
         </span>
         <span v-else>
          <img  :src=" 'data:image/png;base64,' + value" alt="">
          
         </span>
    </p>
  </div>

 <div>
  
   <p class="tit tit2"> 返回结果</p>  
   <p v-for="(value,key,index) in selectLog.row.Result">
    
      <span v-if=" key != 'result' ">
        <span v-if=" key != 'picture' ">
          {{key}}:{{value}}
         </span>
         <span v-else>
          <img  :src=" 'data:image/png;base64,' + value" alt="">
          
         </span>
         
        </span> 
        <span v-else>
          {{key}}:
          <span>
            {{value[0]}}
          </span>
        </span>
      
    </p>
  </div>

</el-dialog>
<el-pagination background v-show="listCount" layout="prev, pager, next" :total="listCount"
@current-change="changePage" :current-page="currentPage" :page-size="pageSize"
></el-pagination>
</div>
</template>
<style>
/* .el-pagination {
  text-align: center;
} */
</style>
<script>
import { showErrMsg, formatDate, pagesNum } from "../common/utils.js";
export default {
  data() {
    return {
      selectLog: "",
      dialogVisible: false,
      disableSearch: false,
      keywords: "",
      starttime: "",
      endtime: "",
      currentPage: 1,
      pageSize: pagesNum,
      listCount: 1,
      logData: [],
      appList: [],
      isSuper: true,
      selectOPId: "", //选中的运营商token
      OperatorList: [],
      selectAppId: "",
      isFirst: true
    };
  },
  components: {
    SearchHeader: require("../components/searchHeader.vue")
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
    showDetail(scope) {
      this.dialogVisible = true;
      this.selectLog = scope;

      if (typeof this.selectLog.row.Query == "string") {
        try {
          this.selectLog.row.Query = JSON.parse(this.selectLog.row.Query);
        } catch (error) {}
      }
      try {
        if (this.selectLog.row.Query.p1)
          this.selectLog.row.Query.picture = this.selectLog.row.Query.p1;
        delete this.selectLog.row.Query.p1;
      } catch (e) {}

      if (typeof this.selectLog.row.Result == "string") {
        try {
          this.selectLog.row.Result = JSON.parse(this.selectLog.row.Result);
        } catch (error) {}
      }

      try {
        if (this.selectLog.row.Result.result[0].data.XP)
          this.selectLog.row.Result.picture = this.selectLog.row.Result.result[0].data.XP;
        delete this.selectLog.row.Result.result[0].data.XP;
      } catch (e) {}
    },
    //格式化时间
    formatDate(t) {
      return formatDate(parseInt(t.VisitTime));
    },
    //跳转到第几页
    changePage(currentPage) {
      this.currentPage = currentPage;
      this.getLogList();
    },
    selectApp() {
      this.currentPage = 1;
      this.getLogList();
    },
    //获取运营商列表
    getOperatorList() {
      var that = this;
      $.ajax({
        type: "post",
        data: {
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
          opid: this.selectOPId,
          token: this.$store.state.usr_token
        },
        url: "/application/getlist",
        dataType: "json",
        timeout: 20000,
        success: function(d) {
          if (d.code == 55) {
            showErrMsg(that, 55, "token验证失效，请重新登录");
            that.$router.push({ path: "/login" });
            return;
          }
          if (d.code == 99) {
            that.selectAppId = "";
            that.appList = [];
            return;
          }
          that.appList = d.data["List"] || [];

          that.currentPage = 1;

          if (that.isFirst) {
            that.getLogList();
            that.isFirst = false;
          }
        },
        error: function(XMLHttpRequest, textStatus, errorThrown) {
          showErrMsg(that, textStatus, "请求失败" + XMLHttpRequest.status);
        }
      });
    },

    ///statistics/logs
    getLogList() {
      var that = this;
      this.disableSearch = true;
      let starttime = new Date(this.starttime).getTime();
      let endtime = new Date(this.endtime).getTime();

      let postData = {
        starttime: starttime,
        endtime: endtime,
        Index: this.currentPage,
        PageSize: parseInt(this.pageSize),
        opid: this.selectOPId,
        apid: this.selectAppId,
        token: this.$store.state.usr_token,
        key: this.keywords
      };

      $.ajax({
        type: "post",
        data: postData,
        url: "/statistics/opslog",
        dataType: "json",
        timeout: 20000,
        success: function(d) {
          that.disableSearch = false;

          if (d.code == 55) {
            showErrMsg(that, 55, "token验证失效，请重新登录");
            that.$router.push({ path: "/login" });
            return;
          }
          if (d.code == 99) {
            that.logData = [];
            return;
          }
          that.listCount = d.data.Count;
          that.logData = d.data["List"] || [];
        },
        error: function(XMLHttpRequest, textStatus, errorThrown) {
          that.disableSearch = false;
          showErrMsg(that, textStatus, "请求失败" + XMLHttpRequest.status);
        }
      });
    }
  }
};
</script>