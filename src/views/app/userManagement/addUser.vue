<template>
  <div class="add-user child-page-box">
    <div class="child-page-title">
      <a>会员管理</a>
      <span>&nbsp>&nbsp</span>
      <a>添加会员</a>
    </div>
    <div class="child-page-container">
      <div class="title-text">
        <span>会员管理</span>
      </div>
      <div class="info-area" >
        <div class="info-area-item">
          <p class="info-area-t">个人身份信息</p>
          <div class="input-area pic">
            <p class="input-describe">照片</p>
            <!--element-ui上传组件-->
            <el-upload
              class="avatar-uploader"
              action="http://121.49.99.131/biolo_center_backgroud/apiBack/userBaseInfo/uploadPhoto.json"
              :show-file-list="false"
              :on-success="handleAvatarSuccess"
              :before-upload="beforeAvatarUpload"  name="photo">
              <img v-if="imageUrl" :src="imageUrl" class="avatar">
              <i v-else class="el-icon-plus avatar-uploader-icon"></i>
            </el-upload>

          </div>
          <div class="input-area">
            <p class="input-describe">姓名</p>
            <input type="text" class="common-input" v-model="memberInfo.userName" :class="[InfoFlag.userNameFlag?'false':'']" maxlength="30"/>
            <p class="false-text" v-show="InfoFlag.userNameFlag">请输入姓名</p>
          </div>
          <div class="input-area">
            <p class="input-describe">性别</p>
            <Radio :radioData="sexArr" v-on:getSexType="getSexType"></Radio>
            <p class="false-text" v-show="InfoFlag.sexFlag">请选择性别</p>
          </div>
          <div class="input-area">
            <p class="input-describe">证件号</p>
            <input type="text" class="common-input" v-model="memberInfo.chinaIdentityNo" :class="[InfoFlag.chinaIdentityNoFlag?'false':'']" maxlength="30"/>
            <p class="false-text" v-show="InfoFlag.chinaIdentityNoFlag">请输入正确的证件号</p>
          </div>
          <div class="input-area">
            <p class="input-describe">用户类型</p>
            <Radio :radioData="typeArr" v-on:getUserType="getUserType"></Radio>
            <p class="false-text" v-show="InfoFlag.userTypeFlag">请选择用户类型</p>
          </div>
          <div class="input-area" v-show="schoolStuNumFlag">
            <p class="input-describe">学工号</p>
            <input type="text" class="common-input" v-model="memberInfo.schoolIdentityNo" :class="[InfoFlag.schoolIdentityNoFlag?'false':'']" maxlength="20"/>
            <p class="false-text" v-show="InfoFlag.schoolIdentityNoFlag">请输入学工号</p>
          </div>
          <div class="input-area">
            <p class="input-describe">出生年月</p>
            <DatePicker v-on:getBirth="getBirth"></DatePicker>
            <p class="false-text" v-show="InfoFlag.birthDateFlag">请选择出生日期</p>
          </div>
          <div class="input-area">
            <p class="input-describe">家庭住址</p>
            <input type="text" class="common-input" v-model="memberInfo.homeAddress" :class="[InfoFlag.homeAddressFlag?'false':'']" maxlength="50"/>
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
          <div class="input-area">
            <p class="input-describe">静脉信息</p>
            <div class="show-text">无</div>
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
        <div class="button" @click="submit()">确定</div>
        <div class="button"><router-link to="userlist">返回</router-link></div>
      </div>
    </div>
  </div>
</template>
<script type="text/ecmascript-6">
  import services from '../../../api/api'
  export default{
    data(){
      return {
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
          veinId:''
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
        imageUrl: ''
      }
    },
    methods:{
      submit(){
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
        if(this.memberInfo.mobileNo.length>0){
          let regExp = /^\d+?$/
          if(regExp.test(this.memberInfo.mobileNo))
            this.InfoFlag.mobileNoFlag = false;
          else
            this.InfoFlag.mobileNoFlag = true;
        }
//        if(this.memberInfo.userName.length>30){
//          this.InfoFlag.userNameFlag = true;
//        }else if(this.memberInfo.chinaIdentityNo.length>30){
//          this.InfoFlag.chinaIdentityNoFlag = true;
//        }else if(this.memberInfo.schoolIdentityNo.length>30){
//          this.InfoFlag.schoolIdentityNoFlag = true;
//        }else if(this.memberInfo.homeAddressFlag.length>50){
//          this.InfoFlag.homeAddressFlag = true;
//        }
        let noFalse= false;
        for(let i in this.InfoFlag){
          if(this.InfoFlag[i])
            noFalse = true;
        }
        if(!noFalse){
          var data = this.memberInfo;
          for(let i in this.memberInfo){
            if(this.memberInfo[i]=="")
              this.memberInfo[i] = "-"
          }
          services.addMember(data).then(res=>{
            if(res.data.code=="000000")
              this.$router.push({path:'/userList'})
            else
              this.$message.error(res.data.msg);
          })
        }
      },
      handleAvatarSuccess(res, file) {
        if(res.retcode == '000000'){
          this.memberInfo.headImgUrl = this.imageUrl =res.data;
          document.getElementsByClassName("el-upload__inner")[0].style.padding="0px";
        }
//        this.imageUrl = URL.createObjectURL(file);
//        this.memberInfo.headImgUrl = this.imageUrl;
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
    }
  }
</script>
<style>
  .info-area-t{font-size: 16px;font-weight: bold;color:#007cbc;margin-bottom:10px;}
  .child-page-box .pic{overflow: hidden;height: auto}
  .my-radio-box{margin:7px 14px 0 0}
  .add-user .btns{overflow: hidden;margin-bottom: 60px;}
  .add-user .btns .button{margin-right: 30px;}
  .add-user .false-text{position: absolute;top:0;left:540px;}
  .add-user  .avatar-uploader .el-upload {
    border: 1px dashed #d9d9d9;
    border-radius: 6px;
    cursor: pointer;
    position: relative;
    overflow: hidden;
    padding: 10px;;
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
    border:1px dashed #cfd8dc;
    text-align: center;
  }
  .avatar {
    width: 178px;
    height: 178px;
    display: block;
  }
  .el-upload__inner{
    border:1px solid #cfd8dc;
    padding: 10px;;
  }
  .el-upload__inner:hover{
    border-color: #20a0ff;
  }
  .el-upload__inner:hover .avatar-uploader-icon{
    border-color: #20a0ff;
  }
  .el-upload__files{display: none;}
  .add-user .block-el .el-date-editor.el-input{width: 250px;}
</style>
