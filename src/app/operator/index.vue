<template>
<div id="operatorPage">
    <p class="tit">
    服务申请方管理
  </p>
  <div class="clearfix">
<el-button @click="addDialog = true;" type="primary"   class="addNewBtn">新增</el-button>
 <div class="searchInfo">
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
      关键字：
      <el-input v-model="keywords" class="keywords" placeholder="请输入关键字"></el-input>
      <el-button type="primary" :disabled="disableSearch" @click="getOperatorList">搜索</el-button>
  </div>
  </div>
  
  <el-table :data="appData"  style="width: 100%">
    <el-table-column prop="OPId" label="服务申请方ID"></el-table-column>   
    <el-table-column prop="OPName" label="服务申请方名称"></el-table-column>
    <el-table-column prop="OPIntro" label="服务申请方介绍"> </el-table-column>
    <el-table-column prop="CreateTime" :formatter="formatDate"  label="创建时间"> </el-table-column>
    <el-table-column label="操作" width="150">
      
      <template slot-scope="scope" >       
        <el-button size="mini" @click="editCurApp(scope)">编辑</el-button>
        <el-button size="mini" type="danger" @click="confirmDelete(scope)" :disabled="disableDelete">删除</el-button>
      </template>
    </el-table-column>
  </el-table>
   <div class="selectBottom">

</div>
    <el-dialog title="新增服务申请方" :visible.sync="addDialog" :before-close="closeDialog"  :close-on-click-modal='false'>
      <div class="editDg">
        <el-table style="width: 100%" :data="[null]">
            <el-table-column label="服务申请方名称">
                <template slot-scope="scope">
                  <el-input v-model="curAppData.OPName" placeholder="请输入服务申请方名称"></el-input> 
                </template> 
            </el-table-column>
            <el-table-column label="服务申请方密码">
                <template slot-scope="scope">
                  <el-input type="password" v-model="curAppData.OPPwd" placeholder="请输入服务申请方密码"></el-input> 
                </template> 
            </el-table-column>
            <el-table-column  label="服务申请方介绍">
              <template slot-scope="scope">
                   <el-input v-model="curAppData.OPIntro" placeholder="请输入服务申请方介绍"></el-input> 
              </template>
            </el-table-column>
            <el-table-column  label="操作" >
              <template slot-scope="scope">
                <el-button type="primary" @click="addNewApp" :disabled="disableAdd">新增</el-button>
              </template>
            </el-table-column>
        </el-table>
        <div class="errorBox">
        {{errInfo}}
      </div>
      </div>
    </el-dialog>
  <el-dialog title="编辑应用信息" :visible.sync="editDialog" :before-close="closeDialog" :close-on-click-modal='false'>
      <div class="editDg">
        <el-table style="width: 100%" :data="[null]">
            <el-table-column label="服务申请方名称">
                <template slot-scope="scope">
                  <el-input v-model="curAppData.OPName" placeholder="请输入服务申请方名称"></el-input> 
                </template> 
            </el-table-column>
            <el-table-column label="密码">
                <template slot-scope="scope">
                  <el-input type="password" v-model="curAppData.OPPwd" placeholder="请输入服务申请方密码"></el-input> 
                </template> 
            </el-table-column>

            <el-table-column  label="服务申请方介绍">
              <template slot-scope="scope">
                   <el-input v-model="curAppData.OPIntro" placeholder="请输入服务申请方介绍"></el-input> 
              </template>
            </el-table-column>
          
            <el-table-column  label="操作" >
              <template slot-scope="scope">
                <el-button type="primary" @click="updateCurApp" :disabled="disableUpdate">保存</el-button>
              </template>
            </el-table-column>
        </el-table>
      </div>
      <div class="errorBox">
        {{errInfo}}
      </div>
    </el-dialog>
<el-pagination background layout="prev, pager, next" :total="listCount"
@current-change="changePage" :current-page="currentPage" :page-size="pageSize"
></el-pagination>
</div>
</template>
<style>
#operatorPage .el-dialog {
  width: 80%;
}
#operatorPage .errorBox {
  text-align: center;
  color: red;
}
</style>
<script>
import {
  showErrMsg,
  formatDate,
  deepClone,
  pagesNum
} from "../common/utils.js";

