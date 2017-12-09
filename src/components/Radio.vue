<template>
  <div class="radio-box">
    <label class="my-radio-box" v-for="item in radioData.data"  @click="chooseRadio(item)" :label="item.stateCode">
      <span class="my-radio" :class="[item.checked?'checked':'']"></span>
      <span class="my-radio-text">{{item.name}}</span>
    </label>
  </div>
</template>
<script type="text/ecmascript-6">
  export default {
    name:"Radio",
    props:['radioData'],
    data(){
      return {
        value:"",
      }
    },
    methods:{
      chooseRadio(item){
        this.radioData.data.forEach(function(op){
          op.checked = false;
        })
        item.checked = true;
        this.value = item.stateCode;
        this.$emit(this.radioData.eventFlag,this.value);
      }
    },
    mounted(){

    },
    created(){
    }
  }
</script>
<style>
  .radio-box{float: left}
  .my-radio-box{cursor: pointer;position: relative;display: inline-block;line-height: 17px;}
  .my-radio-box span{float: left;margin-right: 3px;}
  .my-radio-box .my-radio{height: 16px;width: 16px;border:1px solid #cfd8dc;border-radius: 75px}
  .my-radio-box .my-radio:hover{border:1px solid #1c8de0}
  .my-radio-box .my-radio.checked{background:#16a2eb}
</style>
