<template>
  <div class="toast-container" v-show="toastshow">
    <div class="bgd"></div>
    <div class="toast-warp">
      <div class="toast-box">
        <div class="toast-box-title">
          <p>提示</p>
        </div>
        <div class="toast-box-content">
          <p class="toast-text">导入成功</p>
          <div class="toast-btn" @click="close">确定</div>
        </div>
      </div>
    </div>
  </div>
</template>
<script type="text/ecmascript-6">
  export default{
    name:"Toast",
    props:['isShow'],
    data(){
      return {
        toastshow:false
      }
    },
    methods:{
      close(){
        this.toastshow = false;
      }
    },
    created(){
    },
    watch:{
      isShow(){
        this.toastshow = this.isShow
      }
    }
  }
</script>
<style>
  .toast-container,.toast-container .bgd,.toast-container .toast-warp{
    height: 100%;
    width: 100%;
    position: absolute;
    top:0;
  }
  .toast-container{
    z-index: 999;
  }
  .toast-container .bgd{
    background: #000000;
    opacity: 0.7;
    z-index: 1000;
  }
  .toast-container .toast-warp{
    z-index: 1001;
  }
  .toast-container .toast-box{
    width: 400px;
    height: 250px;
    background: #ffffff;
    position: absolute;
    top:50%;
    left:50%;
    margin:-125px 0 0 -300px;
  }
  .toast-container .toast-box .toast-box-title{
    padding: 20px 30px;
    border-bottom:1px solid #eceff1;
  }
  .toast-container .toast-box .toast-box-title p{
    font-size: 20px;
    font-weight: bold;
    padding-left:20px;
    position: relative;
  }
  .toast-container .toast-box .toast-box-title p:before{
    content: '';  width: 10px;  height: 27px;  background-color: #e46f82;position: absolute;left:0
  }
  .toast-container .toast-box-content{padding:50px;}
  .toast-container .toast-text{font-weight: bold;font-size: 14px;}
  .toast-container .toast-btn{color:#ffffff;width: 200px;padding: 6px 0;cursor: pointer;text-align: center;background: #40b2ee;position: absolute;bottom:20px;left:100px}
</style>
