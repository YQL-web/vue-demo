<template>
  <el-select v-model="value" placeholder="请选择"  @change="changeValue()">
    <el-option
      v-for="item in selectData"
      :key="item.value"
      :label="item.label"
      :value="item.value">
    </el-option>
  </el-select>
</template>

<script>
  export default {
    name:"Select",
    props:['selectData','defaultVal'],
    data() {
      return {
        value: ''
      }
    },
    methods:{
      changeValue(){
        this.$emit('getValue',this.value);
      }
    },
    created(){
      this.value = this.defaultVal;
    }
  }
</script>
<style>
  .el-select{width: 250px;float: left}
</style>
