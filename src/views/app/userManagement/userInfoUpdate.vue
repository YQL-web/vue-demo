<template>
  <div class="user-info-update child-page-box">
    <div class="child-page-title">
      <a>会员管理</a>
      <span>&nbsp>&nbsp</span>
      <a>会员信息修改</a>
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
            <!--element-ui上传组件-->
            <el-upload
              class="avatar-uploader"
              action="http://121.49.99.131/biolo_center_backgroud/apiBack/userBaseInfo/uploadPhoto.json" :show-file-list="false" :on-success="handleAvatarSuccess" :before-upload="beforeAvatarUpload" name="photo">
              <img v-if="imageUrl" :src="imageUrl" class="avatar">
              <i v-else class="el-icon-plus avatar-uploader-icon"></i>
            </el-upload>
          </div>
          <div class="input-area">
            <p class="input-describe">姓名</p>
            <input type="text" class="common-input" v-model="memberInfo.userName" :class="[InfoFlag.userNameFlag?'false':'']"/>
            <p class="false-text" v-show="InfoFlag.userNameFlag">请输入姓名</p>
          </div>
          <div class="input-area">
            <p class="input-describe">性别</p>
            <Radio :radioData="sexArr" v-on:getSexType="getSexType"></Radio>
            <p class="false-text" v-show="InfoFlag.sexFlag">请选择性别</p>
          </div>
          <div class="input-area">
            <p class="input-describe">证件号</p>
            <input type="text" class="common-input" v-model="memberInfo.chinaIdentityNo" :class="[InfoFlag.chinaIdentityNoFlag?'false':'']"/>
            <p class="false-text" v-show="InfoFlag.chinaIdentityNoFlag">请输入正确的身份证号</p>
          </div>
          <div class="input-area">
            <p class="input-describe">用户类型</p>
            <Radio :radioData="typeArr" v-on:getUserType="getUserType"></Radio>
            <p class="false-text" v-show="InfoFlag.userTypeFlag">请选择用户类型</p>
          </div>
          <div class="input-area" v-show="schoolStuNumFlag">
            <p class="input-describe">学工号</p>
            <input type="text" class="common-input" v-model="memberInfo.schoolIdentityNo" :class="[InfoFlag.schoolIdentityNoFlag?'false':'']"/>
            <p class="false-text" v-show="InfoFlag.schoolIdentityNoFlag">请输入学工号</p>
          </div>
          <div class="input-area birth">
            <p class="input-describe">出生年月</p>
            <DatePicker v-on:getBirth="getBirth"></DatePicker>
            <p class="false-text" v-show="InfoFlag.birthDateFlag">请选择出生日期</p>
          </div>
          <div class="input-area">
            <p class="input-describe">家庭住址</p>
            <input type="text" class="common-input" v-model="memberInfo.homeAddress" :class="[InfoFlag.homeAddressFlag?'false':'']"/>
            <p class="false-text" v-show="InfoFlag.homeAddressFlag">请输入家庭住址</p>
          </div>
          <div class="input-area">
            <p class="input-describe">手机号</p>
            <input type="text" class="common-input" v-model="memberInfo.mobileNo" :class="[InfoFlag.mobileNoFlag?'false':'']"/>
            <p class="false-text" v-show="InfoFlag.mobileNoFlag">请输入正确的手机号</p>
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
      </div>
      <div class="btns">
        <div class="button" @click="update">提交修改</div>
        <div class="button"><router-link to="userList">返回</router-link></div>
      </div>
    </div>
  </div>
