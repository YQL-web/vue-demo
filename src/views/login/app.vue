<template>
  <div class="login-wrap">
    <div class="login-box">
      <div class="login-box-inner">
        <div class="login-row user"><input type="text" name="username" v-model="username" placeholder="账户名"  @keydown="enter($event)"></div>
        <div class="login-row pwd"><input type="password" name="password" v-model="password" placeholder="密码"  @keydown="enter($event)"></div>
        <div class="error-area">
          <!--<label class="c-label-checkbox">记住我</label>-->
          <span class="error" v-show="loginFlag">{{falseText}}</span>
        </div>
        <div class="login-row" @click="login"><a class="login-btn">登录</a></div>
      </div>
    </div>
  </div>
</template>
<script type="text/ecmascript-6">
  export default{
    data(){
      return {
        loginFlag:false,
        username:'',
        password:'',
        falseText:''
      }
    },
    methods:{
      login(){
        if(this.username.length==0){
          this.loginFlag = true;
          this.falseText = '请填写用户名';
        }else if(this.password.length==0){
          this.loginFlag = true;
          this.falseText = '请填写密码';
        }else if(this.password.length>0&&this.username.length>0){
          this.loginFlag = false;
          var data = {
            username:this.username,
            password:this.password
          }
          this.$http.login(data).then(res=>{
            if(res.data.code =='000000'){
              this.loginFlag = false;
              document.cookie = 'jsid='+res.data.data;
              window.location.href = '/biolo_center_backgroud/views/app/index.html'
            }
            else{
              this.loginFlag = true;
              this.falseText = "用户名或者密码错误";
            }
          })
        }
      },
      enter(e){
        if(e.keyCode==13)
          this.login();
      }
    },
    mounted(){

    }
  }
</script>
<style>
  .login-wrap {
    position: relative;
    z-index: 0;
    width: 100%;
    height: 100%;
    background: url("../../assets/images/login/login_warp_bgd.png") no-repeat;
    background-size: 100% 100%;
  }
  .login-wrap .login-box {
    position: absolute;
    left: 0;
    top: 0;
    right: 0;
    bottom: 0;
    margin: auto;
    z-index: 1;
    width: 430px;
    height: 347px;
    background-color: #0b97c4;
    background: url("../../assets/images/login/login-box.png") no-repeat center center;
  }
  .login-wrap .login-box .login-box-inner {
    display: inline-block;
    position: relative;
    left: 118px;
    top: 120px;
    z-index: 0;}
  .login-row input{width: 160px;  height: 28px;  padding: 0 10px 0 44px; border: 1px solid #d5d5d5;}
  .pwd{margin-bottom: 10px;}
  .c-label-checkbox{display: inline-block;
    height: 32px;
    line-height: 32px;
    /*background: url("../image/checkbox_gray.png") no-repeat left 10px;*/
    padding-left: 22px;
    cursor: pointer;}
  .login-wrap .login-box .login-btn{
    border: 1px solid #d8d8d8;
    width: 216px;
    height: 28px;
    line-height: 28px;;
    text-align: center;;
    background-color: #4699e5;
    color: #fff;
    font-size: 14px;
    cursor: pointer;
     -webkit-border-radius: 2px;
     -moz-border-radius: 2px;
    border-radius: 2px;
  }
  .error-area{margin-bottom: 10px;}
  .error{color:#e46f82;}
  .login-box-inner .user input{background: url("../../assets/images/login/user.png") -1px center no-repeat;  background-size: 36px 28px;}
  .login-box-inner .pwd input{background: url("../../assets/images/login/pwd.png") -1px center no-repeat;  background-size: 36px 28px;}
</style>
