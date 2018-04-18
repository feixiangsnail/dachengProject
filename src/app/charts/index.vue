<template>
  <div id="chart">
      <div style="margin-bottom:10px">          
       <el-button type="primary" v-if="$store.state.is_super" @click="openOperatorApp">选择服务申请方及应用</el-button>
       <el-button type="primary" @click="reset">重置</el-button>
       <div style="float:right">     
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
        
              <el-button type="info" v-for="item in dateTypes" :key="item"
              @click="chooseDateType(item)" :class="selectDateType.indexOf(item)==-1? '':'selectDate'">{{item}}
              </el-button>
             
      <el-button type="primary" :disabled="disableSearch" @click="searchAll">搜索</el-button>
  </div>
       </div>  

        <el-dialog
  title="选择服务申请方及应用"
  :visible.sync="dialogVisible"
  width="60%"
  >
  
       <table id="tableExcel" width="100%" border="1" cellspacing="0" cellpadding="0" style="text-align:center">    
    <tr style="height:50px">
        <td>服务申请方</td>
        <td>应用名称</td>        
    </tr>
    <tr v-for="i in cloneOperatorList" style="height:50px">
        <td>{{i.OPName}}</td>
        <td>
          <el-select v-model="i.selectAppList" multiple placeholder="请选择" style="width:100%">
             <el-option v-for="(item,index) in i.appList" :value="item.APName" ></el-option>

           </el-select>
          </td>             
    </tr>
</table>

<div slot="footer" class="dialog-footer tc">
    
    <!-- <el-button type="primary" @click="saveSelectApp">保存</el-button> -->
  </div>

</el-dialog>

      <table id="tableExcel" class="tc" width="100%" border="1" cellspacing="0" cellpadding="0">    
    <tr style="background:#cde9ff; height:40px">
        <td>服务申请方</td>
        <td>应用名称</td>
    
        <td>总次数</td>
        <td>失败</td>
        <td>成功</td>  

        <td v-if="isweek">总次数（周）</td>
        <td v-if="isweek">失败（周）</td>
        <td v-if="isweek">成功（周）</td>
        
         <td v-if="isMonth">总次数（月）</td>
        <td v-if="isMonth">失败（月）</td>
        <td v-if="isMonth">成功（月）</td>

         <td v-if="isSeason">总次数（季）</td>
        <td v-if="isSeason">失败（季）</td>
        <td v-if="isSeason">成功（季）</td>

         <td v-if="isHalfYear">总次数（半年）</td>
        <td v-if="isHalfYear">失败（半年）</td>
        <td v-if="isHalfYear">成功（半年）</td>

         <td v-if="isYear">总次数（年）</td>
        <td v-if="isYear">失败（年）</td>
        <td v-if="isYear">成功（年）</td>
        
       
    </tr>
    <tr v-for="(i,index) in formatApps" >
        
        <td :rowspan="i.len" v-if="(formatApps[index-1]&&(formatApps[index-1].OPName!==i.OPName))">{{i.OPName}}</td>
        <td v-else-if="index == 0" :rowspan="i.len">{{i.OPName}}</td>
        <td>{{i.APName}}</td>

        <td >{{i.Count}}</td>
        <td >{{i.SCount}}</td>
        <td >{{i.ECount}}</td>  

        <td v-if="isweek">{{i.WCount}}</td>
        <td v-if="isweek">{{i.WSCount}}</td>
        <td v-if="isweek">{{i.WECount}}</td>
        
        <td v-if="isMonth">{{i.MCount}}</td>
        <td v-if="isMonth">{{i.MSCount}}</td>
        <td v-if="isMonth">{{i.MECount}}</td>

        <td v-if="isSeason">{{i.QCount}}</td>
        <td v-if="isSeason">{{i.QSCount}}</td>
        <td v-if="isSeason">{{i.QECount}}</td>

        <td v-if="isHalfYear">{{i.HCount}}</td>
        <td v-if="isHalfYear">{{i.HSCount}}</td>
        <td v-if="isHalfYear">{{i.HECount}}</td>

        <td v-if="isYear">{{i.YCount}}</td>
        <td v-if="isYear">{{i.YSCount}}</td>
        <td v-if="isYear">{{i.YECount}}</td>    

       
    </tr>
</table>
  </div>
