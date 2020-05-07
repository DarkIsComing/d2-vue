<template>
  <d2-container>
    <d2-main>
      <div class="head_card">
        <div class="card"
             data-permission="sysbase.show_online">
          <div class="card_top">
            <div class="card_title">
              资源余量
            </div>
            <div class="card_text">{{resource_count}}</div>
          </div>
          <div class="card_bottom">
            <div class="card_bg">
              <img src="./image/chart.png" />
            </div>
            <div class="card_content">
              <div class="card_percent">{{resource_up}}%^</div>
              <div class="card_lable">本月{{resource_month}}</div>
            </div>
          </div>
        </div>

        <div class="card"
             data-permission="sysbase.show_online">
          <div class="card_top">
            <div class="card_title">
              资源发布量
            </div>
            <div class="card_text">{{pub_count}}</div>
          </div>
          <div class="card_bottom">
            <div class="card_bg">
              <img src="./image/chart-2.png" />
            </div>
            <div class="card_content">
              <div class="card_percent">{{pub_up}}%^</div>
              <div class="card_lable">本月{{pub_month}}</div>
            </div>
          </div>
        </div>

        <div class="card"
             data-permission="sysbase.show_online">
          <div class="card_top">
            <div class="card_title">
              用户邀请量
            </div>
            <div class="card_text">{{invite_count}}</div>
          </div>
          <div class="card_bottom">
            <div class="card_bg">
              <img src="./image/chart-3.png" />
            </div>
            <div class="card_content">
              <div class="card_percent">{{invite_up}}%^</div>
              <div class="card_lable">本月{{invite_month}}</div>
            </div>
          </div>
        </div>

        <div class="card"
             data-permission="sysbase.show_online">
          <div class="card_top">
            <div class="card_title">
              资源转发量
            </div>
            <div class="card_text">{{times_count}}</div>
          </div>
          <div class="card_bottom">
            <div class="card_bg">
              <img src="./image/chart-4.png" />
            </div>
            <div class="card_content">
              <div class="card_percent">{{times_up}}%^</div>
              <div class="card_lable">本月{{times_month}}</div>
            </div>
          </div>
        </div>

      </div>
      <el-divider></el-divider>
      <h1>用户信息</h1>
      <el-divider></el-divider>
      <el-row>
        <el-col :span="8">
          <div class="grid-content bg-purple">用户头像: {{img}}</div>
        </el-col>
        <el-col :span="8">
          <div class="grid-content bg-purple-light">用户昵称: {{use_name}}</div>
        </el-col>
        <el-col :span="8">
          <div class="grid-content bg-purple-light">用户手机号: {{username}}</div>
        </el-col>
      </el-row>

      <el-row>
        <el-col :span="8">
          <div class="grid-content bg-purple">用户专长: {{speciality}}</div>
        </el-col>
        <el-col :span="8">
          <div class="grid-content bg-purple-light">所在地区: {{area}}</div>
        </el-col>
        <el-col :span="8">
          <div class="grid-content bg-purple-light">性别: {{gender}}</div>
        </el-col>
      </el-row>

      <el-row>
        <el-col :span="8">
          <div class="grid-content bg-purple">微信: {{wechat}}</div>
        </el-col>
        <el-col :span="8">
          <div class="grid-content bg-purple-light">QQ: {{tecent}}</div>
        </el-col>
        <el-col :span="8">
          <div class="grid-content bg-purple-light">当前身份: {{status}}</div>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="8">
          <div class="grid-content bg-purple">为什么要用搜了么: {{reason}}</div>
        </el-col>
        <el-col :span="8">
          <div class="grid-content bg-purple-light">最近登录时间: {{last_login_time}}</div>
        </el-col>
      </el-row>
      <el-divider></el-divider>
      <h1>个人简历</h1>
      <el-divider></el-divider>
      <div>教育信息</div>
      <el-row>
        <el-col :span="6">
          <div class="grid-content bg-purple"><img :src="postive"></div>
          <div class="grid-content bg-purple">毕业学校:{{school}}</div>
        </el-col>
        <el-col :span="6">
          <div class="grid-content bg-purple-light"><img v-bind:src="negative"></div>
          <div class="grid-content bg-purple-light">毕业学历:{{record}}</div>
        </el-col>
        <el-col :span="6">
          <div class="grid-content bg-purple"><img :src="face"></div>
          <div class="grid-content bg-purple">所学专业:{{special}}</div>
        </el-col>
        <el-col :span="6">
          <div class="grid-content bg-purple-light"><img :src="license"></div>
          <div class="grid-content bg-purple-light">毕业时间:{{start_school}}-{{end_school}}</div>
        </el-col>
      </el-row>
      <div>工作经历</div>
      <el-row>
        <el-col :span="6">
          <div class="grid-content bg-purple"><img :src="postive"></div>
          <div class="grid-content bg-purple">公司名称:{{company}}</div>
        </el-col>
        <el-col :span="6">
          <div class="grid-content bg-purple-light"><img v-bind:src="negative"></div>
          <div class="grid-content bg-purple-light">公司性质:{{company_status}}</div>
        </el-col>
        <el-col :span="6">
          <div class="grid-content bg-purple"><img :src="face"></div>
          <div class="grid-content bg-purple">主要职务:{{company_position}}</div>
        </el-col>
        <el-col :span="6">
          <div class="grid-content bg-purple-light"><img :src="license"></div>
          <div class="grid-content bg-purple-light">从业时间:{{start_work}}-{{end_work}}</div>
        </el-col>
      </el-row>
      <div>兼职经历</div>
      <p>{{notes}}</p>
      <div>自我评价</div>
      <p>{{introduction}}</p>
      <el-divider></el-divider>
      <h1>资源共享</h1>
      <el-divider></el-divider>
      <div>
        <el-row>
          <el-col :span="4">
            <div class="grid-content bg-purple">连续签到时长:</div>
          </el-col>
          <el-col :span="4">
            <div class="grid-content bg-purple-light">共计签到天数:</div>
          </el-col>
          <el-col :span="4">
            <div class="grid-content bg-purple">签到瓜分金额:</div>
          </el-col>
          <el-col :span="4">
            <div class="grid-content bg-purple-light">转发有奖金额:</div>
          </el-col>
          <el-col :span="4">
            <div class="grid-content bg-purple">账户余额:</div>
          </el-col>
          <el-col :span="4">
            <div class="grid-content bg-purple-light">邀请码:</div>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="4">
            <div class="grid-content bg-purple">{{total_day}}天</div>
          </el-col>
          <el-col :span="4">
            <div class="grid-content bg-purple-light">{{day}}天</div>
          </el-col>
          <el-col :span="4">

            <div class="grid-content bg-purple">{{sign_amount}}元</div>
          </el-col>
          <el-col :span="4">

            <div class="grid-content bg-purple-light">{{times_amount}}元</div>
          </el-col>
          <el-col :span="4">

            <div class="grid-content bg-purple">{{pay_amount}}元</div>
          </el-col>
          <el-col :span="4">

            <div class="grid-content bg-purple-light">{{invite_code}}</div>
          </el-col>
        </el-row>
      </div>
      <el-divider></el-divider>
      <el-divider></el-divider>
      <h1>邀请记录</h1>
      <d2-crud ref="d2Crud"
               :columns="columns1"
               :data="data1"
               :loading="loading"
               :loading-options="loadingOptions"
               selection-row
               @selection-change="handleSelectionChange"
               @current-change="handleCurrentChange"
               @custom-emit-1="handleCustomEvent"
               :pagination="pagination1"
               @pagination-current-change="paginationCurrentChange1"
               :options="options">
      </d2-crud>
      <el-divider></el-divider>
      <el-divider></el-divider>
      <h1>账户余额</h1>
      <d2-crud ref="d2Crud"
               :columns="columns2"
               :data="data2"
               :loading="loading"
               :loading-options="loadingOptions"
               selection-row
               @selection-change="handleSelectionChange"
               @current-change="handleCurrentChange"
               :pagination="pagination2"
               @pagination-current-change="paginationCurrentChange2"
               :options="options">
      </d2-crud>
      <el-divider></el-divider>
      <el-divider></el-divider>
      <h1>资源发布</h1>
      <d2-crud ref="d2Crud"
               :columns="columns3"
               :data="data3"
               :loading="loading"
               :loading-options="loadingOptions"
               selection-row
               @selection-change="handleSelectionChange"
               @current-change="handleCurrentChange"
               :pagination="pagination3"
               @pagination-current-change="paginationCurrentChange3"
               :options="options">
      </d2-crud>
      <el-divider></el-divider>
    </d2-main>

    <d2-footer>

    </d2-footer>
  </d2-container>
