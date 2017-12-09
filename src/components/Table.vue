<template>
  <div class="default-table">
    <table>
      <thead>
        <tr class="odd">
          <th v-for="item in tableTitle">{{item}}</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="(item,index) in tableBodyData" :class="[item.backgroundFlag?'odd':'']">
          <td v-for="option in item.rowData">{{option.data}}<span v-if="option.btns" v-for="btn in option.btns" class="table-btn" @click="tableHandle(btn,index)">{{btn.handleName}}</span></td>
        </tr>
      </tbody>
    </table>
  </div>
</template>
<script type="text/ecmascript-6">
  export default{
    name:"Dtable",
    props:['bodyData','titleData','initData','currentPage'],
    data(){
      return {
        tableTitle:[],
        tableBodyData:[]
      }
    },
    methods:{
      /**
       * 初始化奇数行背景色
       */
      tableInit(){
        this.tableBodyData.forEach(function(item,index){
          if(index%2==1)
            item.backgroundFlag = true;
        })
      },
      /**
       * 操作table上的按钮
       */
      tableHandle(item,index){
        var id = this.initData[index].id;
        this.$router.push({path:item.link,query:{index:id}})
      }
    },
    mounted(){
    },
    created(){
      this.tableTitle = this.titleData;
      this.tableBodyData = this.bodyData;
      this.tableInit();
    },
    watch:{
      bodyData:function(){
        this.tableBodyData = this.bodyData;
      }
    }
  }
</script>
<style>
.default-table{margin-top:30px;position: relative;border: 1px solid #bfbfbf;  border-radius: 2px; background-color: #eceff1;padding-bottom: 18px;}
.default-table table{width: 100%;border-collapse: collapse;  border-spacing: 0;  background-color: #ffffff;  color: #191919;}
.default-table table .odd{background: rgb(243, 244, 246)}
.default-table table>thead th{background-color: #eceff1;color: #000000; padding: 15px 6px 16px 20px;  border-bottom: 1px solid #bfbfbf;  font-size: 14px; text-align: left;}
.default-table table>tbody tr td{border-bottom: 1px solid #bfbfbf; font-size: 14px; padding: 8px 6px 8px 20px; vertical-align: middle;}
.table-btn{display: inline-block;padding: 2px 8px;border:1px solid #cfd8dc;margin:0 4px;cursor: pointer;min-width: 28px;}
.table-btn a{color:#000000}
</style>
