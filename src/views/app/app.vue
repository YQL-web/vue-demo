<template>
  <div id="app">
    <div class="header">
      <div class="logo-wrap left">
        <div class="logo-box"></div>
      </div>
      <div class="message-warp right">
        <div class="date-info message-warp-item">
          <p class="date">{{date}}</p>
          <p class="week">{{week}}</p>
        </div>
        <div class="help message-warp-item">
          <i></i>
          <p>帮助</p>
        </div>
        <div class="current-user message-warp-item" @mouseover="toggle">
          <i class="current-user-icon"></i>
          <p>现场管理员</p>
        </div>
        <ul class="system-title-ul" v-show="ulShow" @mouseleave="hidden">
          <li @click="logout">退出</li>
        </ul>
      </div>
    </div>
    <div class="main-container">
      <div class="menu-box">
        <div class="first-level-menu menu-box-item">
          <ul>
            <li v-for="item in moudleData" :class="[item.selected?'active':'']" @click="choosefirstMenu(item)"><a :class="item.className">{{item.name}}</a></li>
          </ul>
        </div>
        <div class="second-level-menu menu-box-item"  :class="[secondMenuFlag?'stretch-w':'shrink-w']">
          <ul>
            <li v-for="(item,index) in secondMenuData" :class="[item.selected?'active':'']" @click="chooseSecondMenu(item)"><p><router-link :to="item.routerTo">{{item.name}}</router-link></p></li>
          </ul>
        </div>
        <div v-show="toggleBtnFlag" class="toggle-btn" @click="toggleMenu()" :class="[toggleBtnState? 'shrink':'stretching']">
          <i></i>
        </div>
      </div>
      <div class="content-box" :style="viewRouterStyle" ref="box">
          <router-view></router-view>
      </div>
    </div>
  </div>
</template>

<script type="text/ecmascript-6">
  import config  from '../../module.config.js'
  import services from '../../api/api'
  export default {
    name: 'app',
    data(){
      return {
        moudleData:[],
        secondMenuData:[],
        secondMenuFlag:false,
        toggleBtnFlag:false,
        toggleBtnState:false,
        viewRouterStyle:{},
        date:'',
        week:'',
        ulShow:false
      }
    },
    methods:{
      /**
       * 初始化內容區域高度
       */
      initHeight(){
        let h = document.body.clientHeight-90;
        document.getElementsByClassName("main-container")[0].style.height = h+"px";
      },
      /**
       * 初始化数据
       */
      initData(){
        var time = new Date();
        this.date = time.getFullYear()+'年'+parseInt(time.getMonth()+1)+'月'+time.getDate()+'日';
        let weekArr = ['日', '一', '二', '三', '四', '五', '六'];
        this.week = '星期'+weekArr[time.getDay()];
      },
      /**
       * 点击一级菜单切换状态，并且默认点击二级菜单第一项
       */
      choosefirstMenu(item){
        this.moudleData.forEach(function(op){
          op.selected = false;
        })
        item.selected = true;
        this.secondMenuFlag=this.toggleBtnFlag=this.toggleBtnState= true;
        this.viewRouterStyle = {"padding-left":"370px"}
        this.secondMenuData = item.children;
        this.secondMenuData[0].selected = true;
        this.$router.push({path:'/'+this.secondMenuData[0].routerTo})
      },
      /**
       * 切換二级菜单的状态
       */
      toggleMenu(){
        this.toggleBtnState = !this.toggleBtnState;
        if(this.secondMenuFlag){
          this.secondMenuFlag = false;
          this.viewRouterStyle = {"padding-left":"120px"}
          return false;
        }
        else{
          this.secondMenuFlag = true;
          this.viewRouterStyle = {"padding-left":"370px"}
          return false;
        }
      },
      /**
       * 点击二级菜单
       */
      chooseSecondMenu(item){
        this.secondMenuData.forEach(function(option){
          option.selected = false;
        })
        item.selected = true;
        this.viewRouterStyle = {"padding-left":"370px"}
      },
      /**
       * 鼠标移动上去显示退出框
       */
      toggle(){
        this.ulShow =  true;
      },
      /**
       * 鼠标移走隐藏退出框
       */
      hidden(){
        this.ulShow = false;
      },
      /**
       * 用户注销
       */
      logout(){
        services.logout().then(res=>{
          window.location.href = '/biolo_center_backgroud/views/login/index.html'
        })
      }
    },
    mounted(){
      this.initHeight();
      this.initData();
      window.onresize = ()=>{
        this.initHeight();
      }
      this.$router.push('/');
    },
    created(){
      this.moudleData = config.MOUDLE_CONFIG;
      this.moudleData.forEach(function(item){
        item.selected = false;
      })
    }
  }
</script>

