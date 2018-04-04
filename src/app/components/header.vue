<template>
  <div>
    <header class="clearfix">
        <div class="logoTitle" @click="toTest">身份认证平台</div>
        <div class="headRight clearfix">
              <!-- <el-input placeholder="请输入内容"  prefix-icon="el-icon-search" v-model="hSearch">
            </el-input> -->
              <div class='headUserInfo'>
                <span class="hLoginRelate hUserName" @click="editAccount">{{$store.state.operator_name}}</span>
                <span v-if="$store.state.is_super">(管理员)</span>
                <!-- <span  class="hLoginRelate" @click="signUp">注册&nbsp;</span> -->
                  &nbsp;&nbsp;&nbsp;&nbsp;
                <span v-if="$store.state.usr_token" class="hLoginRelate" @click="logOut">退出&nbsp;</span>
                <span v-else class="hLoginRelate" @click="toLogin">登录&nbsp;</span>
              </div>
           
        </div>
        <el-dialog title="修改个人资料" :visible.sync="editDialog" :before-close="closeDialog" :close-on-click-modal='false'>
          <el-input v-model="userInfo.OPName" placeholder="请输入用户名"></el-input>
          <el-input v-model="userInfo.OPPwd" type="password" placeholder="请输入密码"></el-input>
          <el-button type="primary" round @click="saveUserInfo" :disabled="unLogin">保存</el-button>
          <div class="errorBox">
            {{errInfo}}
          </div>
        </el-dialog>

      </header>
  </div>
</template>
<script>
import {
  setCookie,
  getCookie,
  clearCookie,
  showErrMsg
} from "../common/utils.js";
export default {
  props: {
    user: {}
  },
  data() {
    return {
      userInfo: "",
      editDialog: false,
      hSearch: "",
      errInfo: "",
      unLogin: false
    };
  },
  methods: {
    saveUserInfo() {
      if (!this.isUser()) return;
      if (!this.isPwd()) return;
      var that = this;
      this.unLogin = true;
      $.ajax({
        type: "post",
        data: {
          Operators: this.userInfo
        },
        url: "operators/update",
        dataType: "json",
        timeout: 20000,
        success: function(d) {
          console.log(d, "ddddd");
          that.unLogin = false;
          let user_info = JSON.parse(getCookie("usr_info"));
          user_info.operator_name = that.userInfo.OPName;
          let newUserInfo = JSON.stringify(user_info);
          setCookie("usr_info", newUserInfo);
          that.closeDialog();
          that.$router.push("/");
        },
        error: function(XMLHttpRequest, textStatus, errorThrown) {
          that.unLogin = false;
          showErrMsg(that, textStatus);
        }
      });
    },
    isUser() {
      var pattern = /^\S{3,20}$/g;
      if (this.userInfo.OPName === "") {
        this.errInfo = "用户名不能为空";
        return false;
      }
      if (!pattern.test(this.userInfo.OPName)) {
        this.errInfo = "用户名应为3-20个非空白字符";
        return false;
      }
      this.errInfo = "";
      return true;
    },
    isPwd() {
      var pattern = /^\S{3,20}$/g;
      if (this.userInfo.OPPwd === "") {
        this.errInfo = "密码不能为空";
        return false;
      }
      if (!pattern.test(this.userInfo.OPPwd)) {
        this.errInfo = "密码应为3-20个非空白字符";
        return false;
      }
      this.errInfo = "";
      return true;
    },
    editAccount() {
      this.editDialog = true;
      var that = this;
      $.ajax({
        type: "post",
        data: { token: this.$store.state.usr_token },
        url: "/operators/login_token",
        dataType: "json",
        timeout: 10000,
        success: function(d) {
          console.log(d,'ddddd')
          that.userInfo = d.data || {};
          console.log(that.userInfo,'userinfo')
        },
        error: function(XMLHttpRequest, textStatus, errorThrown) {
          that.unLogin = false;
          showErrMsg(that, textStatus);
        }
      });
    },
    closeDialog() {
      this.editDialog = false;
      this.userInfo = "";
    },
    signUp() {
      this.$router.push({ path: "/signup" });
    },
    toLogin() {
      this.$router.push({ path: "/login" });
    },
    logOut() {
      this.$store.commit("logOut");
      this.$router.push({ path: "/login" });
    },
    toTest() {
      this.$router.push({ path: "/test" });
    }
  }
};
</script>
<style>
header {
  background: #d6dde5;
  height: 46px;
  line-height: 46px;
  width: 100%;
}
.logoTitle {
  background: #324353;
  line-height: 46px;
  color: #fff;
  font-size: 16px;
  width: 160px;
  text-align: center;
  user-select: none;
  /* float: left; */
  position: fixed;
  top: 0;
  left: 0;
}
.logoTitle:hover {
  cursor: pointer;
}
.headRight {
  width: 500px;
  float: right;
  height: 46px;
}
header .el-input__inner {
  border-radius: 20px;
  display: inline-block;
}
header .el-input {
  width: 30%;
}
header .errorBox {
  text-align: center;
  color: red;
}
.headUserInfo {
  display: inline-block;
  width: 330px;
  height: 46px;
  float: right;
}
.hLoginRelate {
  display: inline-block;
  width: 60px;
  line-height: 46px;
  text-align: center;
}
.hLoginRelate:hover {
  cursor: pointer;
}
.hUserName {
  width: 100px;
}
</style>
