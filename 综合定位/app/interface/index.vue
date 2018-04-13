<template>
<div id="interfaceBox">
  <p class="tit">
    接口管理
  </p>
 

 
  <div class="interfaceInput">
      <el-select v-model="selectIndex" placeholder="请选择接口" @change="chooseInterface">
          <el-option  v-for="(item,index) in interfaces" :key="item.IName"
           :label="item.IName" :value="index" >
          </el-option>
      </el-select>
    <el-button type="primary" @click="downloadDemo">下载demo</el-button>
  </div>
      
   <p class="tit">
    接口名称：{{curInterface.IName}}
   </p>
    <div class="inlines">
      地址:
    </div>
    <div class="inlines">
      {{curInterface.IIP}}
      <!-- <el-input v-model="curInterface.IIP" placeholder="请输入内容"></el-input> -->
    </div>
    <div class="inlines">
      &nbsp;&nbsp;&nbsp;&nbsp;&nbsp; &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;端口：
    </div>
    <div class="inlines">
      {{curInterface.IPort}}
      <!-- <el-input v-model="curInterface.IPort" placeholder="请输入内容"></el-input> -->
    </div>
    <div class="inlines">
     &nbsp;&nbsp;&nbsp;&nbsp;&nbsp; &nbsp;&nbsp;&nbsp;&nbsp;&nbsp; 路径：
    </div>
    <div class="inlines">
      {{curInterface.IPath}}
      <!-- <el-input v-model="curInterface.IPath" placeholder="请输入内容"></el-input> -->
    </div>
    &nbsp;&nbsp;&nbsp;&nbsp;&nbsp; &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
     <el-button @click="callInterface" type="primary" >调用参数</el-button>
    <div class="inputLists" v-for="item in curInterface.Params" :key="item.Name">
      <div class="inlines">
        参数
      </div>
      <div class="inlines">
      {{item.Name}}:
      </div>
      <div class="inlines">
        <el-input v-model="item.Describe" placeholder="请输入内容"></el-input>
      </div>
      <div class="inlines">
        type:
      </div>
      <div class="inlines">
        <el-input v-model="item.Type" placeholder="请输入内容"></el-input>
      </div>
      
     

    </div>



<div class="callResult">
  <p class="textareaTit">
    调用结果
   </p>
   <el-input type="textarea" v-model="callResult"></el-input>
</div>

<div class="callResult">
  <p class="textareaTit">
    接口调用描述
   </p>
   <el-input type="textarea" v-model="curInterface.IDescribe"></el-input>
</div>
 </div>


</template>
<script src="./index.js"></script>


<style>
#interfaceBox .tit {
  font-size: 17px;
  font-weight: 600;
  margin-bottom: 15px;
}
.interfaceInput {
  margin: 15px 0;
}
#interfaceBox .el-input__inner {
  border: 1px solid #c7d4da;
}
#interfaceBox .inlines {
  display: inline-block;
}
#interfaceBox .inputLists {
  margin-top: 10px;
}
#interfaceBox .callResult {
  margin: 20px 0;
}
#interfaceBox .el-textarea__inner {
  min-height: 100px !important;
  width: 70%;
}
#interfaceBox .textareaTit {
  margin-bottom: 5px;
}
</style>

