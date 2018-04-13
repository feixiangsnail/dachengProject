<template>
  <div id="chart">
      <div style="margin-bottom:10px">          
       <el-button type="primary" @click="openOperatorApp">选择服务申请方及应用</el-button>
       <el-button type="primary" @click="reset">重置</el-button>
       <div style="float:right">     
      <el-date-picker
            v-model="starttime"
            type="datetime"
            placeholder="选择开始时间">
      </el-date-picker>
       <el-date-picker
            v-model="endtime"
            type="datetime"
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
    <tr v-for="i in operatorList" style="height:50px">
        <td>服务商1</td>
        <td>
          <el-select v-model="i.selectAppList" multiple placeholder="请选择" style="width:100%">
             <el-option v-for="(item,index) in i.appList" :label="item.appName" :value="index"></el-option>

           </el-select>
          </td>             
    </tr>
</table>

<div slot="footer" class="dialog-footer tc">
    
    <el-button type="primary" @click="saveSelectApp">保存</el-button>
  </div>




</el-dialog>

      <table id="tableExcel" class="tc" width="100%" border="1" cellspacing="0" cellpadding="0">    
    <tr>
        <td>服务申请方</td>
        <td>应用名称</td>
    
        <td>总调用次数</td>
        <td>失败次数</td>
        <td>成功次数</td>  

        <td v-if="isweek">总调用次数（周）</td>
        <td v-if="isweek">失败次数（周）</td>
        <td v-if="isweek">成功次数（周）</td>
        
         <td v-if="isMonth">总调用次数（月）</td>
        <td v-if="isMonth">失败次数（月）</td>
        <td v-if="isMonth">成功次数（月）</td>

         <td v-if="isSeason">总调用次数（季）</td>
        <td v-if="isSeason">失败次数（季）</td>
        <td v-if="isSeason">成功次数（季）</td>

         <td v-if="isHalfYear">总调用次数（半年）</td>
        <td v-if="isHalfYear">失败次数（半年）</td>
        <td v-if="isHalfYear">成功次数（半年）</td>

         <td v-if="isYear">总调用次数（年）</td>
        <td v-if="isYear">失败次数（年）</td>
        <td v-if="isYear">成功次数（年）</td>
        
       
    </tr>
    <tr v-for="i in 3" >
        <td>服务商1</td>
        <td>应用1</td>

          <td >总调用次数</td>
        <td >失败次数</td>
        <td >成功次数</td>  

        <td v-if="isweek">总调用次数（周）</td>
        <td v-if="isweek">失败次数（周）</td>
        <td v-if="isweek">成功次数（周）</td>
        
         <td v-if="isMonth">总调用次数（月）</td>
        <td v-if="isMonth">失败次数（月）</td>
        <td v-if="isMonth">成功次数（月）</td>

         <td v-if="isSeason">总调用次数（季）</td>
        <td v-if="isSeason">失败次数（季）</td>
        <td v-if="isSeason">成功次数（季）</td>

         <td v-if="isHalfYear">总调用次数（半年）</td>
        <td v-if="isHalfYear">失败次数（半年）</td>
        <td v-if="isHalfYear">成功次数（半年）</td>

         <td v-if="isYear">总调用次数（年）</td>
        <td v-if="isYear">失败次数（年）</td>
        <td v-if="isYear">成功次数（年）</td>    

       
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

      operatorList: [
        {
          opName: "",
          selectAppList: [],
          appList: [
            {
              appName: "weixin",
              Count: [
                { WCount: 0, WSCount: 0, WECount: 0 },
                { MCount: 0, MSCount: 0, MECount: 0 },
                { QCount: 0, QSCount: 0, QECount: 0 },
                { HCount: 0, HSCount: 0, HECount: 0 },
                { YCount: 0, YSCount: 0, YECount: 0 }
              ]
            },
            {
              appName: "douban",
              Count: [
                { WCount: 0, WSCount: 0, WECount: 0 },
                { MCount: 0, MSCount: 0, MECount: 0 },
                { QCount: 0, QSCount: 0, QECount: 0 },
                { HCount: 0, HSCount: 0, HECount: 0 },
                { YCount: 0, YSCount: 0, YECount: 0 }
              ]
            }
          ]
        },
        {
          opName: "",
          selectAppList: [],
          appList: []
        },
        {
          opName: "",
          selectAppList: [],
          appList: []
        }
      ],
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
    // if (this.isSuper) {
    // }
  },
  methods: {
    chooseDateType(i) {
      let tempPos = this.selectDateType.indexOf(i);
      if (tempPos != -1) this.selectDateType.splice(tempPos, 1);
      else this.selectDateType.push(i);
      this.showSelect()
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
      var that = this;
      this.selectDateType = ["周"];
      this.showSelect();
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
      console.log(this.selectDateType);
    },
    searchAll(){
      console.log('searchAll')
    }
  }
};
</script>
