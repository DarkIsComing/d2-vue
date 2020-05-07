<template>
  <div class="child2">
    <d2-crud ref="d2Crud"
             :columns="columns"
             :data="data"
             :loading="loading"
             :loading-options="loadingOptions"
             selection-row
             @selection-change="handleSelectionChange"
             @current-change="handleCurrentChange"
             :pagination="pagination"
             @pagination-current-change="paginationCurrentChange"
             :options="options">
      <el-button slot="header"
                 style="margin-bottom: 5px"
                 @click="exportExcel">导出</el-button>
      <span class="demonstration"
            slot="header"
            style="margin-bottom: 5px">提现时间</span>
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
            style="margin-bottom: 5px">用户昵称</span>
      <el-input slot="header"
                style="margin-bottom: 5px"
                v-model="input"
                placeholder="请输入用户昵称">

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
import { getCashList } from '@api/cash'
import myImg from '../../../components/myCom/tableImg'
export default {
  name: 'child2',
  data () {
    return {
      input: '',
      columns: [
        {
          title: '提现时间',
          key: 'create_time',
          width: '180',
          sortable: true
        },
        {
          title: '用户头像',
          key: 'user_image',
          width: '180',
          component: {
            name: myImg
          }
        },
        {
          title: '用户昵称',
          key: 'use_name'
        },
        {
          title: '提现金额',
          key: 'amount'
        },
        {
          title: '提现到账时间',
          key: 'trans_date'
        },
        {
          title: '状态',
          key: 'status_text'
        }
      ],
      outCoulum: [
        {
          label: '申请时间',
          prop: 'create_time'
        },
        {
          label: '用户昵称',
          prop: 'use_name'
        },
        {
          label: '提现金额',
          prop: 'amount'
        },
        {
          label: '提现到账时间',
          prop: 'trans_date'
        },
        {
          label: '状态',
          prop: 'status_text'
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
        height: '600',
        highlightCurrentRow: true,
        defaultSort: {
          prop: 'date',
          order: 'descending'
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
    },
    paginationCurrentChange (currentPage) {
      this.pagination.currentPage = currentPage
      this.fetchData(currentPage)
    },
    fetchData (currentPage) {
      console.log('当前页:', currentPage)
      this.loading = true
      getCashList({
        'start_time': '',
        'end_time': '',
        'item': '',
        'page': currentPage,
        'size': 20,
        'status': 0
      }).then(response => {
        this.data = response.data
        this.pagination.total = response.count
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
        header: '已提现列表'

      })
        .then(() => {
          console.log('数据:', this.$refs.d2Crud.d2CrudData)
          this.$message('导出表格成功')
        })
    },
    query (item) {
      getCashList({
        'start_time': this.value2[0],
        'end_time': this.value2[1],
        'item': this.input,
        'page': 1,
        'size': 20,
        'status': 0
      })
        .then(response => {
          this.data = response.data
          this.pagination.total = response.count
          console.log(response, 'success') // 成功的返回
        })
        .catch(error => console.log(error, 'error')) // 失败的返回
    },
    // 重置
    reset () {
      this.input = ''
      this.value2 = ''
      getCashList({
        'start_time': '',
        'end_time': '',
        'item': this.input,
        'page': 1,
        'size': 20,
        'status': 0
      })
        .then(response => {
          this.data = response.data
          this.pagination.total = response.count
          console.log(response, 'success') // 成功的返回
        })
        .catch(error => console.log(error, 'error')) // 失败的返回
    }
  },
  components: {
    myImg
  },
  mounted () {
    getCashList({
      'start_time': '',
      'end_time': '',
      'item': '',
      'page': 1,
      'size': 20,
      'status': 0
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
