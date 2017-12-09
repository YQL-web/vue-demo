<template>
  <div class="block-el my-date">
    <el-date-picker
      v-model="value"
      type="date"
      placeholder="选择日期" :change="chooseDate()">
    </el-date-picker>
  </div>
</template>

<script>
  export default {
    name:'DatePicker',
    props:['date','event'],
    data() {
      return {
        pickerOptions1: {
          shortcuts: [{
            text: '今天',
            onClick(picker) {
              picker.$emit('pick', new Date());
            }
          }, {
            text: '昨天',
            onClick(picker) {
              const date = new Date();
              date.setTime(date.getTime() - 3600 * 1000 * 24);
              picker.$emit('pick', date);
            }
          }, {
            text: '一周前',
            onClick(picker) {
              const date = new Date();
              date.setTime(date.getTime() - 3600 * 1000 * 24 * 7);
              picker.$emit('pick', date);
            }
          }]
        },
        value: ''
      };
    },
    methods:{
      chooseDate(){
        if(this.value){
          let time = new Date(this.value);
          let date = time.getFullYear(this.value)+'-'+parseInt(time.getMonth(this.value)+1)+'-'+time.getDate(this.value)
          this.$emit('getBirth',date)
          this.$emit(this.event,date)
        }
      }
    },
    created(){
    },
    watch:{
      date:function(){
        console.log(this.value)
      }
    }
  };
</script>
<style>
  .my-date{float: left}
  .block-el .el-date-editor{width: 250px}
  .block-el .el-date-editor.el-input{width: 230px;}
</style>
