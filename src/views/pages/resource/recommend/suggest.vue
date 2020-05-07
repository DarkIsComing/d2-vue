<template>
  <div class="child1">
    <div class="head_nav">
      <el-button slot="header"
                 style="margin-bottom: 5px"
                 @click="exportExcel">导出</el-button>

      <el-button slot="header"
                 style="margin-bottom: 5px"
                 @click="stops">取消</el-button>
      <span class="demonstration"
            slot="header"
            style="margin-bottom: 5px">行业类目</span>
      <el-select v-model="job"
                 placeholder="请选择">
        <el-option v-for="item in ItemOptions"
                   :key="item.value"
                   :label="item.label"
                   :value="item.value">
        </el-option>
      </el-select>
      <span class="demonstration"
            slot="header"
            style="margin-bottom: 5px">资源定位</span>
      <el-select v-model="status"
                 placeholder="请选择">
        <el-option v-for="item in selectOptions"
                   :key="item.value"
                   :label="item.label"
                   :value="item.value">
        </el-option>
      </el-select>
      <span class="demonstration"
            slot="header"
            style="margin-bottom: 5px">广告城市</span>
      <el-input slot="header"
                style="margin-bottom: 5px, width:200px"
                v-model="city"
                placeholder="请输入广告城市">
      </el-input>
      <el-button slot="header"
                 style="margin-bottom: 5px"
                 type="primary"
                 @click="query">查询</el-button>
      <el-button slot="header"
                 type="info"
                 style="margin-bottom: 5px"
                 @click="reset">重置</el-button>

    </div>
    <d2-crud ref="d2Crud"
             :columns="columns"
             :data="data"
             :loading="loading"
             :loading-options="loadingOptions"
             selection-row
             @selection-change="handleSelectionChange"
             @current-change="handleCurrentChange"
             :rowHandle="rowHandle"
             @row-remove="handleRowRemove"
             @custom-emit-1="open_recommend"
             @custom-emit-2="unrecommend"
             :pagination="pagination"
             @pagination-current-change="paginationCurrentChange"
             :options="options">
    </d2-crud>
    <el-dialog title="推荐"
               :visible.sync="dialogFormVisible">
      <span> 电脑端投放</span>
      <div class='time'>
        <span>起始时间</span>
        <el-date-picker v-model="pc_start_time"
                        value-format="yyyy-MM-dd"
                        type="datetime"
                        placeholder="选择日期时间">
        </el-date-picker>
      </div>
      <div class='time'>
        <span>结束时间</span>
        <el-date-picker v-model="pc_end_time"
                        value-format="yyyy-MM-dd"
                        type="datetime"
                        placeholder="选择日期时间">
        </el-date-picker>
        <el-switch v-model="pc_top_show"
                   active-text="置顶"
                   inactive-text="不置顶">
        </el-switch>
      </div>

      <span> 手机端投放</span>
      <div class='time'>
        <span>起始时间</span>
        <el-date-picker v-model="phone_start_time"
                        value-format="yyyy-MM-dd"
                        type="datetime"
                        placeholder="选择日期时间">
        </el-date-picker>
      </div>
      <div class='time'>
        <span>结束时间</span>
        <el-date-picker v-model="phone_end_time"
                        value-format="yyyy-MM-dd"
                        type="datetime"
                        placeholder="选择日期时间">
        </el-date-picker>
        <el-switch v-model="phone_top_show"
                   active-text="置顶"
                   inactive-text="不置顶">
        </el-switch>
      </div>

      <span>显示地区</span>
      <el-select v-model="map"
                 placeholder="请选择">
        <el-option v-for="item in mapOptions"
                   :key="item.value"
                   :label="item.label"
                   :value="item.value">
        </el-option>

      </el-select>
      <div>
        <el-button type="text"
                   @click="viewDetail">前往资源详情</el-button>
      </div>

      <div slot="footer"
           class="dialog-footer">
        <el-button @click="quit">取 消</el-button>
        <el-button type="primary"
                   @click="recommend">确 定</el-button>
      </div>
    </el-dialog>
    <myImg></myImg>
  </div>
</template>

