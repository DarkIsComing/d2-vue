      <template>
  <d2-container>
    <div class="top_select">
      <h3>资源信息</h3>
      <!-- <div class="select_box">
        <el-select v-model="selMonth"
                   @change="changeMonth"
                   placeholder="请选择月份">
          <el-option v-for="item in months"
                     :key="item.value"
                     :label="item.label"
                     :value="item.value">
          </el-option>
        </el-select>
      </div> -->
    </div>

    <el-divider></el-divider>
    <div class="head_card">

      <div class="card">
        <div class="card_top">
          <div class="card_title">
            注册公司
          </div>
          <div class="card_text">{{counts[0]}}</div>
        </div>
        <div class="card_bottom card_two">
          <chart ref="chart5"
                 :options="ChartOptions5"
                 :auto-resize="true"></chart>
        </div>
      </div>

      <div class="card">
        <div class="card_top">
          <div class="card_title">
            财政纳税
          </div>
          <div class="card_text">{{counts[1]}}</div>
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
            法律咨询
          </div>
          <div class="card_text">{{counts[2]}}</div>
        </div>
        <div class="card_bottom card_two">
          <chart ref="chart7"
                 :options="ChartOptions7"
                 :auto-resize="true"></chart>
        </div>
      </div>

      <div class="card">
        <div class="card_top">
          <div class="card_title">
            职业规划
          </div>
          <div class="card_text">{{counts[3]}}</div>
        </div>
        <div class="card_bottom card_two">
          <chart ref="chart8"
                 :options="ChartOptions8"
                 :auto-resize="true"></chart>
        </div>
      </div>

    </div>
    <div class="head_card">

      <div class="card">
        <div class="card_top">
          <div class="card_title">
            人才服务
          </div>
          <div class="card_text">{{counts[4]}}</div>
        </div>
        <div class="card_bottom card_two">
          <chart ref="chart9"
                 :options="ChartOptions9"
                 :auto-resize="true"></chart>
        </div>
      </div>

      <div class="card">
        <div class="card_top">
          <div class="card_title">
            政策解读
          </div>
          <div class="card_text">{{counts[5]}}</div>
        </div>
        <div class="card_bottom card_two">
          <chart ref="chart10"
                 :options="ChartOptions10"
                 :auto-resize="true"></chart>
        </div>
      </div>

      <div class="card"
           data-permission="sysbase.show_online">
        <div class="card_top">
          <div class="card_title">
            兼职零工
          </div>
          <div class="card_text">{{counts[6]}}</div>
        </div>
        <div class="card_bottom card_two">
          <chart ref="chart11"
                 :options="ChartOptions11"
                 :auto-resize="true"></chart>
        </div>
      </div>

      <div class="card"
           data-permission="sysbase.show_online">
        <div class="card_top">
          <div class="card_title">
            共享资源
          </div>
          <div class="card_text">{{counts[7]}}</div>
        </div>
        <div class="card_bottom card_two">
          <chart ref="chart12"
                 :options="ChartOptions12"
                 :auto-resize="true"></chart>
        </div>
      </div>

    </div>
    <el-divider></el-divider>
    <div>
      <div class="top_select">
        <h3>资源发布量</h3>
        <div class="select_box">
          <el-select v-model="selMethod"
                     @change="changeMethod"
                     placeholder="请选择查看方式">
            <el-option v-for="item in methods"
                       :key="item.value"
                       :label="item.label"
                       :value="item.value">
            </el-option>
          </el-select>
        </div>
      </div>

      <chart ref="chart1"
             :options="ChartOptions"
             :auto-resize="true"
             width="100%"></chart>
    </div>
    <el-divider></el-divider>
    <div>
      <div>
        <h3>资源访问量</h3>
        <div style="width:100%;overflow:hidden;">
          <div style="width:70%;float:left;">
            <chart ref="chart2"
                   :options="ChartOptions2"
                   :auto-resize="true"
                   width="100%"></chart>
          </div>

          <div class="see_right">

            <div class="head_card_two">
              <div class="card"
                   data-permission="sysbase.show_online">
                <div class="card_top">
                  <div class="card_title">
                    资源转发量
                  </div>
                  <div class="card_text">
                    <div class="select_box">
                      <el-select v-model="ResourceMonth"
                                 @change="changeResourceMonth"
                                 size=10px
                                 placeholder="选择月份">
                        <el-option v-for="item in months"
                                   :key="item.value"
                                   :label="item.label"
                                   :value="item.value">
                        </el-option>
                      </el-select>
                    </div>
                  </div>
                </div>
                <div class="card_bottom">
                  <div class="card_bg">
                    <chart ref="chart3"
                           :options="ChartOptions3"
                           :auto-resize="true"
                           width="100%"></chart>
                  </div>
                  <div class="card_content">
                    <div class="card_percent">{{nowCount1}}</div>
                    <div class="card_lable">(比上月增加{{Increase1}})</div>
                  </div>
                </div>
              </div>
            </div>

            <div class="head_card_two">
              <div class="card"
                   data-permission="sysbase.show_online">
                <div class="card_top">
                  <div class="card_title">
                    订单交易量
                  </div>
                  <div class="card_text">
                    <div class="select_box">
                      <el-select v-model="OrderMonth"
                                 @change="changeOrderMonth"
                                 size=10px
                                 placeholder="选择月份">
                        <el-option v-for="item in months"
                                   :key="item.value"
                                   :label="item.label"
                                   :value="item.value">
                        </el-option>
                      </el-select>
                    </div>
                  </div>
                </div>
                <div class="card_bottom">
                  <div class="card_bg">
                    <chart ref="chart4"
                           :options="ChartOptions4"
                           :auto-resize="true"
                           width="100%"></chart>
                  </div>
                </div>
                <div class="card_content">
                  <div class="card_percent">{{nowCount2}}</div>
                  <div class="card_lable">(比上月增加{{Increase2}})</div>
                </div>
              </div>
            </div>
          </div>

        </div>
      </div>
    </div>
    <myImg></myImg>
  </d2-container>