export default {
  data() {
    return {
      disableSearch:false,
      keywords: "",
      starttime: "",
      endtime: "",
      errInfo: "",
      disableAdd: false,
      disableUpdate: false,
      disableDelete: false,
      currentPage: 1,
      pageSize: pagesNum,
      listCount: null,
      addDialog: false,
      editDialog: false,
      curAppData: {
        OPId: "",
        OPName: "",
        OPPwd: "",
        OPIntro: "",
        CreateTime: "",
        Token: ""
      },
      appData: []
    };
  },
 
  created() {
    this.getOperatorList();
  },

  methods: {
    
    
    confirmDelete(scope) {
      let that = this;
      this.$alert("", "是否删除", {
        confirmButtonText: "确定",
        callback: action => {
          if(action == 'cancel') return;
          that.deleteCurApp(scope);
        }
      });
    },
    isUser() {
      var pattern = /^\S{3,20}$/g;
      if (this.curAppData.OPName === "") {
        this.errInfo = "服务申请方名称不能为空";
        return false;
      }
      if (!pattern.test(this.curAppData.OPName)) {
        this.errInfo = "服务申请方名称应为3-20个非空白字符";
        return false;
      }
      this.errInfo = "";
      return true;
    },
    isPwd() {
      var pattern = /^\S{3,20}$/g;
      if (this.curAppData.OPPwd === "") {
        this.errInfo = "密码不能为空";
        return false;
      }
      if (!pattern.test(this.curAppData.OPPwd)) {
        this.errInfo = "密码应为3-20个非空白字符";
        return false;
      }
      this.errInfo = "";
      return true;
    },
    //格式化时间
    formatDate(t) {
      return formatDate(parseInt(t));
    },
    //跳转到第几页
    changePage(currentPage) {
      this.currentPage = currentPage;
      this.getOperatorList();
    },
    //编辑当前app信息
    editCurApp(scope) {
      this.currentNum = scope.$index;
      this.editDialog = true;
      this.curAppData = deepClone(this.appData[this.currentNum]);
    },
    //关闭弹框
    closeDialog() {
      this.editDialog = false;
      this.addDialog = false;
      this.errInfo = "";
      this.curAppData = {
        OPId: "",
        OPName: "",
        OPPwd: "",
        OPIntro: "",
        CreateTime: "",
        Token: ""
      };
    },
    //添加新服务申请方
    addNewApp() {
      if (!this.isUser()) return;
      if (!this.isPwd()) return;
      var that = this;
      that.disableAdd = true;

      $.ajax({
        type: "post",
        data: {
          Operators: this.curAppData,
          token: this.$store.state.usr_token
        },
        url: "/operators/add",
        dataType: "json",
        timeout: 20000,
        success: function(d) {
          that.disableAdd = false;
          if (d.code == 55) {
            showErrMsg(that, 55, "token验证失效，请重新登录");
            that.$router.push({ path: "/login" });
            return;
          }
          that.getOperatorList();
          that.closeDialog();
        },
        error: function(XMLHttpRequest, textStatus, errorThrown) {
          that.disableAdd = false;
          showErrMsg(that, textStatus);
        }
      });
    },
    //删除选中应用
    deleteCurApp(scope) {
      var that = this;
      that.disableDelete = true;
      $.ajax({
        type: "post",
        data: {
          OPId: this.appData[scope.$index].OPId,
          token: this.$store.state.usr_token
        },
        url: "operators/remove",
        dataType: "json",
        timeout: 20000,
        success: function(d) {
          that.disableDelete = false;
          if (d.code == 55) {
            showErrMsg(that, 55, "token验证失效，请重新登录");
            that.$router.push({ path: "/login" });
            return;
          }
          that.$message({
            showClose: true,
            message: "删除成功",
            duration: 1500
          });
          that.getOperatorList();
        },
        error: function(XMLHttpRequest, textStatus, errorThrown) {
          that.disableDelete = false;
          showErrMsg(that, textStatus, "删除失败");
        }
      });
    },
    //修改选中服务申请方
    updateCurApp() {
      if (!this.isUser()) return;
      if (!this.isPwd()) return;
      var that = this;
      that.disableUpdate = true;
      $.ajax({
        type: "post",
        data: {
          Operators: this.curAppData,
          token: this.$store.state.usr_token
        },
        url: "operators/update",
        dataType: "json",
        timeout: 20000,
        success: function(d) {
          that.disableUpdate = false;
          if (d.code == 55) {
            showErrMsg(that, 55, "token验证失效，请重新登录");
            that.$router.push({ path: "/login" });
            return;
          }
          that.getOperatorList();
          that.closeDialog();
        },
        error: function(XMLHttpRequest, textStatus, errorThrown) {
          that.disableUpdate = false;
          showErrMsg(that, textStatus);
        }
      });
    },
    //获取服务申请方列表
    getOperatorList() {
      var that = this;

       this.disableSearch = true;
      let starttime = new Date(this.starttime).getTime();
      let endtime = new Date(this.endtime).getTime();
      console.log(starttime,endtime,'st')
      $.ajax({
        type: "post",
        data: {
          starttime:starttime,
          endtime:endtime,
          key: this.keywords,
          Index: this.currentPage,
          PageSize: parseInt(this.pageSize),
          token: this.$store.state.usr_token
        },
        url: "/operators/getlist_index",
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
            that.appData = [];
            return;
          }
          console.log(d.data["List"], "list");
          that.listCount = d.data.Count;
          that.appData = d.data["List"] || [];
        },
        error: function(XMLHttpRequest, textStatus, errorThrown) {
          that.disableSearch = false;
          showErrMsg(that, textStatus, "请求失败" + XMLHttpRequest.status);
          
        }
      });
     
      // this.$http.p("/operators/getlist_index",{ Index: this.currentPage,PageSize: this.pageSize}).then(function(res){
      //     console.log(res,'res');
      //   })
      //   .catch(function(err){
      //     console.log(err,'err');
      //   });
    }
  }
};
</script>