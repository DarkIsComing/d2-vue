(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-e9bd016a"],{"0ded":function(e,t,a){},"0edb":function(e,t,a){"use strict";var l=a("0ded"),o=a.n(l);o.a},1933:function(e,t,a){"use strict";a.d(t,"e",(function(){return o})),a.d(t,"g",(function(){return n})),a.d(t,"d",(function(){return s})),a.d(t,"f",(function(){return i})),a.d(t,"a",(function(){return c})),a.d(t,"b",(function(){return r})),a.d(t,"c",(function(){return u}));var l=a("9bd2");function o(e){return console.log("传入的参数",e),Object(l["a"])({url:"/admin/resource/",method:"get",params:e})}function n(e){return console.log("传入的参数",e),Object(l["a"])({url:"/admin/resource/",method:"delete",data:e})}function s(e){return console.log("传入的参数",e),Object(l["a"])({url:"/admin/resource/detail/",method:"get",params:e})}function i(e){return console.log("传入的参数",e),Object(l["a"])({url:"/admin/resource/recommand/",method:"get",params:e})}function c(e){return console.log("传入的参数",e),Object(l["a"])({url:"/admin/resource/recommand/",method:"post",data:e})}function r(e){return console.log("传入的参数",e),Object(l["a"])({url:"/admin/resource/recommand/",method:"delete",data:e})}function u(e){return console.log("传入的参数",e),Object(l["a"])({url:"/admin/resource/recommand/detail",method:"get",params:e})}},"7bde":function(e,t,a){"use strict";var l=function(){var e=this,t=e.$createElement,a=e._self._c||t;return a("div",{staticClass:"imgs"},[a("img",{attrs:{src:"http://192.168.1.143:8000"+e.imgs,alt:""}})])},o=[],n={name:"myImg",data:function(){return{image:{}}},props:{scope:{default:null}},computed:{imgs:function(){return this.scope.row.user_image}},mounted:function(){console.log(this.scope)}},s=n,i=(a("8433"),a("2877")),c=function(e){e.options.__source="src/components/myCom/tableImg.vue"},r=c,u=Object(i["a"])(s,l,o,!1,null,null,null);"function"===typeof r&&r(u);t["a"]=u.exports},8433:function(e,t,a){"use strict";var l=a("e120"),o=a.n(l);o.a},ca45:function(e,t,a){"use strict";a.r(t);var l=function(){var e=this,t=e.$createElement,a=e._self._c||t;return a("div",{staticClass:"child2"},[a("div",{staticClass:"head_nav"},[a("el-button",{staticStyle:{"margin-bottom":"5px"},attrs:{slot:"header",type:"primary"},on:{click:e.exportExcel},slot:"header"},[e._v("导出")]),a("el-button",{staticStyle:{"margin-bottom":"5px"},attrs:{slot:"header",type:"danger"},on:{click:e.stops},slot:"header"},[e._v("刪除")]),a("span",{staticClass:"demonstration",staticStyle:{"margin-bottom":"5px"},attrs:{slot:"header"},slot:"header"},[e._v("发布时间")]),a("el-date-picker",{attrs:{type:"date",placeholder:"选择日期"},model:{value:e.value1,callback:function(t){e.value1=t},expression:"value1"}}),a("span",{staticClass:"demonstration",staticStyle:{"margin-bottom":"5px"},attrs:{slot:"header"},slot:"header"},[e._v("用户昵称")]),a("el-input",{staticStyle:{"margin-bottom":"5px",width:"500px"},attrs:{slot:"header",placeholder:"请输入用户昵称"},slot:"header",model:{value:e.name,callback:function(t){e.name=t},expression:"name"}}),a("span",{staticClass:"demonstration"},[e._v("资源定位")]),a("el-cascader",{attrs:{options:e.Resource,props:{expandTrigger:"hover"}},on:{change:e.handleChange},model:{value:e.resource,callback:function(t){e.resource=t},expression:"resource"}}),a("span",{staticClass:"demonstration",staticStyle:{"margin-bottom":"5px"},attrs:{slot:"header"},slot:"header"},[e._v("资源城市")]),a("el-input",{staticStyle:{"margin-bottom":"5px",width:"500px"},attrs:{slot:"header",placeholder:"请输入资源城市"},slot:"header",model:{value:e.city,callback:function(t){e.city=t},expression:"city"}}),a("el-button",{staticStyle:{"margin-bottom":"5px","margin-left":"15px"},attrs:{slot:"header",type:"primary"},on:{click:e.query},slot:"header"},[e._v("查询")]),a("el-button",{staticStyle:{"margin-bottom":"5px"},attrs:{slot:"header",type:"info"},on:{click:e.reset},slot:"header"},[e._v("重置")])],1),a("d2-crud",{ref:"d2Crud",attrs:{columns:e.columns,data:e.data,loading:e.loading,"loading-options":e.loadingOptions,"selection-row":"",rowHandle:e.rowHandle,pagination:e.pagination,options:e.options},on:{"selection-change":e.handleSelectionChange,"current-change":e.handleCurrentChange,"custom-emit-1":e.viewDetail,"custom-emit-2":e.open_recommend,"pagination-current-change":e.paginationCurrentChange}}),a("el-dialog",{attrs:{title:"推荐",visible:e.dialogFormVisible},on:{"update:visible":function(t){e.dialogFormVisible=t}}},[a("span",[e._v(" 电脑端投放")]),a("div",{staticClass:"time"},[a("span",[e._v("起始时间")]),a("el-date-picker",{attrs:{"value-format":"yyyy-MM-dd",type:"datetime",placeholder:"选择日期时间"},model:{value:e.pc_start_time,callback:function(t){e.pc_start_time=t},expression:"pc_start_time"}})],1),a("div",{staticClass:"time"},[a("span",[e._v("结束时间")]),a("el-date-picker",{attrs:{"value-format":"yyyy-MM-dd",type:"datetime",placeholder:"选择日期时间"},model:{value:e.pc_end_time,callback:function(t){e.pc_end_time=t},expression:"pc_end_time"}}),a("el-switch",{attrs:{"active-text":"置顶","inactive-text":"不置顶"},model:{value:e.pc_top_show,callback:function(t){e.pc_top_show=t},expression:"pc_top_show"}})],1),a("span",[e._v(" 手机端投放")]),a("div",{staticClass:"time"},[a("span",[e._v("起始时间")]),a("el-date-picker",{attrs:{"value-format":"yyyy-MM-dd",type:"datetime",placeholder:"选择日期时间"},model:{value:e.phone_start_time,callback:function(t){e.phone_start_time=t},expression:"phone_start_time"}})],1),a("div",{staticClass:"time"},[a("span",[e._v("结束时间")]),a("el-date-picker",{attrs:{"value-format":"yyyy-MM-dd",type:"datetime",placeholder:"选择日期时间"},model:{value:e.phone_end_time,callback:function(t){e.phone_end_time=t},expression:"phone_end_time"}}),a("el-switch",{attrs:{"active-text":"置顶","inactive-text":"不置顶"},model:{value:e.phone_top_show,callback:function(t){e.phone_top_show=t},expression:"phone_top_show"}})],1),a("span",[e._v("显示地区")]),a("el-select",{attrs:{placeholder:"请选择"},model:{value:e.map,callback:function(t){e.map=t},expression:"map"}},e._l(e.mapOptions,(function(e){return a("el-option",{key:e.value,attrs:{label:e.label,value:e.value}})})),1),a("div",{staticClass:"dialog-footer",attrs:{slot:"footer"},slot:"footer"},[a("el-button",{on:{click:e.quit}},[e._v("取 消")]),a("el-button",{attrs:{type:"primary"},on:{click:e.recommend}},[e._v("确 定")])],1)],1),a("myImg")],1)},o=[],n=(a("d81d"),a("b0c0"),a("53ca")),s=a("1933"),i=a("7bde"),c={components:{myImg:i["a"]},data:function(){return{select_list:[],dialogFormVisible:!1,currentId:"",map:"",mapOptions:[{value:"0",label:"本地城市"},{value:"1",label:"外地城市"}],phone_top_show:!1,pc_top_show:!1,phone_start_time:"",phone_end_time:"",pc_start_time:"",pc_end_time:"",columns:[{title:"发布时间",key:"create_time",width:"180"},{title:"用户头像",key:"user_image",width:"180",component:{name:i["a"]}},{title:"用户昵称",key:"use_name"},{title:"发布标题",key:"name"},{title:"资源城市",key:"map"},{title:"资源定位",key:"status_text"},{title:"是否保密",key:"lock"}],outCoulum:[{label:"发布时间",prop:"create_time"},{label:"用户昵称",prop:"use_name"},{label:"发布标题",prop:"name"},{label:"资源城市",prop:"map"},{label:"资源定位",prop:"status_text"},{label:"是否保密",prop:"lock"}],data:[],loading:!0,loadingOptions:{text:"拼命加载中",spinner:"el-icon-loading",background:"rgba(0, 0, 0, 0.8)"},pagination:{currentPage:1,pageSize:20,total:0},options:{strip:!0,height:"650",highlightCurrentRow:!0,defaultSort:{prop:"date",order:"descending"}},resource:[],Resource:[{value:"0",label:"注册公司",children:[{value:"3",label:"行业信息"},{value:"0",label:"我提供注册"},{value:"1",label:"我需要注册"},{value:"4",label:"提供付费咨询"},{value:"5",label:"愿意付费咨询"}]},{value:"1",label:"财政纳税",children:[{value:"3",label:"财政信息"},{value:"0",label:"提供纳税服务"},{value:"1",label:"需要纳税服务"},{value:"4",label:"提供付费咨询"},{value:"5",label:"愿意付费咨询"}]},{value:"2",label:"法律咨询",children:[{value:"3",label:"法律信息"},{value:"0",label:"提供法律咨询"},{value:"1",label:"需要法律咨询"},{value:"4",label:"提供付费咨询"},{value:"5",label:"愿意付费咨询"}]},{value:"3",label:"职业规划",children:[{value:"3",label:"职场信息"},{value:"0",label:"提供职业规划"},{value:"1",label:"需要职业规划"},{value:"4",label:"提供付费咨询"},{value:"5",label:"愿意付费咨询"}]},{value:"4",label:"人才服务",children:[{value:"3",label:"人才信息"},{value:"0",label:"公司找人"},{value:"1",label:"人找公司"}]},{value:"5",label:"政策解读",children:[{value:"3",label:"政策新闻"},{value:"0",label:"提供政策解读"},{value:"1",label:"需要政策解读"},{value:"4",label:"提供付费咨询"},{value:"5",label:"愿意付费咨询"}]},{value:"6",label:"兼职零工",children:[{value:"1",label:"个人找兼职"},{value:"0",label:"公司找零时工"}]},{value:"7",label:"共享资源",children:[{value:"3",label:"我分享"},{value:"0",label:"我提供"},{value:"1",label:"我需要"},{value:"2",label:"我悬赏"}]}],selectOptions:[{value:"3",label:"行业信息"},{value:"0",label:"我提供注册"},{value:"5",label:"愿意付费咨询"},{value:"4",label:"提供付费咨询"},{value:"1",label:"我需要注册"}],ItemOptions:[{value:"0",label:"注册公司"},{value:"1",label:"财政纳税"},{value:"2",label:"法律咨询"},{value:"3",label:"职业规划"},{value:"4",label:"人才服务"},{value:"5",label:"政策解读"},{value:"6",label:"兼职零工"},{value:"7",label:"共享资源"}],job:"",status:"",type_status:"",city:"",name:"",rowHandle:{custom:[{text:"查看详情",type:"Success",size:"small",emit:"custom-emit-1"},{text:"推荐",size:"small",fixed:"right",emit:"custom-emit-2"}]},value1:"",sels:[]}},methods:{handleChange:function(e){console.log(e[0],e[1],this.resource),this.status=e[1],this.type_status=e[0]},quit:function(){this.dialogFormVisible=!1},open_recommend:function(e){e.index;var t=e.row;this.dialogFormVisible=!0,this.currentId=t.id},recommend:function(){this.dialogFormVisible=!1,console.log(this.pc_start_time,this.pc_end_time,this.phone_start_time,this.phone_end_time,this.pc_top_show,this.phone_top_show),Object(s["a"])({pc_start_time:this.pc_start_time,pc_end_time:this.pc_end_time,phone_start_time:this.phone_start_time,phone_end_time:this.phone_end_time,pc_top_show:this.pc_top_show,phone_top_show:this.phone_top_show,map:this.map,id:this.currentId}).then((function(e){console.log(e,"success")})).catch((function(e){return console.log(e,"error")}))},handleSelectionChange:function(e){console.log("选择",e),this.sels=e},viewDetail:function(e){e.index;var t=e.row;this.$router.push({name:"resourceDetail",query:{id:t.id}})},stops:function(){var e=this;console.log(this.sels,Object(n["a"])(this.sels));var t=this.sels.map((function(e){return e.id}));console.log("ids:",t,Object(n["a"])(t)),this.$confirm("确认删除选中记录吗？","提示",{type:"warning"}).then((function(){setTimeout((function(){Object(s["g"])({id:t}).then((function(t){e.$message({message:"删除成功",type:"success"}),Object(s["f"])({create_time:"",map:"",status:"",item:"",page:1,size:20,type_status:"",recommand_status:1}).then((function(t){e.data=t.data,e.pagination.total=t.count,e.loading=!1})).catch((function(t){console.log("err",t),e.loading=!1})),console.log(t,"success")})).catch((function(e){return console.log(e,"error")}))}),300)})).catch((function(){}))},paginationCurrentChange:function(e){this.pagination.currentPage=e,this.fetchData(e)},fetchData:function(e){var t=this;this.loading=!0,Object(s["f"])({create_time:this.value1,map:this.city,status:this.status,item:this.name,page:e,size:20,type_status:this.type_status,recommand_status:1}).then((function(e){console.log(e,"success"),t.data=e.data,t.pagination.total=e.count,t.loading=!1})).catch((function(e){console.log("err",e),t.loading=!1}))},exportExcel:function(){var e=this;console.log(this.columns,this.data),this.$export.excel({columns:this.outCoulum,data:this.data,header:"用户列表"}).then((function(){console.log("数据:",e.$refs.d2Crud.d2CrudData),e.$message("导出表格成功")}))},query:function(e){var t=this;console.log(this.value1,this.city,this.status,this.name),Object(s["f"])({create_time:this.value1,item:this.name,map:this.city,status:this.status,page:1,size:20,type_status:this.type_status,recommand_status:1}).then((function(e){t.data=e.data,t.loading=!1,t.pagination.total=e.count,console.log(e,"success")})).catch((function(e){return console.log(e,"error")}))},reset:function(){var e=this;this.loading=!0,this.value1="",this.city="",this.resource="",this.status="",this.type_status="",this.name="",Object(s["f"])({create_time:"",map:"",status:"",item:"",page:1,size:20,type_status:"",recommand_status:1}).then((function(t){e.loading=!1,e.data=t.data,e.pagination.total=t.count,console.log(t,"success")})).catch((function(e){return console.log(e,"error")}))}},mounted:function(){var e=this;Object(s["f"])({create_time:"",map:"",status:"",item:"",page:1,size:20,type_status:"",recommand_status:1}).then((function(t){e.loading=!1,e.data=t.data,e.pagination.total=t.count,console.log(t,"success")})).catch((function(e){return console.log(e,"error")}))}},r=c,u=(a("0edb"),a("2877")),d=function(e){e.options.__source="src/views/pages/resource/recommend/news.vue"},p=d,m=Object(u["a"])(r,l,o,!1,null,null,null);"function"===typeof p&&p(m);t["default"]=m.exports},e120:function(e,t,a){}}]);