</template>
<script type="text/ecmascript-6">
  import services from '../../../api/api'
  export default{
    data(){
      return {
        veinImgAdrr:[],
        veinImgAdrrShow:false,
        veinTextShow:true,
        imageUrl:'',
        id:'',
        memberInfo:{
          userName:'',
          sex:'',
          chinaIdentityNo:'',
          userType:'',
          schoolIdentityNo:'',
          birthDate:'',
          homeAddress:'',
          mobileNo:'',
          userSerial:'',
          nickName:'',
          headImgUrl:'',
          veinId:'',
          nickName:''
        },
        InfoFlag:{
          userNameFlag:false,
          sexFlag:false,
          chinaIdentityNoFlag:false,
          userTypeFlag:false,
          schoolIdentityNoFlag:false,
          birthDateFlag:false,
          homeAddressFlag:false,
          mobileNoFlag:false,
        },
        schoolStuNumFlag:false,
        sexArr:{
          data:[
            {
              stateCode:'1',
              name:'男',
              checked:false
            },
            {
              stateCode:'2',
              name:'女',
              checked:false
            }],
          eventFlag:'getSexType'
        },
        typeArr:{
          data:[
            {
              stateCode:'1',
              name:'学生',
              checked:false
            },
            {
              stateCode:'2',
              name:'教职工',
              checked:false
            },
            {
              stateCode:'3',
              name:'教职工家属',
              checked:false
            },
            {
              stateCode:'4',
              name:'校友/合作',
              checked:false
            },
            {
              stateCode:'5',
              name:'校外人员',
              checked:false
            }
          ],
          eventFlag:'getUserType'
        },
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
            let result = res.data.data;
            this.memberInfo.userName = result.userName;
            this.memberInfo.sex = result.sex;
            this.memberInfo.headImgUrl = result.headImgUrl;
            if(result.veinImgAdrr1&&result.veinImgAdrr1.length>0){
              this.veinImgAdrrShow = true;
              this.veinTextShow = false;
              this.veinImgAdrr = [result.veinImgAdrr1,result.veinImgAdrr2,result.veinImgAdrr3]
            }
            if(result.headImgUrl=='-')
              this.imageUrl = '';
            else
              this.imageUrl = result.headImgUrl;
            this.memberInfo.userType = result.userType;
            this.sexArr.data.forEach(item=>{
              if(item.stateCode==result.sex)
                item.checked = true;
            })
            this.typeArr.data.forEach(item=>{
              if(item.stateCode==result.userType)
                item.checked = true;
            })
            if(this.memberInfo.userType=='1'||this.memberInfo.userType=='2')
              this.schoolStuNumFlag = true;
            else
              this.schoolStuNumFlag = false;
            this.memberInfo.chinaIdentityNo = result.chinaIdentityNo;
            this.memberInfo.schoolIdentityNo = result.schoolIdentityNo;
            this.memberInfo.birthDate = result.birthDate;
            let time = new Date(result.birthDate);
            this.memberInfo.birthDate = time.getFullYear()+'-'+parseInt(time.getMonth()+1)+'-'+time.getDate();
            if(this.memberInfo.birthDate=='1970-1-1')
              this.memberInfo.birthDate = '';
            this.memberInfo.homeAddress = result.homeAddress;
            this.memberInfo.mobileNo = result.mobileNo;
            this.memberInfo.veinId = result.veinId;
            this.memberInfo.userSerial = result.userSerial;
            this.memberInfo.nickName = result.nickName;
            if(this.memberInfo.birthDate&&this.memberInfo.birthDate.length>0){
              document.querySelector(".birth input").value = this.memberInfo.birthDate;
            }
          }
        })
      },
      update(){
        for(let i in this.memberInfo){
          if(i=='userName'||i=='sex'||i=='chinaIdentityNo'||i=='userType'||i=='mobileNo'){
            if(this.memberInfo[i].length==0)
              this.InfoFlag[i+'Flag'] = true;
            else
              this.InfoFlag[i+'Flag'] = false;
          }
        }
        if(this.schoolStuNumFlag ==true){
          if(this.memberInfo.schoolIdentityNo.length==0)
            this.InfoFlag.schoolIdentityNoFlag = true;
          else
            this.InfoFlag.schoolIdentityNoFlag = false;
        }
        if(this.memberInfo.mobileNo&&this.memberInfo.mobileNo.length>0){
          let regExp = /^\d+?$/
          if(regExp.test(this.memberInfo.mobileNo))
            this.InfoFlag.mobileNoFlag = false;
          else
            this.InfoFlag.mobileNoFlag = true;
        }
        let noFalse= false;
        for(let i in this.InfoFlag){
          if(this.InfoFlag[i])
            noFalse = true;
        }
        if(!noFalse){
          var data = this.memberInfo;
          data.id=this.id;
          services.updateMemberInfo(data).then(res=>{
            if(res.data.code=='000000')
              this.$router.push({path:'/userList'})
            else
              this.$message.error(res.data.msg);
          })
        }
      },
      handleAvatarSuccess(res, file) {
        if(res.retcode == '000000'){
          this.memberInfo.headImgUrl = res.data;
          this.imageUrl = res.data;
          document.getElementsByClassName("el-upload__inner")[0].style.padding="0px";
        }
      },
      beforeAvatarUpload(file) {
        const isJPG = file.type === 'image/jpeg/'||'image/png';
        const isLt2M = file.size / 1024 / 1024 < 2;
        if (!isJPG) {
          this.$message.error('上传头像图片只能是 JPG或者PNG格式!');
        }
        if (!isLt2M) {
          this.$message.error('上传头像图片大小不能超过 2MB!');
        }
        return isJPG && isLt2M;
      },
      getSexType(text){
        this.memberInfo.sex = text;
      },
      getUserType(text){
        this.memberInfo.userType= text;
        if(text=='1'||text=='2')
          this.schoolStuNumFlag = true;
        else
          this.schoolStuNumFlag =false;
      },
      getBirth(text){
        this.memberInfo.birthDate = text;
      }
    },
    mounted(){
    },
    created(){
      this.id = this.$router.currentRoute.query.index;
      var data = {id:this.id}
      this.getInfo(data);
    }
  }
</script>
<style>
  .info-area-t{font-size: 16px;font-weight: bold;color:#007cbc;margin-bottom:10px;}
  .el-upload-dragger{width: 100px;height: 120px;}
  .child-page-box .pic{overflow: hidden;height: auto}
  .el-radio{margin-top:5px}
  .user-info-update .btns{overflow: hidden;margin-bottom: 60px;}
  .user-info-update .btns .button{margin-right: 30px;}
  .user-info-update .avatar-uploader .el-upload {
    border: 1px dashed #d9d9d9;
    border-radius: 6px;
    cursor: pointer;
    position: relative;
    overflow: hidden;
    width: 100px;
    height: 120px;;
  }
  .avatar-uploader .el-upload:hover {
    border-color: #20a0ff;
  }
  .avatar-uploader-icon {
    font-size: 28px;
    color: #8c939d;
    width: 80px;
    height: 100px;
    line-height: 100px;
    text-align: center;
  }
  .avatar {
    width: 178px;
    height: 178px;
    display: block;
  }
  .el-upload__files{display: none;}
  .user-info-update .false-text{position: absolute;top:0;left:540px;}
  .user-info-update .el-upload__inner{padding:0;}
  .user-info-update .picture{height: auto;overflow: hidden}
  .user-info-update .picture .picture-list{overflow: hidden;float: left}
  .user-info-update .block-el .el-date-editor.el-input{width: 250px;}
</style>
