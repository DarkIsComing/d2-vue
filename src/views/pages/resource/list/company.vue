<template>
  <d2-container>
    <template slot="header">
      <el-button slot="header"
                 style="margin-bottom: 5px"
                 @click="exportExcel">导出</el-button>

      <el-button slot="header"
                 style="margin-bottom: 5px"
                 @click="stops">删除</el-button>
      <span class="demonstration"
            slot="header"
            style="margin-bottom: 5px">发布时间</span>
      <el-date-picker v-model="value1"
                      type="date"
                      placeholder="选择日期">
      </el-date-picker>
      <span class="demonstration"
            slot="header"
            style="margin-bottom: 5px">用户昵称</span>
      <el-input slot="header"
                style="margin-bottom: 5px"
                v-model="input"
                placeholder="请输入用户昵称">
      </el-input>
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
            style="margin-bottom: 5px">资源城市</span>
      <el-input slot="header"
                style="margin-bottom: 5px"
                v-model="city"
                placeholder="请输入资源城市">
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
             @custom-emit-1="viewDetail"
             :pagination="pagination"
             @pagination-current-change="paginationCurrentChange"
             :options="options">
    </d2-crud>
    <myImg></myImg>
  </d2-container>
</template>

<script>
import { getResourceList, stopUse } from '@api/resourceList'
import myImg from '../../../../components/myCom/tableImg'
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
          title: '发布时间',
          key: 'create_time',
          width: '180'

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
          title: '发布标题',
          key: 'name'
        },

        {
          title: '资源城市',
          key: 'map'
        },
        {
          title: '资源定位',
          key: 'status_text'
        },
        {
          title: '是否保密',
          key: 'lock'
        }
      ],
      outCoulum: [
        {
          label: '发布时间',
          prop: 'create_time'
        },
        {
          label: '用户昵称',
          prop: 'use_name'
        },
        {
          label: '发布标题',
          prop: 'name'
        },
        {
          label: '资源城市',
          prop: 'map'
        },
        {
          label: '资源定位',
          prop: 'status_text'
        },
        {
          label: '是否保密',
          prop: 'lock'
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
          icon: 'el-icon-delete',
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
    viewDetail ({ index, row }) {
      this.$router.push({ name: 'resourceDetail', query: { 'id': row.id, 'type_status': 0 } })
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
            getResourceList({
              'create_time': '',
              'map': '',
              'status': '',
              'item': '',
              'page': 1,
              'size': 20,
              'type_status': 0
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
      getResourceList({
        'create_time': '',
        'map': '',
        'status': '',
        'item': '',
        'page': currentPage,
        'size': 20,
        'type_status': 0
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
        stopUse({
          'id': Array.of(row.id)
        })
          .then(response => {
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
        header: '用户列表'

      })
        .then(() => {
          console.log('数据:', this.$refs.d2Crud.d2CrudData)
          this.$message('导出表格成功')
        })
    },
    query (item) {
      console.log(this.input, this.value1, this.city, this.status)
      getResourceList({
        'create_time': this.value1,
        'item': this.input,
        'map': this.city,
        'status': this.status,
        'page': 1,
        'size': 20,
        'type_status': 0
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
      getResourceList({
        'create_time': '',
        'map': '',
        'status': '',
        'item': '',
        'page': 1,
        'size': 20,
        'type_status': 0
      })
        .then(response => {
          this.data = response.data
          console.log(response, 'success') // 成功的返回
        })
        .catch(error => console.log(error, 'error')) // 失败的返回
    }
  },

  mounted: function () {
    getResourceList({
      'create_time': '',
      'map': '',
      'status': '',
      'item': '',
      'page': 1,
      'size': 20,
      'type_status': 0
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
