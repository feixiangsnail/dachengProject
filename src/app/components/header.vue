<template>
  <div>
    <header class="clearfix">
        <div class="logoTitle" @click="toTest">身份认证平台</div>
        <div class="headRight clearfix">
              <el-input
              placeholder="请输入内容"
              prefix-icon="el-icon-search"
              v-model="hSearch">
            </el-input>
              <div class='headUserInfo'>
                <span class="hLoginRelate hUserName">{{$store.state.operator_name||'未登录'}}</span>
                <span class="hLoginRelate" @click="signUp">注册&nbsp;</span>
                <span v-if="$store.state.usr_token" class="hLoginRelate" @click="logOut">退出&nbsp;</span>
                <span v-else class="hLoginRelate" @click="toLogin">登录&nbsp;</span>
              </div>
           
        </div>
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
      hSearch: ""
    };
  },
  methods: {
    signUp() {
      console.log(this.$store.state.user, "userName");
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
  top:0;left:0;
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
