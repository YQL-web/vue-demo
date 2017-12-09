<template>
  <div class="app-info child-page-box">
    <div class="child-page-title">
      <a>应用管理</a>
      <span>&nbsp>&nbsp</span>
      <a>应用信息管理</a>
    </div>
    <div class="child-page-container">
      <div class="title-text">
        <span>应用信息列表</span>
        <p>权限管理</p>
      </div>
      <div class="info-area">
        <div class="search">
          <input type="text" placeholder="请输入应用名"/>
          <div class="btn">搜索</div>
          <div class="button">+新增应用</div>
        </div>
        <Dtable :bodyData="tableData.tableBodyData" :titleData="tableData.tableTitle" :initData="tableData.initData" :currentPage="currentPage"></Dtable>
        <Page :pageData="totalPage" :currentPage="currentPage" v-on:getPage="getCurrentPage"></Page>
      </div>
    </div>
    <div class="handle-area">
      <div class="handle-bgd"></div>
      <div class="handle-box">
        <div class="app-handle-box add-or-update">
          <div class="title">
            <p class="title-text">{{handleBoxTitle}}</p>
          </div>
          <div class="content">
            <div class="input-area">
              <p class="input-describe">应用名称</p>
              <input type="text"/>
            </div>
            <div class="input-area">
              <p class="input-describe">应用状态</p>
              <Radio :radioData="stateArr"></Radio>
            </div>
          </div>
        </div>
        <div class="authority-handle-box" v-show="authorityFlag"></div>
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
          tableTitle:['序号','应用ID','应用名称','应用密钥','创建时间','应用状态','操作'],
          tableBodyData:[],
          initData:[]
        },
        handle:[{handleName:'修改',link:'/appInfoList'}],
        currentPage:1,
        totalPage:1,
        stateArr:[],
        authorityFlag:false,
        handleBoxTitle:"修改应用信息"
      }
    },
    methods:{
      getInfo(data){
        services.getAppList(data).then(res=>{
          if(res.data.code = '000000'){
            this.tableData.tableBodyData = this.tableData.initData = []
            let result = this.tableData.initData =  res.data.datas;
            this.totalPage = res.data.pages;
            this.tableData.initData.forEach((item,index)=>{
              let Time = new Date(item.createTime);
              let date = Time.getFullYear()+'-'+parseInt(Time.getMonth()+1)+'-'+Time.getDate();
              let time = Time.getHours()+':'+Time.getMinutes()+':'+Time.getSeconds();
              let state = item.isUsable==1?'启用':'关闭'
              let arr = [{data:parseInt(index+1)},{data:item.appId},{data:item.appName},{data:item.appSercet},{data:date+' '+time},{data:state},{data:'',btns:this.handle}]
              this.tableData.tableBodyData.push({
                rowData:arr
              })
            })
          }
        })
      },
      getCurrentPage(text){
        console.log(text)
      }
    },
    created(){
      let data = {
        'info.pageNum':this.currentPage,
        'info.pageSize':10
      }
      this.getInfo(data);
    }
  }
</script>
<style>
.app-info .child-page-container .title-text p{font-size: 14px;background: red;float: left;color:#ffffff;padding: 10px 20px ;margin: 0px 10px;border-radius: 5px;cursor: pointer}
.app-info .search{position: absolute;top:-60px;right: 10px;}
.app-info .search input{float: left;height: 30px;width: 200px;line-height: 30px;border-radius: 4px;outline: none;border:1px solid #ddd;padding: 0 10px;}
.app-info .search .btn{float: left;color:#ffffff;background: #d4d4d4;border-radius: 5px;margin:0 40px 0 10px;padding: 6px 12px;cursor: pointer}
.handle-area,.handle-bgd,.handle-box{width: 100%;height: 100%;position: absolute;top:0;left: 0;}
.handle-area{z-index: 998;}
.handle-bgd{z-index: 999}
.handle-box{z-index: 1000}
.app-handle-box{width: 400px;height: 250px;background: #ffffff;box-shadow: 4px 4px 10px #ddd;position: absolute;top:50%;left: 50%;margin:-125px 0 0 -225px}
.handle-box .title{position: relative;left:0;top:0;  padding: 18px 60px 16px 38px;  border-bottom: 1px solid #eceff1;font-size: 20px;font-weight: bold}
.handle-box .title-text{padding-left:20px;}
.handle-box .title:before{content: '';  width: 10px;  height: 27px;  background-color: #e46f82;position: absolute}
</style>
