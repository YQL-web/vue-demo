<template>
  <div class="user-list child-page-box">
    <div class="child-page-title">
      <a>会员管理</a>
      <span>&nbsp>&nbsp</span>
      <a>会员信息</a>
    </div>
    <div class="child-page-container">
      <div class="title-text">
         <span>会员管理</span>
        <a class="download-model" href="http://121.49.99.131/biolo_center_backgroud/user_default.xls">批量导入模板下载<i></i></a>
      </div>
      <div class="info-area">
        <div class="input-area">
          <p class="input-describe">姓名查询</p>
          <input type="text" class="common-input" v-model="$store.state.memberSearchData.userName"/>
        </div>
        <div class="input-area">
          <p class="input-describe">证件号查询</p>
          <input type="text" class="common-input" v-model="$store.state.memberSearchData.chinaIdentityNo"/>
        </div>
        <div class="input-area">
          <p class="input-describe">学工号查询</p>
          <input type="text" class="common-input" v-model="$store.state.memberSearchData.schoolIdentityNo"/>
        </div>
        <div class="input-area">
          <p class="input-describe">用户类型</p>
          <Select :selectData="selectData" v-on:getValue="getSelectVal" :defaultVal="defaultVal"></Select>
        </div>
        <div class="button filter" @click="searchMember">筛选</div>
        <div class="buttons-list">
          <div class="button"><router-link to="addUser">添加用户</router-link></div>
          <el-upload
            class="upload-demo"
            action="http://121.49.99.131/biolo_center_backgroud/apiBack/userBaseInfo/uploadUserXls.json" :on-success="handleAvatarSuccess" :before-upload="beforeAvatarUpload" :show-file-list="false">
            <el-button size="small" type="primary">批量导入</el-button>
          </el-upload>
        </div>
      </div>
      <Dtable :bodyData="tableData.tableBodyData" :titleData="tableData.tableTitle" :initData="tableData.initData" :currentPage="currentPage"></Dtable>
      <Page :pageData="totalPage" :currentPage="currentPage" v-on:getPage="getCurrentPage"></Page>
    </div>
    <div class="model-import-toast" v-show="modelToastShow">
      <div class="toast-bgd"></div>
      <div class="toast-warp">
        <div class="toast-box">
          <div class="toast-title">
            <p class="toast-text">错误提示</p>
          <span class="toast-close" @click="modelToastShow=false">
          </span>
          </div>
          <div class="toast-main">
            <p class="toast-main-title">上传失败</p>
            <ul class="toast-ul">
              <li class="toast-ul-li" v-for="item in wrongData">
                <p class="wrong-text">[{{item.name}}]</p>
                <p class="wrong-p">字段有<span>{{item.data}}</span>项填写错误</p>
              </li>
            </ul>
            <div class="yes-button" @click="modelToastShow=false">确定</div>
          </div>
        </div>
      </div>
    </div>
    <Toast :isShow="toastShow"></Toast>
  </div>
