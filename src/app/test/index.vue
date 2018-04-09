<template>
<div>


  <el-select
    v-model="value10.id"
    filterable
    allow-create
    default-first-option
    placeholder="请选择文章标签">
    <el-option
      v-for="item in options5"
      :key="item.value"
      :label="item.label"
      :value="item.value">
    </el-option>
  </el-select>

 <el-button type="primary" @click="print">主要按钮</el-button>





  </div>
</template>

<script>
  export default {
    data() {
      return {
        options5: [{
          value: 'HTML',
          label: 'HTML'
        }, {
          value: 'CSS',
          label: 'CSS'
        }, {
          value: 'JavaScript',
          label: 'JavaScript'
        }],
        value10:{id:'6'}
      }
    },
    methods:{
        print(){
            console.log(this.value10,'value10')
        }
    }
  }
</script>