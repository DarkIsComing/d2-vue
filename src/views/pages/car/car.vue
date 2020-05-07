<template>
  <div class="child1">
    <div class="head_card">

      <div class="card">
        <div class="card_top">
          <div class="card_title">
            车找人资源量
          </div>
          <div class="card_text">{{count}}</div>
        </div>
        <div class="card_bottom">
          <chart ref="chart5"
                 :options="ChartOptions5"
                 :auto-resize="true"></chart>
        </div>
      </div>

      <div class="card">
        <div class="card_top">
          <div class="card_title">
            车找人免费量
          </div>
          <div class="card_text">{{free_count}}</div>
        </div>
        <div class="card_bottom">
          <chart ref="chart6"
                 :options="ChartOptions6"
                 :auto-resize="true"></chart>
        </div>
      </div>

      <div class="card">
        <div class="card_top">
          <div class="card_title">
            用户预约量
          </div>
          <div class="card_text">{{order_count}}</div>
        </div>
        <div class="card_bottom">
          <chart ref="chart7"
                 :options="ChartOptions7"
                 :auto-resize="true"></chart>
        </div>
      </div>

      <div class="card">
        <div class="card_top">
          <div class="card_title">
            用户沟通量
          </div>
          <div class="card_text">{{success_count}}</div>
        </div>
        <div class="card_bottom">
          <chart ref="chart8"
                 :options="ChartOptions8"
                 :auto-resize="true"></chart>
        </div>
      </div>

    </div>
    <el-divider></el-divider>
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

      <el-button slot="header"
                 style="margin-bottom: 5px"
                 @click="exportExcel">导出</el-button>
      <span class="demonstration"
            slot="header"
            style="margin-bottom: 5px">发布时间</span>
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
            style="margin-bottom: 5px">昵称/关键字</span>
      <el-input slot="header"
                style="margin-bottom: 5px"
                v-model="input"
                placeholder="请输入用户昵称/地点关键字">

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
import { getCarList, deleteCar } from '@api/car'
import myImg from '../../../components/myCom/carImg'
export default {
  name: 'child1',
  data () {
    return {
      count: '',
      free_count: '',
      order_count: '',
      success_count: '',
      input: '',
      columns: [
        {
          title: '发布时间',
          key: 'start_time',
          width: '180',
          sortable: true
        },
        {
          title: '用户头像',
          key: 'car_image',
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
          title: '出发地',
          key: 'start_area'
        },
        {
          title: '目的地',
          key: 'end_area'
        },
        {
          title: '是否免费',
          key: 'pay_status',
          filters: [
            { text: '平摊过路费、油费', value: '平摊过路费、油费' },
            { text: '免费', value: '免费' }
          ],
          filterMethod (value, row) {
            return row.pay_status === value
          },
          filterPlacement: 'bottom-end'
        }
      ],
      outCoulum: [
        {
          label: '发布时间',
          prop: 'start_time'
        },
        {
          label: '用户昵称',
          prop: 'use_name'
        },
        {
          label: '出发地',
          prop: 'start_area'
        },
        {
          label: '目的地',
          prop: 'end_area'
        },
        {
          label: '是否免费',
          prop: 'pay_status'
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
        height: '500',
        highlightCurrentRow: true,
        defaultSort: {
          prop: 'date',
          order: 'descending'
        }
      },
      ChartOptions5: {
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
      // 自定义操作列
      rowHandle: {
        custom: [
          {
            text: '查看详情',
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
      getCarList({
        'start_time': '',
        'end_time': '',
        'item': '',
        'page': currentPage,
        'size': 20,
        'status': 0
      }).then(response => {
        this.data = response.data
        this.pagination.total = response.more.count
        this.loading = false
      }).catch(err => {
        console.log('err', err)
        this.loading = false
      })
    },
    exportExcel () {
      this.$export.excel({
        columns: this.outCoulum,
        data: this.data,
        header: '车找人列表'

      })
        .then(() => {
          console.log('数据:', this.$refs.d2Crud.d2CrudData)
          this.$message('导出表格成功')
        })
    },
    handleRowRemove ({ index, row }, done) {
      setTimeout(() => {
        console.log(index)
        console.log(row)
        deleteCar({
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
    viewDetail ({ index, row }) {
      this.$router.push({ name: 'carDetail', query: { 'id': row.id, 'status': 0 } })
    },
    query (item) {
      getCarList({
        'start_time': this.value2[0],
        'end_time': this.value2[1],
        'item': this.input,
        'page': 1,
        'size': 20,
        'status': 0
      })
        .then(response => {
          this.data = response.data
          this.pagination.total = response.more.count
          console.log(response, 'success') // 成功的返回
        })
        .catch(error => console.log(error, 'error')) // 失败的返回
    },
    // 重置
    reset () {
      this.input = ''
      this.value2 = ''
      getCarList({
        'start_time': '',
        'end_time': '',
        'item': this.input,
        'page': 1,
        'size': 20,
        'status': 0
      })
        .then(response => {
          this.data = response.data
          this.pagination.total = response.more.count
          console.log(response, 'success') // 成功的返回
        })
        .catch(error => console.log(error, 'error')) // 失败的返回
    }
  },
  components: {
    myImg
  },
  mounted: function () {
    getCarList({
      'start_time': '',
      'end_time': '',
      'item': '',
      'page': 1,
      'size': 20,
      'status': 0
    })
      .then(response => {
        console.log(response, 'success') // 成功的返回
        this.data = response.data
        this.pagination.total = response.more.count
        this.count = response.more.count
        this.free_count = response.more.free_count
        this.order_count = response.more.order_count
        this.success_count = response.more.success_count


        this.ChartOptions5.series[0].data = response.item_data.count
        this.ChartOptions6.series[0].data = response.item_data.free_count
        this.ChartOptions7.series[0].data = response.item_data.order_count
        this.ChartOptions8.series[0].data = response.item_data.success_count
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
