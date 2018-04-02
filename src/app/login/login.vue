<template>
  <div id="login">
      <div class="logo" @click="clearCookie('usr_token')">
      </div>
    <p class="loginTitle">
        身份认证平台
    </p>
    <div class="loginArea">
        <div class="loginCont">
            <div class="clearfix">
            <div class="loginIcon">
                <img src="../../assets/img/admin.png" alt="" >
                <div class="errInfo">
                  {{errUsrInfo}}
                </div>
            </div>
            <el-input v-model="userInfo.user" placeholder="请输入用户名" @input="isUser" @blur="clearInfo">
                
            </el-input>
            <div class="loginIcon pwdIcon ">
                <img src="../../assets/img/password.png" alt="">
                <div class="errInfo">
                  {{errPwdInfo}}
                </div>
            </div>
            <el-input type="password" v-model="userInfo.password" placeholder="请输入密码" @blur="clearInfo" @input="isPwd"></el-input>
            <div class="loginIcon loginBtn" @click="toLogin" v-if="unLogin">
                登录
            </div>
            <div class="loginIcon loginBtn" v-else>
                登录中
            </div>
            </div>
            <div class="pwdRelate">
               <input id="rememberPwd" type="checkbox" v-model="saveLogin"> <label for="rememberPwd"> 一天内免登录</label>
                <a class="forgetPwd" @click="forgetPwd">忘记密码?</a>
            </div>
        </div>
    </div>
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
  data() {
    return {
      userInfo: {
        user: "",
        password: ""
      },
      errUsrInfo: "",
      errPwdInfo: "",
      saveLogin: true,
      unLogin: true
    };
  },
  methods: {
    setCookie(cname, cvalue, exdays) {
      setCookie(cname, cvalue, exdays);
    },
    getCookie(cname) {
      return getCookie(cname);
    },
    clearCookie(cname) {
      clearCookie(cname);
    },
    clearInfo() {
      this.errUsrInfo = "";
      this.errPwdInfo = "";
    },
    forgetPwd() {
      console.log(this.getCookie("usr_token"), "cookietoken");
    },
    toLogin() {
      if (!this.isUser()) return;
      if (!this.isPwd()) return;
      var that = this;
      this.unLogin = false;
      $.ajax({
        type: "post",
        data: this.userInfo,
        url: "/operators/login",
        dataType: "json",
        timeout: 10000,
        success: function(d) {
          console.log(d,'dlogin')
          that.unLogin = true;
          if (!d.code) {
            
            var t = that.saveLogin ? 1 : undefined; //是否1天免登录
            let usrInfo = {
              usr_token: d.data.Token,
              operator_name: that.userInfo.user,
              is_super: d.data.Is_Super,
              OPId:d.data.OPId,
              userId:d.data._id
            };
           
            let usr_info = JSON.stringify(usrInfo);
            that.setCookie("usr_info", usr_info, t);
            that.$router.push({ path: "/" });
          } else {
            that.$message.error(d.message + "失败码:" + d.code);
          }
        },
        error: function(XMLHttpRequest, textStatus, errorThrown) {
          that.unLogin = true;
          showErrMsg(that, textStatus);
        }
      });
      // var d ={data: {Token:'hahahah',Is_Super:true,OPId:123,_id:6}};
      //       console.log(d.data._id,'dddddddd')
      //       var t = that.saveLogin ? 1 : undefined; //是否1天免登录
      //       let usrInfo = {
      //         usr_token: d.data.Token,
      //         operator_name: that.userInfo.user,
      //         is_super: d.data.Is_Super,
      //         OPId:d.data.OPId,
      //         userId:d.data._id
      //       };
           
      //       let usr_info = JSON.stringify(usrInfo);
      //       that.setCookie("usr_info", usr_info, t);
      //       that.$router.push({ path: "/" });

    },
    isUser() {
      var pattern = /^\S{3,20}$/g;
      if (this.userInfo.user === "") {
        this.errUsrInfo = "用户名不能为空";
        return false;
      }
      if (!pattern.test(this.userInfo.user)) {
        this.errUsrInfo = "用户名应为3-20个非空白字符";
        return false;
      }
      this.errUsrInfo = "";
      return true;
    },
    isPwd() {
      var pattern = /^\S{3,20}$/g;
      if (this.userInfo.password === "") {
        this.errPwdInfo = "密码不能为空";
        return false;
      }
      if (!pattern.test(this.userInfo.password)) {
        this.errPwdInfo = "密码应为3-20个非空白字符";
        return false;
      }
      this.errPwdInfo = "";
      return true;
    }
  }
};
</script>
<style>
#login {
  width: 100%;
  height: 100vh;
  background: url(../../assets/img/bg.jpg) no-repeat center;
  background-size: 100% 100%;
  overflow: hidden;
  user-select: none;
}
.logo {
  background: url(../../assets/img/logo.png) no-repeat center;
  background-size: 100% 100%;
  width: 6%;
  height: 11vh;
  margin: 16vh auto 0;
}
.loginTitle {
  height: 7vh;
  line-height: 7vh;
  text-align: center;
  font-size: 30px;
  font-weight: 800;
  color: #1484bb;
}
.loginArea {
  height: 190px;
  background: rgba(154, 219, 252, 0.9);
  margin-top: 3vh;
}
.loginCont {
  height: 100px;
  width: 56%;
  margin: auto;
  padding-top: 6vh;
}
#login .el-input {
  width: 30%;
  float: left;
}
.loginIcon {
  width: 40px;
  height: 40px;
  float: left;
  background: #54baec;
  line-height: 40px;
  position: relative;
  text-align: center;
}
.loginIcon img {
  margin-top: 5px;
}
.errInfo {
  position: absolute;
  top: 40px;
  left: 40px;
  width: 20vw;
  height: 30px;
  text-align: left;
  line-height: 30px;
  color: red;
  font-size: 12px;
}
.pwdIcon {
  margin-left: 10%;
  font-size: 10px;
}
.loginBtn {
  margin-left: 2%;
  width: 10%;
  color: #00267c;
  font-weight: 500;
}
.loginBtn:hover {
  cursor: pointer;
}
.loginBtn:active {
  background: pink;
}
.pwdRelate {
  line-height: 6vh;
  width: 100%;
  margin-top: 30px;
}
#rememberPwd {
  margin-left: 8%;
}
.forgetPwd {
  margin-left: 50%;
}
.forgetPwd:hover {
  cursor: pointer;
}
</style>
