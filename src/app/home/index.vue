<template>
    <el-row class="container" style="height: 100%">
    <v-header :user="user"></v-header>
    <el-col :span="24" class="main">
      <el-row>
        <el-menu :default-active="$route.path"  router>
          <template v-for="(item,index) in $router.options.routes[0].children.slice(1)">
            <el-menu-item :index="item.path" :key="item.path" v-show="item.name!='运营商注册管理'||$store.state.is_super">
              <div class="menuIcon">
                <img :src="iconList[index]" alt="">
              </div>
              {{item.name}}</el-menu-item>
          </template>
        </el-menu>
        <section class="contentCon">
          <el-col :span="21" :offset="3" class="content-wrapper">
            <transition>
              <router-view></router-view>
            </transition>
          </el-col>
        </section>
      </el-row>
    </el-col>
  </el-row>

</template>

<script>
import header from "../components/header.vue";
export default {
  data() {
    return {
      user: {
        name:'',
        area:'',
        identity:''
      },
      iconList:[
        '../../assets/img/admin.png',
        '../../assets/img/apply.png',
        '../../assets/img/log.png',
        '../../assets/img/chartIcon.png'
      ],
    };
  },
  created() {
    
  },
  components: {
    "v-header": header
  }
};
</script>
<style>

.menu,.el-menu {
  height: 100%;
  background-color: #4f6070;
  position: fixed;
  float: left;
  width:160px;
  color:#fff;
}

.container {
  height: 100%;
}

.container ul li.el-menu-item {
  font-size: 14px;
  line-height: 44px;
  height:44px;
  color:#fff;
}
.container ul li.el-menu-item:hover{
  background:#44596c;
}

.el-menu-item.is-active{
  background:#44596c;
  color:#fff;
}
.container .content-wrapper {
  padding: 20px;
  margin-left:160px;
}
.menuIcon{
  display:inline-block;
  width:15px;
  height:15px;
  margin-top:-2px;
  position: relative;
}

.menuIcon img{
  width:100%;
  height:100%;
  position: absolute;
  top:0;left:0;
}











</style>