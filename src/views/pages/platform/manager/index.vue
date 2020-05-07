<template>
  <d2-container>
    <template slot="header">
      <el-autocomplete v-model="item"
                       :fetch-suggestions="querySearchAsync"
                       @select="handleSelect"
                       placeholder="请输入用户名进行新增">
      </el-autocomplete>
      <el-button slot="header"
                 style="margin-bottom: 5px"
                 @click="addRow">确定</el-button>
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
             @custom-emit-1="handleCustomEvent"
             :pagination="pagination"
             @pagination-current-change="paginationCurrentChange"
             :options="options">
    </d2-crud>
    <myImg></myImg>
  </d2-container>
</template>

<script>
import { getManagerList, deleteManager, getUserList, putManager } from '@api/platform'

export default {

  data () {
    return {
      input: '',
      item: '',
      userId: '',
      columns: [
        {
          title: '管理员名称',
          key: 'use_name'
        },
        {
          title: '登录账户',
          key: 'username'
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
        pageSize: 10,
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
            text: '查看权限',
            type: 'primary',
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
      }

    }
  },
  methods: {
    addRow () {
      putManager({ 'id': this.userId }).then(response => {
        console.log(response, 'success') // 成功的返回
        getManagerList({
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
      }).catch(err => {
        console.log('err', err)
        this.loading = false
      })
    },
    querySearchAsync (queryString, callback) {
      let lists = []
      getUserList({ 'item': queryString }).then(response => {
        console.log(response, 'success') // 成功的返回
        lists = response.data
        callback(lists)
        this.loading = false
      }).catch(err => {
        console.log('err', err)
        this.loading = false
      })
    },
    handleSelect (item) {
      this.userId = item.id
      console.log('item:', item, this.item)
      // do something
    },
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
      getManagerList({
        'start_time': '',
        'end_time': '',
        'item': '',
        'page': currentPage,
        'size': 20
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
        deleteManager({
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
    }
  },

  mounted: function () {
    getManagerList({
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