</template>
<style>
#chart .selectDate {
  background: green;
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
      dateTypes: ["周", "月", "季", "半年", "年"],
      selectDateType: ["周"],
      isweek: true,
      isMonth: false,
      isSeason: false,
      isHalfYear: false,
      isYear: false,
      cloneOperatorList: [],
      isFirst: true,
      // OperatorList: [
      //   {
      //     opName: "",
      //     selectAppList: [],
      //     appList: [
      //       {
      //         appName: "weixin",
      //         Count: [
      //           { WCount: 0, WSCount: 0, WECount: 0 },
      //           { MCount: 0, MSCount: 0, MECount: 0 },
      //           { QCount: 0, QSCount: 0, QECount: 0 },
      //           { HCount: 0, HSCount: 0, HECount: 0 },
      //           { YCount: 0, YSCount: 0, YECount: 0 }
      //         ]
      //       },
      //       {
      //         appName: "tianya",
      //         Count: [
      //           { WCount: 0, WSCount: 0, WECount: 0 },
      //           { MCount: 0, MSCount: 0, MECount: 0 },
      //           { QCount: 0, QSCount: 0, QECount: 0 },
      //           { HCount: 0, HSCount: 0, HECount: 0 },
      //           { YCount: 0, YSCount: 0, YECount: 0 }
      //         ]
      //       }
      //     ]
      //   },
      //   {
      //     opName: "",
      //     selectAppList: [],
      //     appList: []
      //   },
      //   {
      //     opName: "",
      //     selectAppList: [],
      //     appList: []
      //   }
      // ],
      formatApps: [],
      formatOperators: [],
      dialogVisible: false,
      starttime: "",
      endtime: "",
      disableSearch: false,
      OperatorList: [],
      selectOPId: "",
      isSuper: true
    };
  },
  created() {
    this.isSuper = this.$store.state.is_super;
    this.selectOPId = this.$store.state.OPId;
    this.searchAll();
    
  },
  methods: {
    chooseDateType(i) {
      let tempPos = this.selectDateType.indexOf(i);
      if (tempPos != -1) this.selectDateType.splice(tempPos, 1);
      else this.selectDateType.push(i);
      this.showSelect();
    },
    saveSelectApp() {
      console.log(this.operatorList);
      this.dialogVisible = false;
    },
    openOperatorApp() {
      this.dialogVisible = true;
      console.log("open");
    },
    reset() {
      
      this.$router.go(0);
    },
    searchAll() {
      this.formatApps = [];
      let that = this;
      let searchData = [];
      let starttime = new Date(this.starttime).getTime();
      let endtime = new Date(this.endtime).getTime();
      this.cloneOperatorList.forEach(v => {
        if (v.selectAppList.length > 0) {
          searchData.push({
            OPName: v.OPName,
            selectAppList: v.selectAppList
          });
        }
      });
      console.log(searchData, "searchdata");
      $.ajax({
        type: "post",
        data: {
          starttime: starttime,
          endtime: endtime,
          operatorList: JSON.stringify(searchData)
        },
        url: "/statistics/statement_params",
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
          //如果不是管理员，那么将登录者的信息从总数据中取出来单独展示
          console.log(that.isSuper,'issuper')
          if (!that.isSuper) {
            that.OperatorList = that.OperatorList.filter(function(v) {
              return v.OPId == that.$store.state.OPId;
            });
          }

          that.OperatorList.forEach(v => {
            that.formatOperators.push({
              len: v.appList.length,
              OPName: v.OPName
            });
            v.appList.forEach(x => {
              (x.len = v.appList.length), (x.OPName = v.OPName);
              that.formatApps.push(x);
            });
          });

          console.log(that.formatOperators, "that.formatOperators");

          if (that.isFirst) {
            that.cloneOperatorList = deepClone(that.OperatorList);
            that.isFirst = false;
          }

          console.log(d, "operatorlist");
        },
        error: function(XMLHttpRequest, textStatus, errorThrown) {
          showErrMsg(that, textStatus, "请求失败" + XMLHttpRequest.status);
        }
      });
    },
    getInitData() {
      let that = this;
      $.ajax({
        type: "post",
        data: {
          opid: this.selectOPId,
          token: this.$store.state.usr_token
        },
        url: "/statistics/reset",
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
    showSelect() {
      this.isweek = this.selectDateType.indexOf("周") != -1;
      this.isMonth = this.selectDateType.indexOf("月") != -1;
      this.isSeason = this.selectDateType.indexOf("季") != -1;
      this.isHalfYear = this.selectDateType.indexOf("半年") != -1;
      this.isYear = this.selectDateType.indexOf("年") != -1;
    }
  }
};
</script>
