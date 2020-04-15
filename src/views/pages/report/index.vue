<template>
  <div>
    <d2-crud ref="d2Crud"
             :columns="columns"
             :data="data"
             add-title="新增广告"
             :add-template="addTemplate"
             :form-options="formOptions"
             @dialog-open="handleDialogOpen"
             @row-add="handleRowAdd"
             @dialog-cancel="handleDialogCancel"
             :loading="loading"
             :loading-options="loadingOptions"
             selection-row
             @selection-change="handleSelectionChange"
             @current-change="handleCurrentChange"
             :rowHandle="rowHandle"
             @custom-emit-1="handleCustomEvent"
             :pagination="pagination"
             @pagination-current-change="paginationCurrentChange">
      :options="options">
      <el-button slot="header"
                 style="margin-bottom: 5px"
                 @click="exportExcel">导出</el-button>

      <el-button slot="header"
                 style="margin-bottom: 5px"
                 @click="stop">停用</el-button>
      <span class="demonstration"
            slot="header"
            style="margin-bottom: 5px">举报时间</span>
      <el-date-picker v-model="value2"
                      type="daterange"
                      align="right"
                      slot="header"
                      unlink-panels
                      range-separator="-"
                      start-placeholder="开始日期"
                      end-placeholder="结束日期"
                      :picker-options="pickerOptions">
      </el-date-picker>
      <span class="demonstration"
            slot="header"
            style="margin-bottom: 5px">昵称/原因</span>
      <el-input slot="header"
                style="margin-bottom: 5px"
                v-model="input"
                placeholder="请输入举报对象/举报原因">

      </el-input>
      <el-button slot="header"
                 style="margin-bottom: 5px"
                 type="primary"
                 @click="query">查询</el-button>
      <el-button slot="header"
                 type="info"
                 style="margin-bottom: 5px"
                 @click="reset">重置</el-button>
    </d2-crud>
    <myImg></myImg>
  </div>
</template>

<script>
import { getComplaintList } from '@api/resource'
import myImg from '../../../components/myCom/tableImg'
export default {
  components: {
    myImg
  },
  data () {
    return {
      columns: [
        {
          title: '举报时间',
          key: 'create_time',
          width: '180',
          sortable: true
        },
        {
          title: '举报人头像',
          key: 'user_image',
          width: '180',
          component: {
            name: myImg
          }
        },
        {
          title: '举报人昵称',
          key: 'use_name'
        },
        {
          title: '举报对象',
          key: 'resource_use_name'
        },
        {
          title: '举报资源',
          key: 'resource_name'
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
        pageSize: 5,
        total: 0
      },
      options: {
        rowClassName ({ row, rowIndex }) {
          if (rowIndex === 1) {
            return 'warning-row'
          } else if (rowIndex === 3) {
            return 'success-row'
          }
          return ''
        },
        height: '1250',
        highlightCurrentRow: true,
        defaultSort: {
          prop: 'date',
          order: 'descending'
        }
      },
      // 自定义操作列
      rowHandle: {
        custom: [
          {
            text: '资源详情',
            type: 'Success',
            size: 'small',
            emit: 'custom-emit-1'
          },
          {
            text: '停用',
            type: 'danger ',
            size: 'small',
            emit: 'custom-emit-1'
          }
        ]
      },
      pickerOptions: {
        shortcuts: [{
          text: '最近一周',
          onClick (picker) {
            const end = new Date()
            const start = new Date()
            start.setTime(start.getTime() - 3600 * 1000 * 24 * 7)
            picker.$emit('pick', [start, end])
          }
        }, {
          text: '最近一个月',
          onClick (picker) {
            const end = new Date()
            const start = new Date()
            start.setTime(start.getTime() - 3600 * 1000 * 24 * 30)
            picker.$emit('pick', [start, end])
          }
        }, {
          text: '最近三个月',
          onClick (picker) {
            const end = new Date()
            const start = new Date()
            start.setTime(start.getTime() - 3600 * 1000 * 24 * 90)
            picker.$emit('pick', [start, end])
          }
        }]
      },
      value1: '',
      value2: ''
    }
  },
  methods: {
    handleSelectionChange (selection) {
      console.log(selection)
    },
    paginationCurrentChange (currentPage) {
      this.pagination.currentPage = currentPage
      this.fetchData(currentPage)
    },
    fetchData (currentPage) {
      this.loading = true
      getComplaintList({
        'start_time': '',
        'end_time': '',
        'item': '',
        'page': currentPage,
        'size': 10
      }).then(response => {
        this.data = response.data
        this.pagination.total = this.data.length
        this.loading = false
      }).catch(err => {
        console.log('err', err)
        this.loading = false
      })
    },
    exportExcel () {
      this.$export.excel({
        columns: this.columns,
        data: this.data,
        header: '资源列表'

      })
        .then(() => {
          console.log('数据:', this.$refs.d2Crud.d2CrudData)
          this.$message('导出表格成功')
        })
    },
    // 普通的新增
    addRow () {
      this.$refs.d2Crud.showDialog({
        mode: 'add'
      })
    },
    handleDialogOpen ({ mode }) {
      this.$message({
        message: '打开模态框，模式为：' + mode,
        type: 'success'
      })
    }
  },
  mounted: function () {
    getComplaintList({
      'start_time': '',
      'end_time': '',
      'item': '',
      'page': 1,
      'size': 10
    })
      .then(response => {
        this.data = response.data
        console.log(response, 'success') // 成功的返回
      })
      .catch(error => console.log(error, 'error')) // 失败的返回
  }
}
</script>

<style>
.el-table .warning-row {
  background: oldlace;
}

.el-table .success-row {
  background: #f0f9eb;
}
</style>
