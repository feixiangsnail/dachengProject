<template>
  <el-container>
  <el-header>Header</el-header>
  <el-container>
    <el-aside width="200px">Aside</el-aside>
    <el-main>
        
         
        <div>

          <h3>{{$store.state.count}}</h3>
          <el-button :plain="true" @click="open2">成功</el-button>
          <el-button :plain="true" @click="open3">警告</el-button>
          <el-button :plain="true" @click="open">消息</el-button>
          <el-button :plain="true" @click="open4">错误</el-button>

        </div>
        
    </el-main>
  </el-container>
</el-container>
</template>
<script>
export default {
  data() {
    return {
      radio: "1",
      checked: true
    };
  },
  methods:{
     open() {
        this.$message('这是一条消息提示');
      },
      open2() {
        this.$message({
          message: '恭喜你，这是一条成功消息',
          type: 'success',
          duration:1000,
          showClose:true
        });
      },

      open3() {
        this.$message({
          message: '警告哦，这是一条警告消息',
          type: 'warning'
        });
      },

      open4() {
        this.$message.error('错了哦，这是一条错误消息');
      }
  }
};
</script>

<style>
.el-header,
.el-footer {
  background-color: #b3c0d1;
  color: #333;
  text-align: center;
  line-height: 60px;
}

.el-aside {
  background-color: #d3dce6;
  color: #333;
  text-align: center;
  line-height: 200px;
}

.el-main {
  background-color: #e9eef3;
  color: #333;
  text-align: center;
  line-height: 160px;
}

body > .el-container {
  margin-bottom: 40px;
}

.el-container:nth-child(5) .el-aside,
.el-container:nth-child(6) .el-aside {
  line-height: 260px;
}

.el-container:nth-child(7) .el-aside {
  line-height: 320px;
}

.success2 {
  color: purple;
}
</style>
</style>