</template>
<script type="text/ecmascript-6">
  import services from '../../../api/api'
  export default{
    data(){
      return {
        modelToastShow:false,
        totalPage:0,
        currentPage:1,
        tableData:{
          tableTitle:['编号','学工号','姓名','用户类型','性别','证件号','手机号','注册时间','静脉信息','操作'],
          tableBodyData:[]
        },
        handle:[{handleName:'查看',link:'/userInfo'},{handleName:'修改',link:'/userInfoUpdate'}],
        selectData:[
          {
            value:'0',
            label:'请选择'
          },
          { value: '1',
            label: '学生'
          },
          { value: '2',
            label: '教职工'
          },
          { value: '3',
            label: '教职工家属'
          },
          { value: '4',
            label: '校友/合作'
          },
          { value: '5',
            label: '校外人员'
          }
        ],
        sexBook:{
          "0":'未知',
          "1":'男',
          "2":'女'
        },
        memberListDatas:[],
        modelImportWrong: {
          '用户姓名':0,
          '性别':0,
          '身份证号':0,
          '手机号':0,
          '用户类型':0,
          '学工号':0,
          '生日':0,
          '家庭住址':0
        },
        wrongData:[],
        toastShow:false,
        defaultVal:''
      }
    },
    methods:{
      /**
       * 获取当前页展示的会员列表数据
       */
      getCurrentData(data){
        services.getMemberList(data).then(res=>{
          if(res.status == '200'){
            this.totalPage = res.data.pages;
            if(this.totalPage==0)
              this.totalPage = 1;
            this.memberListDatas = res.data.datas;
            this.memberListDatas.forEach((item,index)=>{
              let time = new Date(item.createTime);
              let date = time.getFullYear()+"-"+parseInt(time.getMonth()+1)+"-"+time.getDate();
              let userType,sex;
              for(let i in this.selectData){
                if(this.selectData[i].value==item.userType)
                  userType = this.selectData[i].label;
              }
              for(let i in this.sexBook){
                if(item.sex==i)
                  sex = this.sexBook[i];
              }
              if(item.veinId=='-'||item.veinId=='0')
                item.veinId='无';
              let arr = [{data:parseInt(index+1)},{data:item.schoolIdentityNo},{data:item.userName},{data:userType},{data:sex},{data:item.chinaIdentityNo},{data:item.mobileNo},{data:date},{data:item.veinId}];
              this.tableData.tableBodyData.push({
                rowData:arr
              })
            })
            this.tableData.tableBodyData.forEach(item=>{
              item.rowData.push({data:"",btns:this.handle})
            })
            this.tableData.initData = this.memberListDatas;
          }
        })
      },
      /**
       * 搜索用户
       */
      searchMember(){
        this.tableData.tableBodyData = [];
        this.$store.state.memberSearchFlag = true;
        let getInit = true;
        let searchData = this.$store.state.memberSearchData;
        for(let i in searchData){
          if(i=='userType'){
            if(searchData[i].length>0&&searchData[i]!='0')
              getInit = false;
          }
          else {
            if (searchData[i].length > 0)
              getInit = false;
          }
        }
        if(getInit){
          let data = {
            "info.pageNum":1,
            "info.pageSize":15
          }
          this.getCurrentData(data);
        }
        else{
          if(searchData.userType=='0')
            searchData.userType = '';
          let data = searchData;
          data['info.pageNum'] = 1;
          data['info.pageSize'] = 15;
          this.getCurrentData(data);
        }
        this.$store.state.memberListPage =  this.currentPage = 1;
      },
      getSelectVal(text){
        this.$store.state.memberSearchData.userType = text;
      },
      getCurrentPage(text){
        this.$store.state.memberListPage = this.currentPage = text;
        this.tableData.tableBodyData = [];
        let searchData = this.$store.state.memberSearchData;
        if(this.$store.state.memberSearchFlag){
          if(searchData.userType=='0')
            searchData.userType = '';
          let data = searchData;
          data['info.pageNum'] = text;
          data['info.pageSize'] = 15;
          this.getCurrentData(data);
        }
        else{
          let data = {
            "info.pageNum":text,
            "info.pageSize":15
          }
          this.getCurrentData(data);
        }
      },
      handleAvatarSuccess(res,file){
        if(res.code!='000000'){
          this.wrongData = [ ];
          for(let i in this.modelImportWrong){
            this.modelImportWrong[i]=0;
          }
          this.$message.error(res.msg)
          res.data.forEach(item=>{
            for(let i in item.errorMap){
              this.modelImportWrong[i]++;
            }
          })
          for(let i in this.modelImportWrong){
            if(this.modelImportWrong[i]>0){
              this.wrongData.push({name:i,data:this.modelImportWrong[i]})
            }
          }
          this.modelToastShow = true;
          setTimeout(function(){
            var arr =  document.getElementsByClassName("toast-ul-li");
            for(let i=0;i<arr.length;i++){
              let w = arr[i].childNodes[0].offsetWidth+arr[i].childNodes[2].offsetWidth;
              arr[i].style.width = parseInt(w+5)+"px";
            }
          },500)
        }
        else if(res.code=="000000"){
          let data = {
            "info.pageNum":1,
            "info.pageSize":15
          }
          this.tableData.tableBodyData = [];
          this.getCurrentData(data)
          this.toastShow = true;
        }
      },
      beforeAvatarUpload(file){
        if(file.type=='application/vnd.ms-excel'||file.type=='application/vnd.openxmlformats-officedocument.spreadsheetml.sheet'){
          console.log('yes')
        }
        else{
          this.$message.error('只能上传xls或者xlsx格式的excel文件!');
        }
      }
    },
    mounted(){
    },
    created(){
      let searchData = this.$store.state.memberSearchData;
      let haveSearchData = false;
      for(let i in searchData){
        if(searchData[i]!='')
          haveSearchData = true;
      }
      if(this.$store.state.memberSearchFlag){
        if(haveSearchData){
          if(searchData.userType.length>0)
            this.selectData.forEach(item=>{
              if(item.value == searchData.userType){
                this.defaultVal = searchData.userType;
              }
            })
          let data = searchData;
          data['info.pageSize'] = 15;
          this.currentPage = data['info.pageNum'] = this.$store.state.memberListPage;
          this.getCurrentData(data);
        }else{
          let data = {"info.pageSize":15}
          this.currentPage = data['info.pageNum'] = this.$store.state.memberListPage;
          this.getCurrentData(data);
        }
      }else{
        let data = {"info.pageSize":15}
        this.currentPage = data['info.pageNum'] = this.$store.state.memberListPage;
        this.getCurrentData(data);
      }
    }
  }
