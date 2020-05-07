<template>
  <d2-container>
    <div class="head_card">

      <div class="card">
        <div class="card_top">
          <div class="card_title">
            新用户注册
          </div>
          <div class="card_text">{{register_user_count}}</div>
        </div>
        <div class="card_bottom card_two">
          <chart ref="chart5"
                 :options="ChartOptions5"
                 :auto-resize="false"></chart>
        </div>
      </div>

      <div class="card">
        <div class="card_top">
          <div class="card_title">
            用户签到量
          </div>
          <div class="card_text">{{sign_user_count}}</div>
        </div>
        <div class="card_bottom card_two">
          <chart ref="chart6"
                 :options="ChartOptions6"
                 :auto-resize="true"></chart>
        </div>
      </div>

      <div class="card">
        <div class="card_top">
          <div class="card_title">
            签到瓜分金额
          </div>
          <div class="card_text">{{sign_user_amount}}</div>
        </div>
        <div class="card_bottom card_two">
          <div>
            <chart ref="chart7"
                   :options="ChartOptions7"
                   :auto-resize="true"></chart>
          </div>
        </div>
      </div>

      <div class="card">
        <div class="card_top">
          <div class="card_title">
            转发有奖金额
          </div>
          <div class="card_text">{{times_user_amount}}</div>
        </div>
        <div class="card_bottom card_two">
          <div>
            <chart ref="chart8"
                   :options="ChartOptions8"
                   :auto-resize="true"></chart>
          </div>
        </div>
      </div>

    </div>
    <el-divider></el-divider>
    <div>
      <el-button slot="header"
                 style="margin-bottom: 5px"
                 @click="exportExcel">导出</el-button>

      <el-button slot="header"
                 style="margin-bottom: 5px"
                 @click="stops">停用</el-button>
      <span class="demonstration"
            slot="header"
            style="margin-bottom: 5px">注册时间</span>
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
            style="margin-bottom: 5px">昵称/手机号</span>
      <el-input slot="header"
                style="margin-bottom: 5px"
                v-model="input"
                placeholder="请输入用户昵称/手机号">

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
             @custom-emit-1="viewDetail"
             :pagination="pagination"
             @pagination-current-change="paginationCurrentChange"
             :options="options">

    </d2-crud>
    <myImg></myImg>
  </d2-container>
</template>

