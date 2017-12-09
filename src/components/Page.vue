<template>
  <div class="page-bar">
    <ul>
      <li v-if="cur>1"><a @click="cur--,pageClick()" class="prev"></a></li>
      <li v-if="cur==1"><a class="banclick prev"></a></li>
      <li v-for="index in indexs"  :class="{ 'active': cur == index}">
        <a @click="btnClick(index)">{{ index }}</a>
      </li>
      <li v-if="cur!=all" style="border-right:1px solid #ddd"><a @click="cur++,pageClick()"class="next"></a></li>
      <li v-if="cur == all" style="border-right:1px solid #ddd"><a class="banclick next"></a></li>
      <li style="border:none;width: auto">跳至<input type="text" v-model="page" @keydown="keyDown($event)"/>页<span class="btn" @click="jump">确定</span></li>
      <li style="border:none;width: auto"><a>共<i>{{all}}</i>页</a></li>
    </ul>
  </div>

</template>
<script type="text/ecmascript-6">
  export default{
    name:'Page',
    props:['pageData','currentPage'],
    data(){
      return{
        all: 9, //总页数
        cur: 1,//当前页码
        number:15,
        page:''
      }
    },
    methods: {
      btnClick: function(data){//页码点击事件
        if(data != this.cur){
          this.cur= this.page = data
          this.$emit('getPage',data);
        }
      },
      pageClick: function(){
        this.page = this.cur;
        this.$emit('getPage',this.cur);
      },
      jump(){
        let regExp = /^\d+?$/;
        if(regExp.test(this.page)){
          if(this.page<=this.all&&this.page>0){
            this.cur = parseInt(this.page);
            this.$emit('getPage',this.cur);
          }
        }
      },
      keyDown(e){
        if(e.keyCode==13)
          this.jump();
      },
      swiperNext:function(imgs){
        var on = false;
        imgs.forEach(function(item,index){
          if(on) return false;
          if(item.classObj.active){
            item.classObj.active = false;
            item.classObj["stop-left"] = true;
            item.classObj["stop-right"] = false;

            if(index == parseInt(imgs.length-1)){
              imgs.forEach(function(cell,_index){
                if(index!=_index){
                  cell.classObj["stop-right"] = true;
                  cell.classObj.active = false;
                  cell.classObj["stop-left"] = false;
                }
              })
              setTimeout(function(){
                imgs[0].classObj["stop-right"] = false;
                imgs[0].classObj.active = true;
              },1)
              setTimeout(function(){
                item.classObj["stop-left"] = false;
                item.classObj["stop-right"] = true;
              },1000)
            }
            else {
              imgs[index+1].classObj.active = true;
              imgs[index+1].classObj["stop-left"] = false;
              imgs[index+1].classObj["stop-right"] = false;
              on = true;
            }
          }
        })
      }
    },
    computed: {
      indexs: function(){
        var left = 1;
        var right = this.all;
        var ar = [];
        if(this.all>= 5){
          if(this.cur > 2 && this.cur < this.all-2){
            left = this.cur - 2
            right = this.cur + 2
          }else{
            if(this.cur<=3){
              left = 1
              right = 5
            }else{
              right = this.all
              left = this.all -4
            }
          }
        }
        while (left <= right){
          ar.push(left)
          left ++;
        }
        return ar
      }
    },
    created(){
      this.all = this.pageData;
      this.page = this.cur = this.currentPage;
    },
    watch:{
      pageData(){
        this.all = this.pageData;
      },
      currentPage(){
        this.page = this.cur = this.currentPage;
      }
    }
  }
</script>
<style>
  .page-bar{
    padding:20px 0;
    margin-bottom:100px;
  }
  .page-bar ul{
    overflow: hidden;
    float: right;
  }
  .page-bar li{
    float: left;
    height: 44px;
    width: 44px;
    line-height: 44px;
    border-top: 1px solid #ddd;
    border-bottom: 1px solid #ddd;
    border-left: 1px solid #ddd;
  }
  .page-bar li input{
    width: 40px;
    height: 22px;
    border:1px solid #ddd;
    border-radius: 5px;
    margin:10px 5px
  }
  .page-bar li span.btn{
    padding: 5px 10px;
    background: #40b2ee;
    color:#fff;
    border-radius: 5px;
    margin:0 10px;
    cursor: pointer;
  }
  .page-bar li .prev, .page-bar li .next{
    margin-left: 15px
  }
  .page-bar a{
    position: relative;;
    margin-left: -1px;
    text-align: center;
    color: #000000;
    cursor: pointer
  }
  .page-bar a.next,.page-bar a.prev{
    font-family: element-icons!important;
    speak: none;
    font-style: normal;
    font-weight: 400;
    font-variant: normal;
    text-transform: none;
    line-height: 1;
    vertical-align: baseline;
    display: inline-block;
    -webkit-font-smoothing: antialiased;
  }
  .page-bar a.next:before{
    content: "\E602";
  }
  .page-bar a.prev:before{
    content: "\E601";
  }
  .page-bar a:hover{
    background-color: #eee;
  }
  .page-bar a.banclick{
    cursor:not-allowed;
  }
  .page-bar .active a{
    color: #fff;
    cursor: default;
    background-color: #40b2ee;
    border-color: #40b2ee;
  }
  .page-bar i{
    font-style:normal;
    color: #d44950;
    margin: 0px 4px;
    font-size: 12px;
  }
</style>
