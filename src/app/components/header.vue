<template>
  <div>
    <header class="clearfix">
        <div class="logoTitle" @click="toTest">身份认证平台</div>
        <div class="headRight clearfix">
              <el-input placeholder="请输入内容"  prefix-icon="el-icon-search" v-model="hSearch">
            </el-input>
              <div class='headUserInfo'>
                <span class="hLoginRelate hUserName" @click="editAccount">{{$store.state.operator_name}}</span>
                <span class="hLoginRelate" @click="signUp">注册&nbsp;</span>
                <span v-if="$store.state.usr_token" class="hLoginRelate" @click="logOut">退出&nbsp;</span>
                <span v-else class="hLoginRelate" @click="toLogin">登录&nbsp;</span>
              </div>
           
        </div>
        <el-dialog title="修改个人资料" :visible.sync="editDialog" :before-close="closeDialog" :close-on-click-modal='false'>
          <el-input v-model="userInfo.user" placeholder="请输入用户名"></el-input>
          <el-input v-model="userInfo.password" placeholder="请输入密码"></el-input>
          <el-button type="primary" round @click="saveUserInfo">保存</el-button>
          <div class="errorBox">
            {{errInfo}}
          </div>
        </el-dialog>

      </header>
  </div>
</template>
<script>
export default {
  props: {
    user: {}
  },
  data() {
    return {
      userInfo: '',
      editDialog: false,
      hSearch: "",
      errInfo: ""
    };
  },
  methods: {
    saveUserInfo() {
      if (!this.isUser()) return;
      if (!this.isPwd()) return;
      var that = this;
      this.unLogin = false;
      // $.ajax({
      //   type: "post",
      //   data: this.userInfo,
      //   url: "/operators/login",
      //   dataType: "json",
      //   timeout: 10000,
      //   success: function(d) {
      //     that.unLogin = true;
      //     if (!d.code) {
      //       var t = that.saveLogin ? 1 : undefined; //是否1天免登录
      //       console.log(t, "ttt");
      //       that.setCookie("operator_name", that.userInfo.user, t);
      //       that.setCookie("usr_token", d.token, t);
      //       that.$store.commit("logIn", that.userInfo.user, d.token);
      //       that.$router.push({ path: "/" });
      //     } else {
      //       that.$message.error(d.message + "失败码:" + d.code);
      //     }
      //   },
      //   error: function(XMLHttpRequest, textStatus, errorThrown) {
      //     that.unLogin = true;
      //     showErrMsg(that, textStatus);
      //   }
      // });
      var d = { token: "hahahah" };
      var t = that.saveLogin ? 1 : undefined; //是否1天免登录
      let usrObj = {
        usr_token: d.token,
        operator_name: that.userInfo.user,
        is_super: true
      };
      let usr_info = JSON.stringify(usrObj);
      that.setCookie("usr_info", usr_info, t);
      //that.$store.commit("logIn", that.userInfo.user, d.token,false);
      //that.$router.push({ path: "/" });
    },
    isUser() {
      var pattern = /^\S{3,20}$/g;
      if (this.userInfo.user === "") {
        this.errInfo = "用户名不能为空";
        return false;
      }
      if (!pattern.test(this.userInfo.user)) {
        this.errInfo = "用户名应为3-20个非空白字符";
        return false;
      }
      this.errInfo = "";
      return true;
    },
    isPwd() {
      var pattern = /^\S{3,20}$/g;
      if (this.userInfo.password === "") {
        this.errInfo = "密码不能为空";
        return false;
      }
      if (!pattern.test(this.userInfo.password)) {
        this.errInfo = "密码应为3-20个非空白字符";
        return false;
      }
      this.errInfo = "";
      return true;
    },
    editAccount() {
      this.editDialog = true;
      this.userInfo = {
        user: this.$store.state.operator_name,        
        oldToken: this.$store.state.usr_token,
        is_super:this.$store.state.usr_token,
        password: ''
      }
    },
    closeDialog() {
      this.editDialog = false;
      this.userInfo = ''
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
  width: 400px;
  float: right;
  height: 46px;
}
header .el-input__inner {
  border-radius: 20px;
  display: inline-block;
}
header .el-input {
  width: 40%;
}
header .errorBox {
  text-align: center;
  color: red;
}
.headUserInfo {
  display: inline-block;
  width: 230px;
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
