<template>
  <d2-container>
    <template slot="header">
      <el-button slot="header"
                 style="margin-bottom: 5px"
                 @click="exportExcel">导出</el-button>

      <el-button slot="header"
                 style="margin-bottom: 5px"
                 @click="stops">停用</el-button>
      <span class="demonstration"
            slot="header"
            style="margin-bottom: 5px">投诉时间</span>
      <el-date-picker v-model="value2"
                      type="daterange"
                      align="right"
                      value-format="yyyy-MM-dd"
                      slot="header"
                      unlink-panels
                      range-separator="-"
                      start-placeholder="开始日期"
                      end-placeholder="结束日期"
                      :picker-options="pickerOptions">
      </el-date-picker>
      <span class="demonstration"
            slot="header"
            style="margin-bottom: 5px">昵称/内容</span>
      <el-input slot="header"
                style="margin-bottom: 5px"
                v-model="input"
                placeholder="请输入投诉人昵称/投诉内容">

      </el-input>
      <el-button slot="header"
                 style="margin-bottom: 5px"
                 type="primary"
                 @click="query">查询</el-button>
      <el-button slot="header"
                 type="info"
                 style="margin-bottom: 5px"
                 @click="reset">重置</el-button>
    </template>
    <d2-crud ref="d2Crud"
             :columns="columns"
             :data="data"
             @row-add="handleRowAdd"
             :loading="loading"
             :loading-options="loadingOptions"
             selection-row
             @selection-change="handleSelectionChange"
             @current-change="handleCurrentChange"
             :rowHandle="rowHandle"
             @row-remove="handleRowRemove"
             @custom-emit-1="viewDetail"
             :pagination="pagination"
             @pagination-current-change="paginationCurrentChange"
             :options="options">
    </d2-crud>
    <myImg></myImg>
  </d2-container>
</template>

<script>
import { getComplaintList, stopUse } from '@api/resource'
import myImg from '../../../components/myCom/tableImg'
export default {
  components: {
    myImg
  },
  data () {
    return {
      input: '',
      select_list: [],
      columns: [
        {
          title: '投诉时间',
          key: 'create_time',
          width: '180',
          sortable: true
        },
        {
          title: '投诉人昵称',
          key: 'use_name'
        },
        {
          title: '投诉对象',
          key: 'resource_use_name'
        },
        {
          title: '凭证截图',
          key: 'complaint_image',
          width: '180',
          component: {
            name: myImg
          }
        },
        {
          title: '投诉内容',
          key: 'complaint_status'
        },
        {
          title: '行业类目',
          key: 'resource_status',
          filters: [
            { text: '注册公司', value: '注册公司' },
            { text: '财政纳税', value: '财政纳税' },
            { text: '法律咨询', value: '法律咨询' },
            { text: '职业规划', value: '职业规划' },
            { text: '人才服务', value: '人才服务' },
            { text: '政策解读', value: '政策解读' },
            { text: '兼职零工', value: '兼职零工' },
            { text: '共享资源', value: '共享资源' }
          ],
          filterMethod (value, row) {
            return row.resource_status === value
          },
          filterPlacement: 'bottom-end'
        }
      ],
      outCoulum: [
        {
          label: '投诉时间',
          prop: 'create_time'
        },
        {
          label: '投诉人昵称',
          prop: 'use_name'
        },
        {
          label: '投诉对象',
          prop: 'resource_use_name'
        },
        {
          label: '投诉内容',
          prop: 'complaint_status'
        },
        {
          label: '行业类目',
          prop: 'resource_status'
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
      // 自定义操作列
      rowHandle: {
        custom: [
          {
            text: '资源详情',
            type: 'Success',
            size: 'small',
            emit: 'custom-emit-1'
          }
        ],
        remove: {
          icon: 'el-icon-delete',
          size: 'small',
          fixed: 'right',
          confirm: true
        }
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
      console.log('选择', selection)
      // for (const i = 0; i < selection.length; i++) { this.select_list.push(selection[i].id) }
    },
    handleRowRemove ({ index, row }, done) {
      setTimeout(() => {
        console.log(index)
        console.log(row)
        stopUse({
          'id': row.id
        })
          .then(response => {
            this.pagination.total = this.pagination.total - 1
            console.log(response, 'success') // 成功的返回
          })
          .catch(error => console.log(error, 'error')) // 失败的返回

        this.$message({
          message: '删除成功',
          type: 'success'
        })
        done()
      }, 300)
    },
    // 多选停用
    stops () {
      // this.select_list = handleSelectionChange(selection)
      stopUse({
        'id': ''
      }).then(response => {
        this.data = response.data
        this.pagination.total = this.data.length
        this.loading = false
      }).catch(err => {
        console.log('err', err)
        this.loading = false
      })
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
      console.log(this.columns, this.data)
      this.$export.excel({
        columns: this.outCoulum,
        data: this.data,
        header: '资源列表'

      })
        .then(() => {
          console.log('数据:', this.$refs.d2Crud.d2CrudData)
          this.$message('导出表格成功')
        })
    },
    viewDetail ({ index, row }) {
      this.$router.push({ name: 'resourceDetail', query: { 'id': row.resource_id, 'type_status': 0 } })
    },
    query (item) {
      getComplaintList({
        'start_time': this.value2[0],
        'end_time': this.value2[1],
        'item': this.input,
        'page': 1,
        'size': 10
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
      this.value2 = ''
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
    },
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
        this.pagination.total = response.count
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