</script>
<style>
.info-area .filter{position: absolute;bottom:40px;left: 450px;cursor: pointer}
.buttons-list{position:absolute;right: 5%;bottom:40px;overflow: hidden}
.buttons-list .button{float: left;margin:0 15px;cursor: pointer}
.download-model{float: right;font-size: 18px;color:#000000;cursor: pointer}
.user-list .el-upload{width: auto;float: left}
.user-list .el-upload .el-upload__inner{padding: 0px;border:none}
.user-list .el-upload .el-button--small{font-size: 14px;padding: 0 20px;height: 32px;line-height: 32px;background: #40b2ee}

 /*模板导入提示框 */
.model-import-toast,.model-import-toast .toast-bgd,.model-import-toast .toast-warp{height: 100%;width: 100%;position: absolute;top:0;}
.model-import-toast{z-index: 999;}
.model-import-toast .toast-bgd{background: #000000;opacity:0.7;z-index: 1000;left: 0}
.model-import-toast .toast-box{background: #ffffff;width: 500px;position: absolute;left: 50%;margin-left: -300px;top:20%;}
.model-import-toast .toast-warp{z-index: 1001;left: 0}
.model-import-toast .toast-title{position: relative;left:0;top:0;  padding: 18px 60px 16px 38px;  border-bottom: 1px solid #eceff1;font-size: 20px;font-weight: bold}
.model-import-toast .toast-text{padding-left:20px;}
.model-import-toast .toast-title:before{content: '';  width: 10px;  height: 27px;  background-color: #e46f82;position: absolute}
.model-import-toast .toast-main{max-height: 360px;  padding: 30px 88px;}
.model-import-toast .toast-close{cursor:pointer;display:block;height: 20px;width: 20px;position: absolute;right:20px;top:20px;background: url("../../../assets/images/common/close.png")no-repeat}
.model-import-toast .toast-ul{max-height:300px;overflow: auto}
.model-import-toast .toast-ul li{overflow: hidden;padding:5px 0;margin:0 auto;width: 200px;}
.model-import-toast .toast-main-title{padding-left: 40px;font-size: 20px;font-weight: bold;position: relative;width: 90px;line-height: 32px;margin:0 auto;}
.model-import-toast .toast-main-title:before{content: '';height: 32px;width: 32px;background: url("../../../assets/images/common/wrong.png")no-repeat;position: absolute;left:0;top:0;}
.model-import-toast .toast-ul li p{float: left;letter-spacing: 2px;}
.model-import-toast .toast-ul li p.wrong-text{margin-right: 5px;}
.model-import-toast .toast-ul li p span{color:#e46f82}
.model-import-toast .yes-button{color:#ffffff;width: 150px;padding: 6px 0;cursor: pointer;text-align: center;background: #40b2ee;margin:10px auto;}

.user-list .upload-demo{float: left}
</style>