</template>

<script>
import { getUserDetail } from '@api/user'
export default {
  data () {
    return {
      resource_count: '',
      resource_month: '',
      resource_up: '',
      pub_count: '',
      pub_month: '',
      pub_up: '',
      invite_count: '',
      invite_month: '',
      invite_up: '',
      times_count: '',
      times_month: '',
      times_up: '',


      use_name: '',
      username: '',
      speciality: '',
      area: '',
      gender: '',
      wechat: '',
      tecent: '',
      status: '',
      reason: '',
      last_login_time: '',
      school: '',
      start_school: '',
      end_school: '',
      record: '',
      special: '',
      company: '',
      company_status: '',
      company_position: '',
      start_work: '',
      end_work: '',
      notes: '',
      introduction: '',
      total_day: '',
      day: '',
      sign_amount: '',
      times_amount: '',
      pay_amount: '',
      invite_code: '',

      pagination1: {
        currentPage: 1,
        pageSize: 4,
        total: 0
      },
      pagination2: {
        currentPage: 1,
        pageSize: 4,
        total: 0
      },
      pagination3: {
        currentPage: 1,
        pageSize: 4,
        total: 0
      },
      options: {
        strip: true,
        highlightCurrentRow: true,
        defaultSort: {
          prop: 'date',
          order: 'descending'
        }
      },
      rowHandle: {
        custom: [
          {
            text: '删除',
            type: 'danger ',
            size: 'small',
            emit: 'custom-emit-1'
          }
        ]
      },
      columns1: [
        {
          title: '邀请时间',
          key: 'create_time'
        },
        {
          title: '获得发布量',
          key: 'free'
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
      data1: [],
      columns2: [
        {
          title: '时间',
          key: 'create_time'
        },
        {
          title: '原因',
          key: 'notes'

        },
        {
          title: '金额',
          key: 'amount'
        },
        {
          title: '当前余额',
          key: 'total_amount'
        },
        {
          title: '进程',
          key: 'status'
        }
      ],
      data2: [],
      columns3: [
        {
          title: '发布时间',
          key: 'create_time'
        },
        {
          title: '资源类目',
          key: 'status'
        },
        {
          title: '发布类型',
          key: 'type_status'
        },
        {
          title: '发布标题',
          key: 'name'
        }
      ],
      data3: []
    }
  },
  methods: {
    paginationCurrentChange1 (currentPage) {
      this.pagination1.currentPage = currentPage
      this.fetchData1(currentPage)
    },
    fetchData1 (currentPage) {
      this.loading = true
      getUserDetail({
        'id': this.$route.query.id,
        'invite_page': currentPage,
        'invite_size': 4,
        'pay_page': this.pagination2.currentPage,
        'pay_size': 4,
        'resource_page': this.pagination3.currentPage,
        'resource_size': 4
      }).then(response => {
        this.data1 = response.data.invite_log
        this.pagination1.total = response.data.invite_count
        this.loading = false
      }).catch(err => {
        console.log('err', err)
        this.loading = false
      })
    },
    paginationCurrentChange2 (currentPage) {
      this.pagination2.currentPage = currentPage
      this.fetchData2(currentPage)
    },
    fetchData2 (currentPage) {
      this.loading = true
      getUserDetail({
        'id': this.$route.query.id,
        'invite_page': this.pagination1.currentPage,
        'invite_size': 4,
        'pay_page': currentPage,
        'pay_size': 4,
        'resource_page': this.pagination3.currentPage,
        'resource_size': 4
      }).then(response => {
        this.data2 = response.data.pay_log
        this.pagination2.total = response.data.pay_log_count
        this.loading = false
      }).catch(err => {
        console.log('err', err)
        this.loading = false
      })
    },
    paginationCurrentChange3 (currentPage) {
      this.pagination3.currentPage = currentPage
      this.fetchData3(currentPage)
    },
    fetchData3 (currentPage) {
      this.loading = true
      getUserDetail({
        'id': this.$route.query.id,
        'invite_page': this.pagination1.currentPage,
        'invite_size': 4,
        'pay_page': this.pagination2.currentPage,
        'pay_size': 4,
        'resource_page': currentPage,
        'resource_size': 4
      }).then(response => {
        this.data3 = response.data.user_resource
        this.pagination3.total = response.data.resource_count
        this.loading = false
      }).catch(err => {
        console.log('err', err)
        this.loading = false
      })
    }
  },
  mounted: function () {
    console.info('id', this.$route.query.id)
    getUserDetail({
      'id': this.$route.query.id,
      'invite_page': 1,
      'invite_size': 4,
      'pay_page': 1,
      'pay_size': 4,
      'resource_page': 1,
      'resource_size': 4

    })
      .then(response => {
        console.log(response, 'success') // 成功的返回
        this.resource_count = response.more.free_count
        this.resource_month = response.more.free_month
        this.resource_up = response.more.free_up
        this.pub_count = response.more.resource_count
        this.pub_month = response.more.resource_month
        this.pub_up = response.more.resource_up
        this.invite_count = response.more.invite_count
        this.invite_month = response.more.invite_month
        this.invite_up = response.more.invite_up
        this.times_count = response.more.times_count
        this.times_month = response.more.times_month
        this.times_up = response.more.times_up

        this.use_name = response.data.userinfo.use_name
        this.username = response.data.userinfo.username
        this.speciality = response.data.userinfo.speciality
        this.area = response.data.userinfo.area
        this.gender = response.data.userinfo.gender
        this.wechat = response.data.userinfo.wechat
        this.tecent = response.data.userinfo.tecent
        this.status = response.data.userinfo.status
        this.reason = response.data.userinfo.reason
        this.last_login_time = response.data.userinfo.last_login_time

        this.school = response.data.user_resume.user_education.school
        this.record = response.data.user_resume.user_education.status
        this.special = response.data.user_resume.user_education.special
        this.start_school = response.data.user_resume.user_education.start_time
        this.end_school = response.data.user_resume.user_education.end_time
        this.notes = response.data.user_resume.user_morework.notes
        this.introduction = response.data.user_resume.introduction
        this.company = response.data.user_resume.user_work.company
        this.company_status = response.data.user_resume.user_work.company_status
        this.company_position = response.data.user_resume.user_work.company_position
        this.start_work = response.data.user_resume.user_work.start_time
        this.end_work = response.data.user_resume.user_work.end_time

        this.total_day = response.data.amount.total_day
        this.day = response.data.amount.day
        this.sign_amount = response.data.amount.sign_amount
        this.times_amount = response.data.amount.times_amount
        this.pay_amount = response.data.amount.pay_amount
        this.invite_code = response.data.amount.invite_code

        this.data3 = response.data.user_resource
        this.data2 = response.data.pay_log
        this.data1 = response.data.invite_log

        this.pagination1.total = response.data.invite_count
        this.pagination2.total = response.data.pay_log_count
        this.pagination3.total = response.data.resource_count
      })
      .catch(error => console.log(error, 'error')) // 失败的返回
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
</style>
