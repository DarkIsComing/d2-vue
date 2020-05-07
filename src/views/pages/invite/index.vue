<template>
  <d2-container>
    <template slot="header">
      <el-button slot="header"
                 type="primary"
                 style="margin-bottom: 5px"
                 @click="exportExcel">导出</el-button>

      <el-button slot="header"
                 type="danger"
                 style="margin-bottom: 5px"
                 @click="stops">刪除</el-button>
      <span class="demonstration"
            slot="header"
            style="margin-bottom: 5px">邀请时间</span>
      <el-date-picker v-model="value2"
                      type="daterange"
                      value-format="yyyy-MM-dd"
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
            style="margin-bottom: 5px">邀请对象</span>
      <el-input slot="header"
                style="margin-bottom: 5px"
                v-model="input"
                placeholder="请输入邀请对象/手机号">

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
             :loading="loading"
             :loading-options="loadingOptions"
             selection-row
             @selection-change="handleSelectionChange"
             @current-change="handleCurrentChange"
             :rowHandle="rowHandle"
             @row-remove="handleRowRemove"
             :pagination="pagination"
             @pagination-current-change="paginationCurrentChange"
             :options="options">
    </d2-crud>
    <myImg></myImg>
  </d2-container>
</template>

<script>
import { getInviteList, deleteInvite } from '@api/invite'
import myImg from '../../../components/myCom/tableImg'
export default {
  components: {
    myImg
  },
  data () {
    return {
      input: '',
      columns: [
        {
          title: '邀请时间',
          key: 'create_time',
          width: '180',
          sortable: true
        },
        {
          title: '获得发布量',
          key: 'free',
          width: '180'
        },
        {
          title: '获得现金(元)',
          key: 'amount'
        },
        {
          title: '邀请对象',
          key: 'use_name'
        },
        {
          title: '邀请对象手机号',
          key: 'username'
        }
      ],
      outCoulum: [
        {
          label: '邀请时间',
          prop: 'create_time'
        },
        {
          label: '获得发布量',
          prop: 'free'
        },
        {
          label: '获得现金(元)',
          prop: 'amount'
        },
        {
          label: '邀请对象',
          prop: 'use_name'
        },
        {
          label: '邀请对象手机号',
          prop: 'username'
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
      value2: '',
      sels: []
    }
  },
  methods: {
    handleRowRemove ({ index, row }, done) {
      setTimeout(() => {
        console.log(index)
        console.log(row)
        let ids = Array.of(row.id)
        deleteInvite({
          'id': ids
        })
          .then(response => {
            this.pagination.total = this.pagination.total - ids.length
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
    handleSelectionChange (selection) {
      console.log('选择', selection)
      this.sels = selection
    },
    paginationCurrentChange (currentPage) {
      this.pagination.currentPage = currentPage
      this.fetchData(currentPage)
    },
    fetchData (currentPage) {
      this.loading = true
      getInviteList({
        'start_time': '',
        'end_time': '',
        'item': '',
        'page': currentPage,
        'size': 20
      }).then(response => {
        console.log('分页返回的数据', currentPage, response.data)
        this.data = response.data
        this.pagination.total = response.count
        this.loading = false
      }).catch(err => {
        console.log('err', err)
        this.loading = false
      })
    },
    stops () {
      console.log(this.sels, typeof (this.sels))
      let ids = this.sels.map(item => item.id)
      console.log('ids:', ids, typeof (ids))
      this.$confirm('确认删除选中记录吗？', '提示', {
        type: 'warning'
      })
        .then(() => {
          const para = { 'id': ids }
          deleteInvite(para).then(res => {
            this.$message({
              message: '删除成功',
              type: 'success'
            })
            getInviteList({
              'start_time': '',
              'end_time': '',
              'item': '',
              'page': 1,
              'size': 20
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
    exportExcel () {
      console.log(this.columns, this.data)
      this.$export.excel({
        columns: this.outCoulum,
        data: this.data,
        header: '邀请记录列表'

      })
        .then(() => {
          console.log('数据:', this.$refs.d2Crud.d2CrudData)
          this.$message('导出表格成功')
        })
    },
    query (item) {
      getInviteList({
        'start_time': this.value2[0],
        'end_time': this.value2[1],
        'item': this.input,
        'page': 1,
        'size': 20
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
      getInviteList({
        'start_time': '',
        'end_time': '',
        'item': this.input,
        'page': 1,
        'size': 20
      })
        .then(response => {
          this.data = response.data
          console.log(response, 'success') // 成功的返回
        })
        .catch(error => console.log(error, 'error')) // 失败的返回
    }
  },

  mounted: function () {
    getInviteList({
      'start_time': '',
      'end_time': '',
      'item': '',
      'page': 1,
      'size': 20
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