</template>

<script>
import { getHome, stopUse } from '@api/index'
import myImg from '../../../components/myCom/tableImg'
export default {
  data: function () {
    return {
      data: [],
      data2: [],
      columns: [
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
          title: '注册时间',
          key: 'create_time'
        }
      ],
      pagination1: {
        currentPage: 1,
        pageSize: 5,
        total: 0
      },
      pagination2: {
        currentPage: 1,
        pageSize: 5,
        total: 0
      },
      // 自定义操作列
      rowHandle1: {
        remove: {
          text: '停用',
          icon: 'el-icon-delete',
          size: 'small',
          fixed: 'right',
          confirm: true
        }
      },
      rowHandle2: {
        custom: [
          {
            text: '查看详情',
            type: 'Success',
            size: 'small',
            emit: 'custom-emit-1'
          }
        ]
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
      nowCount1: '',
      Increase1: '',
      nowCount2: '',
      Increase2: '',
      range: [],
      counts: [],
      ChartOptions: {
        tooltip: {
          trigger: 'axis'
        },
        grid: {
          left: '3%',
          right: '4%',
          bottom: '3%',
          containLabel: true
        },
        legend: {
          data: ['上月资源发布量', '本月资源发布量']
        },
        xAxis: {
          type: 'category',
          data: ['1', '2', '3', '4', '5', '6', '7', '8', '9', '10', '11', '12', '13', '14', '15', '16', '17', '18', '19', '20', '21', '22', '23', '24', '25', '26', '27', '28', '29', '30', '31']
        },
        yAxis: {
          type: 'value'
        },
        series: [{
          name: '上月资源发布量',
          data: [],
          type: 'line',
          smooth: true
        }, {
          name: '本月资源发布量',
          data: [],
          type: 'line',
          smooth: true
        }]
      },
      MonthOptions: {
        tooltip: {
          trigger: 'axis'
        },
        grid: {
          left: '3%',
          right: '4%',
          bottom: '3%',
          containLabel: true
        },
        legend: {
          data: ['上月资源发布量', '本月资源发布量']
        },
        xAxis: {
          type: 'category',
          data: ['1', '2', '3', '4', '5', '6', '7', '8', '9', '10', '11', '12', '13', '14', '15', '16', '17', '18', '19', '20', '21', '22', '23', '24', '25', '26', '27', '28', '29', '30', '31']
        },
        yAxis: {
          type: 'value'
        },
        series: [{
          name: '上月资源发布量',
          data: [],
          type: 'line',
          smooth: true
        }, {
          name: '本月资源发布量',
          data: [],
          type: 'line',
          smooth: true
        }]
      },
      WeekOptions: {
        tooltip: {
          trigger: 'axis'
        },
        grid: {
          left: '3%',
          right: '4%',
          bottom: '3%',
          containLabel: true
        },
        legend: {
          data: ['上周资源发布量', '本周资源发布量']
        },
        xAxis: {
          type: 'category',
          data: ['1', '2', '3', '4', '5', '6', '7']
        },
        yAxis: {
          type: 'value'
        },
        series: [{
          name: '上周资源发布量',
          data: [],
          type: 'line',
          smooth: true
        }, {
          name: '本周资源发布量',
          data: [],
          type: 'line',
          smooth: true
        }]
      },
      DayOptions: {
        tooltip: {
          trigger: 'axis'
        },
        grid: {
          left: '3%',
          right: '4%',
          bottom: '3%',
          containLabel: true
        },
        legend: {
          data: ['昨日资源发布量', '今日资源发布量']
        },
        xAxis: {
          type: 'category',
          data: ['1', '2', '3', '4', '5', '6', '7', '8', '9', '10', '11', '12', '13', '14', '15', '16', '17', '18', '19', '20', '21', '22', '23', '24']
        },
        yAxis: {
          type: 'value'
        },
        series: [{
          name: '昨日资源发布量',
          data: [],
          type: 'line',
          smooth: true
        }, {
          name: '今日资源发布量',
          data: [],
          type: 'line',
          smooth: true
        }]
      },
      columns2: [
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
          title: '发布时间',
          key: 'create_time'
        }
      ],
      UserDay: '今天',
      ResourceDay: '今天',
      days: [{
        value: '0',
        label: '今天'
      }, {
        value: '1',
        label: '昨天'
      }],
      selMonth: '',
      ResourceMonth: '',
      OrderMonth: '',
      selMethod: '按月查看',
      methods: [{
        value: '0',
        label: '按月查看'
      }, {
        value: '1',
        label: '按周查看'
      }, {
        value: '2',
        label: '按日查看'
      }],
      months: [{
        value: '1',
        label: '1月'
      }, {
        value: '2',
        label: '2月'
      }, {
        value: '3',
        label: '3月'
      }, {
        value: '4',
        label: '4月'
      }, {
        value: '5',
        label: '5月'
      },
      {
        value: '6',
        label: '6月'
      }, {
        value: '7',
        label: '7月'
      }, {
        value: '8',
        label: '8月'
      }, {
        value: '9',
        label: '9月'
      }, {
        value: '10',
        label: '10月'
      }, {
        value: '11',
        label: '11月'
      }, {
        value: '12',
        label: '12月'
      }],
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
            data: ['1月', '2月', '3月', '4月', '5月', '6月', '7月', '8月', '9月', '10月', '11月', '12月'],
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
            name: '本月访问量',
            type: 'bar',
            barWidth: '40%',
            data: []
          }
        ]
      },
      ChartOptions3: {
        series: [
          {
            name: '访问来源',
            type: 'pie',
            radius: '30%',
            data: [
            ],
            roseType: 'angle',
            itemStyle: {
              normal: {
                shadowBlur: 200,
                shadowColor: 'rgba(0, 0, 0, 0.5)'
              }
            }
          }
        ]
      },
      ChartOptions4: {
        series: [
          {
            name: '访问来源',
            type: 'pie',
            radius: '30%',
            data: [
            ],
            roseType: 'angle',
            itemStyle: {
              normal: {
                shadowBlur: 200,
                shadowColor: 'rgba(0, 0, 0, 0.5)'
              }
            }
          }
        ]
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
      ChartOptions9: {
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
      ChartOptions10: {
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
      ChartOptions11: {
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
      ChartOptions12: {
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
      }
    }
  },
  methods: {
    viewDetail ({ index, row }) {
      this.$router.push({ name: 'resourceDetail', query: { 'id': row.id, 'type_status': 0 } })
    },
    handleRowRemove ({ index, row }, done) {
      setTimeout(() => {
        console.log(index)
        console.log(row)
        stopUse({
          'id': Array.of(row.id)
        })
          .then(response => {
            this.pagination1.total = this.pagination1.total - 1
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
    changeResourceMonth () {
      console.log('啦啦啦啦啦', this.ResourceMonth)
      let date = new Date()
      getHome({
        'resource_month': '',
        'resource_type': 0,
        'times_month': this.ResourceMonth,
        'order_month': date.getMonth() + 1,
        'user_status': 0,
        'resource_status': 0,
        'user_page': 1,
        'user_size': 5,
        'resource_page': 1,
        'resource_size': 5
      })
        .then(response => {
          console.log(response, 'success') // 成功的返回
          this.nowCount1 = response.times_chart.now_count
          this.Increase1 = response.times_chart.more_count
          this.ChartOptions3.series[0].data = response.times_chart.value_list
          // this.chartData.rows = response.resource_count_echart.now
        })
        .catch(error => console.log(error, 'error')) // 失败的返回
    },
    changeOrderMonth () {
      console.log('啦啦啦啦啦', this.OrderMonth)
      let date = new Date()
      getHome({
        'resource_month': '',
        'resource_type': 0,
        'times_month': date.getMonth() + 1,
        'order_month': this.OrderMonth,
        'user_status': 0,
        'resource_status': 0,
        'user_page': 1,
        'user_size': 5,
        'resource_page': 1,
        'resource_size': 5
      })
        .then(response => {
          console.log(response, 'success') // 成功的返回
          this.nowCount2 = response.order_chart.now_count
          this.Increase2 = response.order_chart.more_count
          this.ChartOptions4.series[0].data = response.order_chart.value_list
          // this.chartData.rows = response.resource_count_echart.now
        })
        .catch(error => console.log(error, 'error')) // 失败的返回
    },
    changeUserDay () {
      console.log('啦啦啦啦啦', this.UserDay)
      let date = new Date()
      getHome({
        'resource_month': '',
        'resource_type': this.selMethod,
        'times_month': date.getMonth() + 1,
        'order_month': date.getMonth() + 1,
        'user_status': this.UserDay,
        'resource_status': 0,
        'user_page': 1,
        'user_size': 5,
        'resource_page': 1,
        'resource_size': 5
      })
        .then(response => {
          this.data = response.user_info
          this.pagination1.total = response.user_count
          // this.chartData.rows = response.resource_count_echart.now
        })
        .catch(error => console.log(error, 'error')) // 失败的返回
    },
    changeResourceDay () {
      console.log('啦啦啦啦啦', this.ResourceDay)
      let date = new Date()
      getHome({
        'resource_month': '',
        'resource_type': this.selMethod,
        'times_month': date.getMonth() + 1,
        'order_month': date.getMonth() + 1,
        'user_status': 0,
        'resource_status': this.ResourceDay,
        'user_page': 1,
        'user_size': 5,
        'resource_page': 1,
        'resource_size': 5
      })
        .then(response => {
          console.log(response, 'success') // 成功的返回
          this.data2 = response.resource_info
          this.pagination2.total = response.resource_count
          // this.chartData.rows = response.resource_count_echart.now
        })
        .catch(error => console.log(error, 'error')) // 失败的返回
    },
    changeMethod () {
      console.log('啦啦啦啦啦', this.selMethod)
      if (this.selMethod === '0') {
        this.ChartOptions = this.MonthOptions
      } else if (this.selMethod === '1') {
        this.ChartOptions = this.WeekOptions
      } else if (this.selMethod === '2') {
        this.ChartOptions = this.DayOptions
      } else {
        console.log('無')
      }
      let date = new Date()
      getHome({
        'resource_month': '',
        'resource_type': this.selMethod,
        'times_month': date.getMonth() + 1,
        'order_month': date.getMonth() + 1,
        'user_status': 0,
        'resource_status': 0,
        'user_page': 1,
        'user_size': 5,
        'resource_page': 1,
        'resource_size': 5
      })
        .then(response => {
          this.ChartOptions.series[0].data = response.resource_count_echart.last
          this.ChartOptions.series[1].data = response.resource_count_echart.now
          // this.chartData.rows = response.resource_count_echart.now
          console.log(response, 'success') // 成功的返回
        })
        .catch(error => console.log(error, 'error')) // 失败的返回
    }
  },
  paginationCurrentChange1 (currentPage) {
    this.pagination1.currentPage = currentPage
    this.fetchData1(currentPage)
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
  fetchData1 (currentPage) {
    this.loading = true
    let date = new Date()
    getHome({
      'resource_month': '',
      'resource_type': 0,
      'times_month': date.getMonth() + 1,
      'order_month': date.getMonth() + 1,
      'user_status': 0,
      'resource_status': 0,
      'user_page': currentPage,
      'user_size': 5,
      'resource_page': this.pagination2.currentPage,
      'resource_size': 5
    }).then(response => {
      this.data = response.user_info
      this.pagination1.total = response.user_count
      this.loading = false
    }).catch(err => {
      console.log('err', err)
      this.loading = false
    })
  },
  paginationCurrentChange2 (currentPage) {
    this.pagination2.currentPage = currentPage
    this.fetchData1(currentPage)
  },
  fetchData2 (currentPage) {
    this.loading = true
    let date = new Date()
    getHome({
      'resource_month': '',
      'resource_type': 0,
      'times_month': date.getMonth() + 1,
      'order_month': date.getMonth() + 1,
      'user_status': 0,
      'resource_status': 0,
      'user_page': this.pagination1.currentPage,
      'user_size': 5,
      'resource_page': currentPage,
      'resource_size': 5
    }).then(response => {
      this.data = response.resource_info
      this.pagination2.total = response.resource_count
      this.loading = false
    }).catch(err => {
      console.log('err', err)
      this.loading = false
    })
  },
  mounted: function () {
    let date = new Date()
    getHome({
      'resource_month': '',
      'resource_type': 0,
      'times_month': date.getMonth() + 1,
      'order_month': date.getMonth() + 1,
      'user_status': 0,
      'resource_status': 0,
      'user_page': 1,
      'user_size': 5,
      'resource_page': 1,
      'resource_size': 5
    })
      .then(response => {
        this.range = response.invite_info
        this.data = response.user_info
        this.data2 = response.resource_info
        this.pagination1.total = response.user_count
        this.pagination2.total = response.resource_count
        this.ResourceMonth = String(date.getMonth() + 1) + '月'
        this.OrderMonth = String(date.getMonth() + 1) + '月'
        this.nowCount1 = response.times_chart.now_count
        this.Increase1 = response.times_chart.more_count
        this.nowCount2 = response.order_chart.now_count
        this.Increase2 = response.order_chart.more_count
        this.ChartOptions3.series[0].data = response.times_chart.value_list
        this.ChartOptions4.series[0].data = response.order_chart.value_list
        this.ChartOptions = this.MonthOptions
        this.ChartOptions2.series[0].data = response.resource_log_chart
        this.counts = response.resource_count_data
        this.ChartOptions.series[0].data = response.resource_count_echart.last
        this.ChartOptions.series[1].data = response.resource_count_echart.now

        this.ChartOptions5.series[0].data = response.item_data[0]
        this.ChartOptions6.series[0].data = response.item_data[1]
        this.ChartOptions7.series[0].data = response.item_data[2]
        this.ChartOptions8.series[0].data = response.item_data[3]
        this.ChartOptions9.series[0].data = response.item_data[4]
        this.ChartOptions10.series[0].data = response.item_data[5]
        this.ChartOptions11.series[0].data = response.item_data[6]
        this.ChartOptions12.series[0].data = response.item_data[7]
        // this.chartData.rows = response.resource_count_echart.now
        console.log(response, 'success') // 成功的返回
      })
      .catch(error => console.log(error, 'error')) // 失败的返回

    setTimeout(() => {
      this.setMap()
    }, 800)
  }
}
</script>


<style scoped>
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

.public {
  border: solid;
  border-width: 1px;
}
.see {
  display: flex;
  align-items: center;
  justify-content: space-between;
}
.see_right {
  width: 20%;
  float: right;
}
.head_card_two {
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: space-between;
}
.head_card_two .card {
  width: 100%;
  box-sizing: border-box;
  padding: 20px 10px;
  box-shadow: 0 0 10px 1px #e5e5e5;
  border-radius: 10px;
}
.head_card_two .card .card_top,
.card_bottom {
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: space-between;
}
.level {
  width: 100%;
  height: 30.6vw;
  display: flex;
  border: 1px solid #ededed;
  border-radius: 0.5vw;
  flex-direction: column;
}
.level .level_item {
  width: 100%;
  flex: 1;
  display: flex;
  border-bottom: 1px solid #f0f0f0;
  align-items: center;
  box-sizing: border-box;
  padding: 0 2.5vw;
}
.level .level_item:last-child {
  border-bottom: none;
}
.level .level_item .level_name {
  font-size: 0.7rem;
  color: #353535;
  margin-right: 1.6vw;
}
.level .level_item .level_hospital_num {
  font-size: 0.5rem;
  color: #23b267;
  flex: 1;
}
.level .level_item .level_money {
  font-size: 0.8rem;
  color: #707070;
}
.echarts {
  width: 100%;
}
.top_select {
  width: 100%;
  overflow: hidden;
}
.top_select h3 {
  float: left;
}
.top_select .select_box {
  float: right;
}
</style>
