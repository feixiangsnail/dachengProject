<template>
    <div id="searchInfo">
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
      <el-button type="primary" @click="search">搜索</el-button>
  </div>
</template>
<style>
#searchInfo {
  width: 750px;
  float: right;
  height: 50px;
}
#searchInfo .keywords {
  width: 150px;
}
</style>
<script>
export default {
   props: ['starttime', 'endtime', 'keywords','search'],

}
</script>

















