<template>
  <div class="user-info child-page-box">
    <div class="child-page-title">
      <a>会员管理</a>
      <span>&nbsp>&nbsp</span>
      <a>会员信息详情</a>
    </div>
    <div class="child-page-container">
      <div class="title-text">
        <span>会员信息详情</span>
      </div>
      <div class="info-area">
        <div class="info-area-item">
          <p class="info-area-t">个人身份信息</p>
          <div class="input-area pic">
            <p class="input-describe">照片</p>
            <img :src="headImg"/>
          </div>
          <div class="input-area" v-for="item in customerInfoArr">
            <p class="input-describe">{{item.name}}</p>
            <div class="show-text">{{item.data}}</div>
          </div>
        </div>
        <div class="info-area-item">
          <p class="info-area-t">生物识别信息</p>
          <div class="input-area picture">
            <p class="input-describe">静脉信息</p>
            <div class="picture-list" v-show="veinImgAdrrShow">
              <img v-for="item in veinImgAdrr" :src="item" />
            </div>
            <div class="show-text" v-show="veinTextShow">无</div>
          </div>
          <div class="input-area">
            <p class="input-describe">人脸识别信息</p>
            <div class="show-text">无</div>
          </div>
          <div class="input-area">
            <p class="input-describe">指纹信息</p>
            <div class="show-text">无</div>
          </div>
        </div>
        <div class="info-area-item">
          <p class="info-area-t">用户信息操作</p>
          <div class="input-area">
            <p class="input-describe">注册时间</p>
            <div class="show-text">{{createTime}}</div>
          </div>
        </div>
        <div class="user-info-btn">
          <div class="button"><router-link to="userList">返回</router-link></div>
        </div>
      </div>
    </div>
  </div>
</template>
<script type="text/ecmascript-6">
  import services from '../../../api/api'
  export default{
    data(){
      return {
        customerInfoArr:[],
        customerInfo:{},
        headImg:'',
        createTime:'',
        veinImgAdrr:[],
        veinImgAdrrShow:false,
        veinTextShow:true
      }
    },
    methods:{
      /**
       * 得到用户详情信息
       * @param data
         */
      getInfo(data){
        services.getMemberInfo(data).then(res=>{
          if(res.status=='200'){
            this.customerInfo = res.data.data;
            if(this.customerInfo.veinImgAdrr1&&this.customerInfo.veinImgAdrr1.length>0){
              this.veinImgAdrrShow = true;
              this.veinTextShow = false;
              this.veinImgAdrr = [this.customerInfo.veinImgAdrr1,this.customerInfo.veinImgAdrr2,this.customerInfo.veinImgAdrr3]
            }
            if(this.customerInfo.headImgUrl=="-")
              this.headImg = '';
            else
              this.headImg = this.customerInfo.headImgUrl;
            let time = new Date(this.customerInfo.birthDate);
            let birthDate = time.getFullYear()+'-'+parseInt(time.getMonth()+1)+'-'+time.getDate();
            if(birthDate=='1970-1-1')
              birthDate = '';
            let time1 = new Date(this.customerInfo.createTime);
            this.createTime = time1.getFullYear()+'-'+parseInt(time1.getMonth()+1)+'-'+time1.getDate();
            let userType,sex;
            for(let i in window.userTypes){
              if(window.userTypes[i].value==this.customerInfo.userType)
                userType = window.userTypes[i].label;
            }
            for(let i in window.sexbooks){
              if(this.customerInfo.sex==i)
                sex = window.sexbooks[i];
            }
            this.customerInfoArr = [{name:'姓名',data:this.customerInfo.userName},{name:'性别',data:sex},{name:'证件号',data:this.customerInfo.chinaIdentityNo},{name:'用户类型',data:userType},
              {name:'学工号',data:this.customerInfo.schoolIdentityNo},{name:'生日',data:birthDate},{name:'家庭住址',data:this.customerInfo.homeAddress},{name:'手机号',data:this.customerInfo.mobileNo}]
          }
        })
      }
    },
    mounted(){
//      setTimeout(()=>{
//        this.$refs.abc.forEach((item)=>{
//          console.log(item.getBoundingClientRect())
//        })
//      },1000)
    },
    created(){
      var data = {id:this.$router.currentRoute.query.index}
      this.getInfo(data);
      for(var i in this.customerInfo){
        this.customerInfoArr.push({name:i,data:this.customerInfo[i]})
      }
    }
  }
</script>
<style>
 .user-info .picture{height: auto;overflow: hidden}
.pic img{width: 100px;height: 120px;max-width: 100%;}
.user-info .picture-list{overflow: hidden;float: left}
.picture-list img{display: block;float: left;width: 200px;max-width: 100%;margin-right: 5px;height: 150px;}
 .user-info-btn{height: 30px;margin-bottom:50px;}
</style>
