<template>
  <d2-container>

    <div>
      <h3>转发量</h3>
      <div style="width:100%;overflow:hidden;">
        <div class="see_left">
          <div class="select_box">
            <el-select v-model="status"
                       @change="changeMethod"
                       placeholder="请选择查看方式">
              <el-option v-for="item in methods"
                         :key="item.value"
                         :label="item.label"
                         :value="item.value">
              </el-option>
            </el-select>
          </div>
          <div class="see_left">
            <chart ref="chart2"
                   :options="ChartOptions2"
                   :auto-resize="true"
                   width="100%"></chart>
          </div>

        </div>

        <div class="see_right">
          <chart ref="chart3"
                 :options="ChartOptions3"
                 :auto-resize="true"
                 width="100%"></chart>
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
                 @click="stop">删除</el-button>
      <span class="demonstration"
            slot="header"
            style="margin-bottom: 5px">转发时间</span>
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
             @custom-emit-1="handleCustomEvent"
             :pagination="pagination"
             @pagination-current-change="paginationCurrentChange"
             :options="options">
    </d2-crud>
    <myImg></myImg>
  </d2-container>
</template>

<script>
import { getTransmitList, deleteTransmit, getTransmitEchart } from '@api/transmit'
import myImg from '../../../components/myCom/tableImg'
export default {
  components: {
    myImg
  },
  data () {
    return {
      methods: [{
        value: '0',
        label: '最近7天'
      }, {
        value: '1',
        label: '最近15天'
      }, {
        value: '2',
        label: '最近30天'
      }],
      status: '最近7天',
      input: '',
      ChartOptions2: {
        color: ['#3398DB'],
        tooltip: {
          trigger: 'axis',
          axisPointer: { // 坐标轴指示器，坐标轴触发有效
            type: 'shadow' // 默认为直线，可选为：'line' | 'shadow'
          }
        },
        grid: {
          left: '3%',
          right: '4%',
          bottom: '3%',
          containLabel: true
        },
        xAxis: [
          {
            type: 'category',
            data: [],
            axisTick: {
              alignWithLabel: true
            }
          }
        ],
        yAxis: [
          {
            type: 'value'
          }
        ],
        series: [
          {
            name: '转发量',
            type: 'bar',
            barWidth: '40%',
            data: []
          }
        ]
      },
      ChartOptions3: {
        tooltip: {
          trigger: 'item',
          formatter: '{a} <br/>{b}: {c} ({d}%)'
        },
        legend: {
          orient: 'vertical',
          left: 10,
          data: ['供给', '需求', '悬赏', '分享', '提供咨询', '需要咨询']
        },
        series: [
          {
            name: '访问来源',
            type: 'pie',
            radius: ['50%', '70%'],
            avoidLabelOverlap: false,
            label: {
              show: false,
              position: 'center'
            },
            emphasis: {
              label: {
                show: true,
                fontSize: '30',
                fontWeight: 'bold'
              }
            },
            labelLine: {
              show: false
            },
            data: []
          }
        ]
      },
      columns: [
        {
          title: '转发时间',
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
          title: '转发有奖金额',
          key: 'amount'
        },
        {
          title: '转发资源标题',
          key: 'resource_name'
        }
      ],
      outCoulum: [
        {
          label: '转发时间',
          prop: 'create_time'
        },
        {
          label: '用户头像',
          prop: 'use_name'
        },
        {
          label: '转发有奖金额',
          prop: 'amount'
        },
        {
          label: '转发资源标题',
          prop: 'resource_name'
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
    handleSelectionChange (selection) {
      this.sels = selection
    },
    stop () {
      let ids = this.sels.map(item => item.id)
      this.$confirm('确认删除选中记录吗？', '提示', {
        type: 'warning'
      })
        .then(() => {
          const para = { 'id': ids }
          deleteTransmit(para).then(res => {
            this.$message({
              message: '删除成功',
              type: 'success'
            })
            getTransmitList({
              'start_time': '',
              'end_time': '',
              'item': '',
              'page': 1,
              'size': 20,
              'rank': ''
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
      console.log('当前页:', currentPage)
      this.loading = true
      getTransmitList({
        'start_time': '',
        'end_time': '',
        'item': '',
        'page': currentPage,
        'size': 20,
        'rank': ''
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
        header: '资源列表'

      })
        .then(() => {
          console.log('数据:', this.$refs.d2Crud.d2CrudData)
          this.$message('导出表格成功')
        })
    },
    query (item) {
      getTransmitList({
        'start_time': this.value2[0],
        'end_time': this.value2[1],
        'item': this.input,
        'page': 1,
        'size': 20,
        'rank': ''
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
      getTransmitList({
        'start_time': '',
        'end_time': '',
        'item': this.input,
        'page': 1,
        'size': 20,
        'rank': ''
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
    handleRowRemove ({ index, row }, done) {
      setTimeout(() => {
        console.log(index)
        console.log(row)
        deleteTransmit({
          'id': [row.id]
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
    handleDialogOpen ({ mode }) {
      this.$message({
        message: '打开模态框，模式为：' + mode,
        type: 'success'
      })
    },
    changeMethod () {
      console.log('啦啦啦啦啦', this.status)
      getTransmitEchart({
        'status': parseInt(this.status)
      }).then(response => {
        let date = response.data.chart.map(obj => { return obj.date })
        let count = response.data.chart.map(obj => { return obj.count })
        this.ChartOptions2.xAxis[0].data = date
        this.ChartOptions2.series[0].data = count
        console.log(response, 'success') // 成功的返回
      })
        .catch(error => console.log(error, 'error')) // 失败的返回
    }
  },

  mounted: function () {
    getTransmitList({
      'start_time': '',
      'end_time': '',
      'item': '',
      'page': 1,
      'size': 20,
      'rank': ''
    })
      .then(response => {
        this.data = response.data
        this.pagination.total = response.count
        console.log(response, 'success') // 成功的返回
      })
      .catch(error => console.log(error, 'error')) // 失败的返回

    getTransmitEchart({
      'status': 0
    }).then(response => {
      this.ChartOptions3.series[0].data = response.data.rate
      let date = response.data.chart.map(obj => { return obj.date })
      let count = response.data.chart.map(obj => { return obj.count })
      this.ChartOptions2.xAxis[0].data = date
      this.ChartOptions2.series[0].data = count
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
.see_left {
  float: left;
}
.see_right {
  float: right;
}
.select_box {
  float: right;
}
</style>