<script>
import { getUserList, stopUse } from '@api/user'
import myImg from '../../../components/myCom/tableImg'
export default {
  components: {
    myImg
  },
  data () {
    return {
      ChartOptions5: {
        xAxis: {
          type: 'category',
          data: ['1', '2', '3', '4', '5', '6'],
          show: false
        },
        yAxis: {
          show: false

        },
        grid: {
          x: 5,
          y: 5,
          x2: 5,
          y2: 5,
          borderWidth: 1
        },
        series: [{
          data: [],
          type: 'bar',
          showBackground: false,
          backgroundStyle: {
            color: 'rgba(220, 220, 220, 0.8)'
          }
        }]
      },
      ChartOptions6: {
        xAxis: {
          type: 'category',
          data: ['1', '2', '3', '4', '5', '6'],
          show: false
        },
        yAxis: {
          show: false

        },
        series: [{
          data: [],
          type: 'bar',
          showBackground: false,
          backgroundStyle: {
            color: 'rgba(220, 220, 220, 0.8)'
          }
        }]
      },
      ChartOptions7: {
        xAxis: {
          type: 'category',
          data: ['1', '2', '3', '4', '5', '6'],
          show: false
        },
        yAxis: {
          show: false

        },
        series: [{
          data: [],
          type: 'bar',
          showBackground: false,
          backgroundStyle: {
            color: 'rgba(220, 220, 220, 0.8)'
          }
        }]
      },
      ChartOptions8: {
        xAxis: {
          type: 'category',
          data: ['1', '2', '3', '4', '5', '6'],
          show: false
        },
        yAxis: {
          show: false

        },
        series: [{
          data: [],
          type: 'bar',
          showBackground: false,
          backgroundStyle: {
            color: 'rgba(220, 220, 220, 0.8)'
          }
        }]
      },
      register_user_count: '',
      sign_user_amount: '',
      sign_user_count: '',
      times_user_amount: '',
      input: '',
      select_list: [],
      columns: [
        {
          title: '注册时间',
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
          title: '用户手机号',
          key: 'username'
        },

        {
          title: '用户邀请数',
          key: 'invite_count',
          sortable: true
        },
        {
          title: '已发布资源',
          key: 'resource_count',
          sortable: true
        }
      ],
      outCoulum: [
        {
          label: '注册时间',
          prop: 'create_time'
        },
        {
          label: '用户昵称',
          prop: 'use_name'
        },
        {
          label: '用户手机号',
          prop: 'username'
        },
        {
          label: '用户邀请数',
          prop: 'invite_count'
        },
        {
          label: '已发布资源',
          prop: 'resource_count'
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
    handleSelectionChange (selection) {
      console.log('选择', selection)
      this.sels = selection
      // for (const i = 0; i < selection.length; i++) { this.select_list.push(selection[i].id) }
    },
    viewDetail ({ index, row }) {
      this.$router.push({ name: 'userDetail', query: { 'id': row.id } })
    },
    handleRowRemove ({ index, row }, done) {
      setTimeout(() => {
        console.log(index)
        console.log(row)
        stopUse({
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

    // 多选停用
    stops () {
      let ids = this.sels.map(item => item.id)
      this.$confirm('确认停用选中用户吗？', '提示', {
        type: 'warning'
      })
        .then(() => {
          const para = { 'id': ids }
          stopUse(para).then(res => {
            console.log(res, 'success') // 成功的返回
            this.$message({
              message: '停用成功',
              type: 'success'
            })
            getUserList({
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
    paginationCurrentChange (currentPage) {
      this.pagination.currentPage = currentPage
      this.fetchData(currentPage)
    },
    fetchData (currentPage) {
      this.loading = true
      getUserList({
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
    setMap () {
      let chartOne = document.getElementsByClassName('card_two')

      for (let i = 0; i < chartOne.length; i++) {
        let chartTwo = chartOne[i].getElementsByTagName('canvas')


        for (let j = 0; j < chartTwo.length; j++) {
          chartTwo[j].style.height = '80px'
        }
      }
    },
    query (item) {
      getUserList({
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
      getUserList({
        'start_time': '',
        'end_time': '',
        'item': '',
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
    getUserList({
      'start_time': '',
      'end_time': '',
      'item': '',
      'page': 1,
      'size': 20
    })
      .then(response => {
        console.log(response, 'success') // 成功的返回
        this.register_user_count = response.more.register_user_count
        this.sign_user_amount = response.more.sign_user_amount
        this.sign_user_count = response.more.sign_user_count
        this.times_user_amount = response.more.times_user_amount
        this.data = response.data
        this.pagination.total = response.count


        this.ChartOptions5.series[0].data = response.item_data.register_user_count
        this.ChartOptions6.series[0].data = response.item_data.sign_user_amount
        this.ChartOptions7.series[0].data = response.item_data.sign_user_count
        this.ChartOptions8.series[0].data = response.item_data.times_user_amount
      })
      .catch(error => console.log(error, 'error')) // 失败的返回

    setTimeout(() => {
      this.setMap()
    }, 800)
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

.head_card {
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: space-between;
}
.head_card .card {
  width: 20%;
  box-sizing: border-box;
  padding: 20px 10px;
  box-shadow: 0 0 10px 1px #e5e5e5;
  border-radius: 10px;
}
.head_card .card .card_top,
.card_bottom {
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: space-between;
}
.card_top .card_title {
  font-size: 16px;
  color: #999;
}
.card_top .card_text {
  font-size: 40px;
  color: #000;
}
.card_bottom .card_bg {
  flex: 1;
  display: flex;
  height: 100px;
}
.card_bottom .card_bg img {
  width: 100%;
}
.card_content {
  margin-left: 20px;
}
.card_percent,
.card_lable {
  font-size: 12px;
  color: #ccc;
}
</style>