<script>
import { getResourceRecommendList, stopUse, UnRecommend, getRecommandDetail } from '@api/resourceList'
import myImg from '../../../../components/myCom/tableImg'
export default {
  components: {
    myImg
  },
  data () {
    return {
      detailId: '',
      dialogFormVisible: false,
      phone_top_show: false,
      pc_top_show: false,
      phone_start_time: '',
      phone_end_time: '',
      pc_start_time: '',
      pc_end_time: '',
      map: '',
      mapOptions: [{
        value: '0',
        label: '本地城市'
      }, {
        value: '1',
        label: '外地城市'
      }],
      input: '',
      select_list: [],
      columns: [
        {
          title: '推荐时间',
          key: 'create_time',
          width: '180'

        },
        // {
        //   title: '图片设置',
        //   key: 'user_image',
        //   width: '180',
        //   component: {
        //     name: myImg
        //   }
        // },
        // {
        //   title: '文字说明',
        //   key: 'use_name'
        // },
        {
          title: '行业类目',
          key: 'status'
        },
        {
          title: '发布标题',
          key: 'name'
        },
        {
          title: '资源定位',
          key: 'type_status'
        },
        {
          title: '广告城市',
          key: 'map'
        },
        {
          title: '广告位置',
          key: 'area'
        }
      ],
      outCoulum: [
        {
          label: '推荐时间',
          prop: 'create_time'
        },
        // {
        //   label: '文字说明',
        //   prop: 'use_name'
        // },
        {
          title: '发布标题',
          key: 'name'
        },
        {
          label: '行业类目',
          prop: 'status'
        },
        {
          label: '资源定位',
          prop: 'type_status'
        },
        {
          label: '广告城市',
          prop: 'map'
        },
        {
          label: '广告位置',
          prop: 'area'
        }
      ],
      data: [],
      loading: false,
      loadingOptions: {
        text: '拼命加载中',
        spinner: 'el-icon-loading',
        background: 'rgba(0, 0, 0, 0.8)'
      },
      pagination: {
        currentPage: 1,
        pageSize: 20,
        total: 0
      },
      options: {
        strip: true,
        height: '650',
        highlightCurrentRow: true,
        defaultSort: {
          prop: 'date',
          order: 'descending'
        }
      },
      selectOptions: [{
        value: '3',
        label: '行业信息'
      }, {
        value: '0',
        label: '我提供注册'
      }, {
        value: '5',
        label: '愿意付费咨询'
      }, {
        value: '4',
        label: '提供付费咨询'
      }, {
        value: '1',
        label: '我需要注册'
      }],
      ItemOptions: [{
        value: '0',
        label: '注册公司'
      }, {
        value: '1',
        label: '财政纳税'
      }, {
        value: '2',
        label: '法律咨询'
      }, {
        value: '3',
        label: '职业规划'
      }, {
        value: '4',
        label: '人才服务'
      }, {
        value: '5',
        label: '政策解读'
      }, {
        value: '6',
        label: '兼职零工'
      }, {
        value: '7',
        label: '共享资源'
      }],
      job: '',
      status: '',
      city: '',
      // 自定义操作列
      rowHandle: {
        custom: [
          {
            text: '查看详情',
            type: 'Success',
            size: 'small',
            emit: 'custom-emit-1'
          }
        ],
        remove: {
          text: '取消推荐',
          size: 'small',
          fixed: 'right',
          confirm: true
        }
      },
      value1: '',
      sels: []
    }
  },
  methods: {
    handleSelectionChange (selection) {
      console.log('选择', selection)
      this.sels = selection
    },
    viewDetail () {
      this.$router.push({ name: 'resourceDetail', query: { 'id': this.detailId } })
    },
    unrecommend ({ index, row }) {
      UnRecommend({ 'id': Array.of(row.id) }).then(response => {
        console.log(response, 'success') // 成功的返回
      })
        .catch(error => console.log(error, 'error')) // 失败的返回
    },
    open_recommend ({ index, row }) {
      this.currentId = row.id

      getRecommandDetail({
        'id': this.currentId
      }).then(response => {
        console.log(response, 'success detail') // 成功的返回
        this.dialogFormVisible = true
        this.phone_start_time = response.data.phone_start_time
        this.phone_end_time = response.data.phone_end_time
        this.phone_top_show = response.data.phone_top_show
        this.pc_top_show = response.data.pc_top_show
        this.pc_start_time = response.data.pc_start_time
        this.pc_end_time = response.data.pc_end_time
        this.map = response.data.map
        this.detailId = response.data.id
      })
        .catch(error => console.log(error, 'error')) // 失败的返回
    },
    // 多选停用
    stops () {
      console.log(this.sels, typeof (this.sels))
      let ids = this.sels.map(item => item.id)
      console.log('ids:', ids, typeof (ids))
      this.$confirm('确认删除选中记录吗？', '提示', {
        type: 'warning'
      })
        .then(() => {
          const para = { 'id': ids }
          stopUse(para).then(res => {
            this.$message({
              message: '删除成功',
              type: 'success'
            })
            getResourceRecommendList({
              'create_time': '',
              'map': '',
              'status': '',
              'item': '',
              'page': 1,
              'size': 20,
              'type_status': '',
              'recommand_status': 0
            })
              .then(response => {
                this.data = response.data
                this.pagination.total = response.count
                console.log(response, 'success') // 成功的返回
              })
              .catch(error => console.log(error, 'error')) // 失败的返回
          })
        })
        .catch(() => { })
    },
    paginationCurrentChange (currentPage) {
      this.pagination.currentPage = currentPage
      this.fetchData(currentPage)
    },
    fetchData (currentPage) {
      this.loading = true
      getResourceRecommendList({
        'create_time': '',
        'map': '',
        'status': '',
        'item': '',
        'page': currentPage,
        'size': 20,
        'type_status': '',
        'recommand_status': 0
      }).then(response => {
        this.data = response.data
        this.pagination.total = response.count
        this.loading = false
      }).catch(err => {
        console.log('err', err)
        this.loading = false
      })
    },
    handleRowRemove ({ index, row }, done) {
      setTimeout(() => {
        console.log(index)
        console.log(row)
        UnRecommend({ 'id': Array.of(row.id) }).then(response => {
          this.pagination.total = this.pagination.total - 1
          console.log(response, 'success') // 成功的返回
        })
          .catch(error => console.log(error, 'error')) // 失败的返回

        this.$message({
          message: '取消推荐成功',
          type: 'success'
        })
        done()
      }, 300)
    },
    exportExcel () {
      console.log(this.columns, this.data)
      this.$export.excel({
        columns: this.outCoulum,
        data: this.data,
        header: '用户列表'

      })
        .then(() => {
          console.log('数据:', this.$refs.d2Crud.d2CrudData)
          this.$message('导出表格成功')
        })
    },
    query (item) {
      console.log(this.input, this.value1, this.city, this.status)
      getResourceRecommendList({
        'create_time': this.value1,
        'item': this.input,
        'map': this.city,
        'status': this.status,
        'page': 1,
        'size': 20,
        'type_status': '',
        'recommand_status': 0
      })
        .then(response => {
          this.data = response.data
          console.log(response, 'success') // 成功的返回
        })
        .catch(error => console.log(error, 'error')) // 失败的返回
    },
    // 重置
    reset () {
      this.input = ''
      this.value1 = ''
      this.city = ''
      this.status = ''
      getResourceRecommendList({
        'create_time': '',
        'map': '',
        'status': '',
        'item': '',
        'page': 1,
        'size': 20,
        'type_status': '',
        'recommand_status': 0
      })
        .then(response => {
          this.data = response.data
          console.log(response, 'success') // 成功的返回
        })
        .catch(error => console.log(error, 'error')) // 失败的返回
    }
  },

  mounted: function () {
    getResourceRecommendList({
      'create_time': '',
      'map': '',
      'status': '',
      'item': '',
      'page': 1,
      'size': 20,
      'type_status': '',
      'recommand_status': 0
    })
      .then(response => {
        this.data = response.data
        this.pagination.total = response.count
        console.log(response, 'success') // 成功的返回
      })
      .catch(error => console.log(error, 'error')) // 失败的返回
  }
}
</script>

<style>
.el-input {
  width: 200px;
}

/* .el-input__inner {
  width: 200px;
} */
.head_nav {
  width: 100%;
  display: flex;
  align-items: center;
}
.demonstration {
  background: none !important;
  width: 100px !important;
}
.el-table .warning-row {
  background: oldlace;
}

.el-table .success-row {
  background: #f0f9eb;
}

.el-button el-button--primary el-button--default {
  margin-bottom: 5px;
  margin-left: 20px;
}
.el-input el-input--default {
  margin-bottom: 5px; /* flex: 5; */
  width: 30%;
}

/* .demonstration {
  margin-bottom: 5px;
  width: 121px;
  margin: 0 20px;
} */

.el-date-editor
  el-range-editor
  el-input__inner
  el-date-editor--daterange
  el-range-editor--default {
  /* flex: 1; */
  width: 15%;
}
.d2-container-full__header {
  display: flex;
}
.el-button el-button--default el-button--default {
  margin-bottom: 5px;
}
span.demonstration {
  margin-bottom: 5px; /* margin-right: 10px; */
  width: 110px;
  margin: 0 20px; /* line-height: 50px; */
  background-color: white;
}
</style>