<style scoped>
  #app{width: 100%;position: relative}
  .header{width: 100%;height: 90px;background-color: #2d3b44;}
  .logo-wrap{position: relative;width: 340px;height: 100%;background: url("../../assets/images/home/logo.png") no-repeat right center;}
  .logo-box{position: absolute;  left: 8px;  top: -10px;  z-index: 0;  width: 100px;  height: 100px;  -webkit-border-radius: 100px;  -moz-border-radius: 100px;  border-radius: 100px;  background: url("../../assets/images/home/logo_i.png") no-repeat center center;}
  .message-warp{margin-right: 50px;color:#ffffff}
  .message-warp-item{float: left;margin: 0 15px;overflow: hidden;position: relative;z-index: 12}
  .message-warp-item p,.message-warp-item i{display:block;float: left;line-height: 90px;margin:0;}
  .date-info{color: rgba(255,255,255,0.6);font-size: 12px;}
  .date-info .date{margin-right: 40px;}
  .help i,.current-user i{height: 18px;width: 18px;border-radius: 75px;background: #ffffff;color:#2d3c44;margin:36px 10px;}
  .help i{background: url("../../assets/images/home/help.png")no-repeat}
  .current-user i{background: url("../../assets/images/home/role.png")no-repeat}
  .current-user p{padding-right: 15px;}
  .current-user p:after{content: '';position: absolute;right: 0;bottom:37px;width: 0;  height: 0;  border-bottom: 8px solid #ffffff;  border-left: 8px solid transparent;}
  .main-container{position: relative;min-height: 300px;}
  .main-container .toggle-btn{position: absolute;top:50%;right: -8px;height: 26px;width: 16px;border-radius: 10px;background: #1f2427;margin-top:-13px;z-index: 2;cursor: pointer}
  .main-container .toggle-btn i{display: block;width: 0;height: 0;  margin:7px 0 7px 8px;border-bottom: 6px solid transparent;border-top: 6px solid transparent;  }
  .main-container .toggle-btn.shrink i{border-right: 6px solid #ffffff;  }
  .main-container .toggle-btn.stretching i{border-left: 6px solid #ffffff;  }
  .menu-box{position: absolute;height: 100%;  padding-top: 30px;  background-color: #1f2427;top:0;left:0;}
  .menu-box-item{position:relative;z-index:3;height: 100%;overflow: auto;float: left; scrollbar-arrow-color: #263238;  /*三角箭头的颜色*/  scrollbar-face-color: #41575d;  /*立体滚动条的颜色*/  scrollbar-shadow-color: #41575d;  /*立体滚动条阴影的颜色*/  scrollbar-track-color: #263238;}
  /*webkit内核滚动条样式*/
   .menu-box-item::-webkit-scrollbar{width:6px;margin-right:2px}
  .menu-box-item::-webkit-scrollbar-track{border-radius:10px}
  .menu-box-item::-webkit-scrollbar-track-piece{background-color:#263238;border-radius:10px}
  .menu-box-item::-webkit-scrollbar-thumb{width:10px;border-radius:5px;background:#41575d}

  .first-level-menu{width: 120px;}

  .first-level-menu ul{background: #263238;height: 100%;}
  .first-level-menu ul li:hover{cursor: pointer}
  .first-level-menu ul li a{display: block;margin-bottom: 10px;padding: 68px 0 16px 0;line-height: 28px;text-align: center;color: #ffffff;}
  .first-level-menu ul li.active{background:#f14963;}
  .first-level-menu ul li a.system{background: url("../../assets/images/home/system_management.png")no-repeat center 24px;}
  .first-level-menu ul li a.user-manage{background: url("../../assets/images/home/member_management.png")no-repeat center 24px;}
  .first-level-menu ul li a.app-manage{background: url("../../assets/images/home/app_management.png")no-repeat center 24px;}
  .first-level-menu ul li a.services-manage{background: url("../../assets/images/home/services_management.png")no-repeat center 24px;}
  .second-level-menu{width: 0px;transition: all 300ms linear;will-change: all;background: url("../../assets/images/home/second_menu_bg.png") no-repeat right bottom;  background-size: 100%;}
  .stretch-w{width: 250px;}
  .shrink-w{width: 0px;}
  .second-level-menu ul{padding:30px 20px 0px 20px;overflow: hidden}
  .second-level-menu ul li{margin-bottom: 28px;background: #415661;border-radius: 2px;cursor: pointer}
  .second-level-menu ul li.active{background:#f14963}
  .second-level-menu ul li p{display: block;color:#ffffff;text-align: center;border-radius: 2px;overflow: hidden;}
  .second-level-menu ul li p a{height: 40px;line-height: 40px;}

  .content-box{height: 100%;padding-left: 120px;overflow: hidden;transition: all 300ms linear;position: relative}
  .system-title-ul{width:120px;background: #485a62;position: absolute;border-radius: 5px;z-index: 11;right: 60px;top:30px;padding-top:60px;cursor: pointer}
  .system-title-ul li{text-align: center;padding:10px 0;}
  .system-title-ul li:hover{color: #40b2ee;}
</style>
