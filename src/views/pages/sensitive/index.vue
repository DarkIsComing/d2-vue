<template>
  <d2-container>
    <template slot="header">
      <el-button slot="header"
                 style="margin-bottom: 5px"
                 @click="addRow">新增</el-button>
      <el-button slot="header"
                 style="margin-bottom: 5px"
                 @click="exportExcel">导出</el-button>

      <el-button slot="header"
                 style="margin-bottom: 5px"
                 @click="stop">删除</el-button>
      <span class="demonstration"
            slot="header"
            style="margin-bottom: 5px">敏感字内容</span>
      <el-input slot="header"
                style="margin-bottom: 5px"
                v-model="input"
                placeholder="请输入敏感字内容">

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
             add-title="新增敏感词"
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
             @row-remove="handleRowRemove"
             @custom-emit-1="viewDetail"
             :pagination="pagination"
             @pagination-current-change="paginationCurrentChange"
             :options="options">
    </d2-crud>
  </d2-container>
</template>

<script>
import { getSensitiveList, deleteSensitive, postSensitive } from '@api/sensitive'

export default {

  data () {
    return {
      input: '',
      columns: [

        {
          title: '敏感字内容',
          key: 'name',
          width: '180'
        }
      ],
      outCoulum: [
        {
          label: '发布时间',
          prop: 'create_time'
        },
        {
          label: '关键字内容',
          prop: 'name'
        },
        {
          label: '关键字资源数',
          prop: 'count'
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
      addTemplate: {
        name: {
          title: '敏感词',
          value: ''
        }
      },
      formOptions: {
        labelWidth: '80px',
        labelPosition: 'center',
        saveLoading: false
      },
      value1: '',
      value2: '',
      sels: []
    }
  },
  methods: {
    stop () {
      let ids = this.sels.map(item => item.id)
      this.$confirm('确认删除选中记录吗？', '提示', {
        type: 'warning'
      })
        .then(() => {
          const para = { 'id': ids }
          deleteSensitive(para).then(res => {
            console.log(res, 'success') // 成功的返回
            this.$message({
              message: '删除成功',
              type: 'success'
            })
            getSensitiveList({
              'item': '',
              'page': this.pagination.currentPage,
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
    handleSelectionChange (selection) {
      this.sels = selection
      console.log('选择', selection)
    },
    paginationCurrentChange (currentPage) {
      this.pagination.currentPage = currentPage
      this.fetchData(currentPage)
    },
    fetchData (currentPage) {
      this.loading = true
      getSensitiveList({
        'item': this.input,
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
    handleRowRemove ({ index, row }, done) {
      setTimeout(() => {
        console.log(index)
        console.log(row)
        deleteSensitive({
          'id': Array.of(row.id)
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
    exportExcel () {
      console.log(this.columns, this.data)
      this.$export.excel({
        columns: this.outCoulum,
        data: this.data,
        header: '敏感字列表'

      })
        .then(() => {
          console.log('数据:', this.$refs.d2Crud.d2CrudData)
          this.$message('导出表格成功')
        })
    },
    query (item) {
      getSensitiveList({
        'item': this.input,
        'page': 1,
        'size': 20
      })
        .then(response => {
          this.data = response.data
          this.pagination.total = response.count
          console.log(response, 'success') // 成功的返回
        })
        .catch(error => console.log(error, 'error')) // 失败的返回
    },
    viewDetail ({ index, row }) {
      this.$router.push({ name: 'keywordDetail', query: { 'id': row.id, 'type_status': 0 } })
    },
    // 重置
    reset () {
      this.input = ''
      getSensitiveList({

        'item': this.input,
        'page': 1,
        'size': 20
      })
        .then(response => {
          this.data = response.data
          this.pagination.total = response.count
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
    },
    handleRowAdd (row, done) {
      this.formOptions.saveLoading = true
      setTimeout(() => {
        console.log(row)
        postSensitive({
          'name': row.name
        }).then(response => {
          console.log(response, 'success') // 成功的返回
        })
          .catch(error => console.log(error, 'error')) // 失败的返回
        this.$message({
          message: '保存成功',
          type: 'success'
        })

        // done可以传入一个对象来修改提交的某个字段
        done({
          address: '我是通过done事件传入的数据！'

        })
        getSensitiveList({
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
        this.formOptions.saveLoading = false
      }, 300)
    },
    handleDialogCancel (done) {
      this.$message({
        message: '取消保存',
        type: 'warning'
      })
      done()
    }
  },

  mounted: function () {
    getSensitiveList({
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

