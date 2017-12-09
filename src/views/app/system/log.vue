<template>
  <div class="log-management child-page-box">
    <div class="child-page-title">
      <a>系统管理</a>
      <span>&nbsp>&nbsp</span>
      <a>操作日志</a>
    </div>
    <div class="child-page-container">
      <div class="title-text">
        <span>操作日志</span>
      </div>
      <div class="info-area">
        <div class="search">
          <div class="input-area">
            <p class="input-describe">姓名查询</p>
            <input type="text" class="common-input" v-model="searchName" placeholder="请输入登陆名/用户名"/>
          </div>
          <div class="input-area time-interval">
            <p class="input-describe">起止时间</p>
            <DatePicker v-on:startTime="getStartTime" :event="startTimeEvent"></DatePicker>
            <span></span>
            <DatePicker v-on:endTime="getEndTime" :event="endTimeEvent"></DatePicker>
          </div>
          <div class="button" @click="search">搜索</div>
        </div>
        <Dtable :bodyData="tableData.tableBodyData" :titleData="tableData.tableTitle" :initData="tableData.initData" :currentPage="currentPage"></Dtable>
        <Page :pageData="totalPage" :currentPage="currentPage" v-on:getPage="getCurrentPage"></Page>
      </div>
    </div>
  </div>
</template>
<script type="text/ecmascript-6">
  import services from '../../../api/api'
  export default{
    data(){
      return {
        tableData:{
          tableTitle:['序号','登陆名','用户名','IP地址','操作功能','操作内容','调用方法','操作时间','备注'],
          tableBodyData:[],
          initData:[]
        },
        currentPage:1,
        totalPage:0,
        startTimeEvent:'startTime',
        endTimeEvent:'endTime',
        searchName:'',
        startTime:'',
        endTime:''
      }
    },
    methods:{
      /**
       * 获取列表页数据
       * @param data
         */
      getInitData(data){
        services.getLogList(data).then(res=>{
          this.tableData.tableBodyData = this.tableData.initData = []
          let result = this.tableData.initData = res.data.datas;
          this.totalPage = res.data.pages;
          this.tableData.initData.forEach((item,index)=>{
            let time = new Date(item.operateTime);
            let date = time.getFullYear()+"-"+parseInt(time.getMonth()+1)+"-"+time.getDate();
            let arr = [{data:parseInt(index+1)},{data:item.username},{data:item.realname},{data:item.ip},{data:item.module},{data:item.action},{data:item.method},{data:date},{data:item.remark}]
            this.tableData.tableBodyData.push({
              rowData:arr
            })
          })
        })
      },
      /**
       * 得到当前页数
       * @param text
       */
      getCurrentPage(text){
        this.currentPage = text;
        this.tableData.tableBodyData = [];
        let data = {
          'info.pageNum':this.currentPage,
          'info.pageSize':15
        }
        this.getInitData(data);
      },
      getStartTime(text){
        this.startTime = text.replace(/\-/g,'/')
      },
      getEndTime(text){
        this.endTime = text.replace(/\-/g,'/')
      },
      search(){
        this.currentPage = 1;
        let data = {
          'info.pageNum':this.currentPage,
          'info.pageSize':15
        }
        data.realname = this.searchName;
        data.queryDateStart = this.startTime;
        data.queryDateEnd = this.endTime;
        this.getInitData(data);
      }
    },
    created(){
      let data = {
        'info.pageNum':this.currentPage,
        'info.pageSize':15
      }
      this.getInitData(data);
    }
  }
</script>
<style>
.log-management .input-area{float: left;margin-right: 20px;}
.log-management .input-area .input-describe{min-width: 60px;margin-right: 0px;}
.log-management .input-area .common-input{width: 180px;}
.log-management .search{height: 50px;}
.time-interval span{float: left;width: 20px;border-top:1px solid #000000;margin-top:18px;}
.log-management .block-el .el-date-editor.el-input{width: 190px;}
.log-management .button{margin-top:10px}
</style>
