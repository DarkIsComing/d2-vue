(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-60f72dc2"],{"2c9e":function(t,e,n){"use strict";n.r(e);var a=function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("d2-container",[n("template",{slot:"header"},[n("el-button",{staticStyle:{"margin-bottom":"5px"},attrs:{slot:"header"},on:{click:t.exportExcel},slot:"header"},[t._v("导出")]),n("span",{staticClass:"demonstration",staticStyle:{"margin-bottom":"5px"},attrs:{slot:"header"},slot:"header"},[t._v("订单生成时间")]),n("el-date-picker",{attrs:{slot:"header",type:"daterange","value-format":"yyyy-MM-dd",align:"right","unlink-panels":"","range-separator":"-","start-placeholder":"开始日期","end-placeholder":"结束日期","picker-options":t.pickerOptions},slot:"header",model:{value:t.value2,callback:function(e){t.value2=e},expression:"value2"}}),n("span",{staticClass:"demonstration",staticStyle:{"margin-bottom":"5px"},attrs:{slot:"header"},slot:"header"},[t._v("需求方/供给方")]),n("el-input",{staticStyle:{"margin-bottom":"5px"},attrs:{slot:"header",placeholder:"请输入需求方/供给方"},slot:"header",model:{value:t.input,callback:function(e){t.input=e},expression:"input"}}),n("el-button",{staticStyle:{"margin-bottom":"5px"},attrs:{slot:"header",type:"primary"},on:{click:t.query},slot:"header"},[t._v("查询")]),n("el-button",{staticStyle:{"margin-bottom":"5px"},attrs:{slot:"header",type:"info"},on:{click:t.reset},slot:"header"},[t._v("重置")])],1),n("d2-crud",{ref:"d2Crud",attrs:{columns:t.columns,data:t.data,loading:t.loading,"loading-options":t.loadingOptions,"selection-row":"",rowHandle:t.rowHandle,pagination:t.pagination,options:t.options},on:{"selection-change":t.handleSelectionChange,"current-change":t.handleCurrentChange,"custom-emit-1":t.handleCustomEvent,"pagination-current-change":t.paginationCurrentChange}})],2)},o=[],i=n("9bd2");function r(t){return console.log("传入的参数",t),Object(i["a"])({url:"/admin/order/",method:"get",params:t})}var s={data:function(){return{input:"",columns:[{title:"订单生成时间",key:"create_time",width:"180"},{title:"订单编号",key:"id",width:"180"},{title:"需求方昵称",key:"use_name"},{title:"供给方昵称",key:"receive_use_name"},{title:"交易金额",key:"amount",sortable:!0}],outCoulum:[{label:"订单生成时间",prop:"create_time"},{label:"订单编号",prop:"id"},{label:"需求方昵称",prop:"use_name"},{label:"供给方昵称",prop:"receive_use_name"},{label:"交易金额",prop:"amount"}],data:[],loading:!1,loadingOptions:{text:"拼命加载中",spinner:"el-icon-loading",background:"rgba(0, 0, 0, 0.8)"},pagination:{currentPage:1,pageSize:20,total:0},options:{strip:!0,height:"650",highlightCurrentRow:!0,defaultSort:{prop:"date",order:"descending"}},rowHandle:{custom:[{text:"查看详情",type:"primary ",size:"small",emit:"custom-emit-1"}]},pickerOptions:{shortcuts:[{text:"最近一周",onClick:function(t){var e=new Date,n=new Date;n.setTime(n.getTime()-6048e5),t.$emit("pick",[n,e])}},{text:"最近一个月",onClick:function(t){var e=new Date,n=new Date;n.setTime(n.getTime()-2592e6),t.$emit("pick",[n,e])}},{text:"最近三个月",onClick:function(t){var e=new Date,n=new Date;n.setTime(n.getTime()-7776e6),t.$emit("pick",[n,e])}}]},value1:"",value2:""}},methods:{handleSelectionChange:function(t){console.log("选择",t)},paginationCurrentChange:function(t){this.pagination.currentPage=t,this.fetchData(t)},fetchData:function(t){var e=this;this.loading=!0,r({start_time:"",end_time:"",item:"",page:t,size:20}).then((function(n){console.log("分页返回的数据",t,n.data),e.data=n.data,e.pagination.total=n.count,e.loading=!1})).catch((function(t){console.log("err",t),e.loading=!1}))},exportExcel:function(){var t=this;console.log(this.columns,this.data),this.$export.excel({columns:this.outCoulum,data:this.data,header:"订单列表"}).then((function(){console.log("数据:",t.$refs.d2Crud.d2CrudData),t.$message("导出表格成功")}))},query:function(t){var e=this;r({start_time:this.value2[0],end_time:this.value2[1],item:this.input,page:1,size:20}).then((function(t){e.data=t.data,console.log(t,"success")})).catch((function(t){return console.log(t,"error")}))},reset:function(){var t=this;this.input="",this.value2="",r({start_time:"",end_time:"",item:this.input,page:1,size:20}).then((function(e){t.data=e.data,console.log(e,"success")})).catch((function(t){return console.log(t,"error")}))}},mounted:function(){var t=this;r({start_time:"",end_time:"",item:"",page:1,size:20}).then((function(e){t.data=e.data,t.pagination.total=e.count,console.log(e,"success")})).catch((function(t){return console.log(t,"error")}))}},l=s,c=(n("9bca"),n("2877")),u=function(t){t.options.__source="src/views/pages/order/index.vue"},d=u,p=Object(c["a"])(l,a,o,!1,null,null,null);"function"===typeof d&&d(p);e["default"]=p.exports},"7aa1":function(t,e,n){},"9bca":function(t,e,n){"use strict";var a=n("7aa1"),o=n.n(a);o.a}}]);