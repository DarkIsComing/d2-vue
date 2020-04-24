
<template>
  <d2-container type="card">
    <div style="height: 800px; margin: -16px;">
      <SplitPane :min-percent='20'
                 :default-percent='30'
                 split="vertical">
        <template slot="paneL">
          <div style="margin: 10px;">
            <div>
              <div class='left'>
                <el-button type="text"
                           @click="del()">停用</el-button>
              </div>
              <div class='right'>
                <el-button type="text"
                           @click="next()">下一条</el-button>
              </div>
            </div>
            <div class="info">
              <img :src="user_image"
                   class="round_icon"
                   alt="">

            </div>
            <div class="info">
              <span>{{use_name}}</span>
            </div>
            <div class="menu">
              <el-menu :default-active="activeIndex"
                       class="el-menu-demo"
                       mode="horizontal"
                       @select="handleSelect">
                <el-submenu index="1">
                  <template slot="title">资源列表</template>
                  <el-menu-item index="0">注册公司</el-menu-item>
                  <el-menu-item index="1">财政纳税</el-menu-item>
                  <el-menu-item index="2">法律咨询</el-menu-item>
                  <el-menu-item index="3">职业规划</el-menu-item>
                  <el-menu-item index="4">人才服务</el-menu-item>
                  <el-menu-item index="5">政策解读</el-menu-item>
                  <el-menu-item index="6">兼职零工</el-menu-item>
                  <el-menu-item index="7">共享资源</el-menu-item>
                </el-submenu>
                <el-menu-item index="2">收藏</el-menu-item>
              </el-menu>
            </div>
            <div>
              <d2-crud ref="d2Crud"
                       :columns="columns"
                       :data="data"
                       :rowHandle="rowHandle"
                       @custom-emit-1="handleCustomEvent"
                       :pagination="pagination"
                       @pagination-current-change="paginationCurrentChange" />
            </div>
          </div>
        </template>
        <template slot="paneR">
          <keywordDetail :resData='resData'></keywordDetail>
        </template>
      </SplitPane>
    </div>
  </d2-container>
</template>


<script>
import { getKeywordDetail } from '@api/keyword'
import keywordDetail from '../../../components/myCom/keywordDetail'


export default {
  components: {
    keywordDetail
  },
  data () {
    return {
      type_status: '',
      resData: {
        // 右边1
        title: '',
        create_time: '',
        type_status_text: '',
        show_count: '',

        // 右边2
        amount: '',
        pay_count: '',
        count: '',
        unit: '',
        business_choice: '',
        year: '',
        gender: '',
        map: '',

        notes: '',
        times_price: '',
        times_count: '',
        last_count: '',
        is_lock: '',
        show_price: '',
        look_times: '',
        looker: '',
        resource_url: '',
        ask: [],
        talk: [],
        imgUrl: [

        ],
        // 大图片默认显示第一张
        ImgUrl: ''
      },
      // 左边
      use_name: '',
      user_image: '',
      id: '',
      last: '',
      resource_id: '',
      columns: [
        {
          title: '发布标题',
          key: 'name',
          width: '180'

        },
        {
          title: '资源定位',
          key: 'status_text',
          width: '180'
        }
      ],
      data: [],
      loading: false,
      rowHandle: {
        custom: [
          {
            text: '查看详情',
            type: 'primary',
            size: 'small',
            emit: 'custom-emit-1'
          }
        ]
      },
      pagination: {
        currentPage: 1,
        pageSize: 10,
        total: 0
      }
    }
  },
  mounted: function () {
    console.info('id', this.$route.query.id)
    getKeywordDetail({
      'id': this.$route.query.id,
      'resource_id': '',
      'page': 1,
      'size': 10,
      'type_status': 0
    })
      .then(response => {
        this.id = this.$route.query.id
        console.log(response, 'success') // 成功的返回
        this.resData.pay_count = response.data.detail.pay_count
        this.resData.ask_amount = response.data.detail.ask_amount
        this.last = response.last
        this.type_status = this.$route.query.type_status
        this.use_name = response.user_info.use_name
        this.user_image = process.env.VUE_APP_API + response.user_info.user_image
        this.resource_id = response.data.detail.id

        this.resData.title = response.data.detail.name
        this.resData.create_time = response.data.detail.create_time
        this.resData.show_count = response.data.detail.show_count
        this.resData.type_status_text = response.data.detail.type_status_text
        this.resData.map = response.data.detail.map

        this.resData.amount = response.data.detail.amount
        this.resData.count = response.data.detail.count
        this.resData.unit = response.data.detail.unit
        this.resData.business_choice = response.data.detail.business_choice
        this.resData.year = response.data.detail.year
        this.resData.gender = response.data.detail.gender
        // this.resData.map = response.data.detail.map

        this.resData.notes = response.data.detail.notes
        this.resData.times_price = response.data.detail.times_price
        this.resData.times_count = response.data.detail.times_count
        this.resData.last_count = response.data.detail.last_count
        this.resData.is_lock = response.data.detail.is_lock
        this.resData.show_price = response.data.detail.show_price
        this.resData.look_times = response.data.detail.look_times
        this.resData.looker = response.data.detail.looker
        this.resData.resource_url = response.data.detail.resource_url

        this.resData.talk = response.data.talk
        this.resData.ask = response.data.ask
        this.resData.imgUrl = response.data.resource_images
        this.data = response.side_list
        this.pagination.total = response.count
      })
      .catch(error => console.log(error, 'error')) // 失败的返回
  },
  methods: {
    handleSelect (key, keyPath) {
      console.log(key, keyPath, this.$route.query.id)
      getKeywordDetail({
        'id': this.$route.query.id,
        'page': 1,
        'size': 10,
        'resource_id': this.resource_id,
        'type_status': key
      })
        .then(response => {
          this.data = response.side_list
          this.type_status = key
          this.pagination.total = response.count
          console.log(response, 'success') // 成功的返回
        })
        .catch(error => console.log(error, 'error')) // 失败的返回
    },
    paginationCurrentChange (currentPage) {
      this.pagination.currentPage = currentPage
      this.fetchData(currentPage)
    },
    next () {
      getKeywordDetail({
        'id': this.$route.query.id,
        'resource_id': this.last,
        'page': 1,
        'size': 10,
        'type_status': 0
      })
        .then(response => {
          console.log(response, 'success') // 成功的返回
          this.id = this.$route.query.id
          this.last = response.last
          this.resData.pay_count = response.data.detail.pay_count
          this.resData.ask_amount = response.data.detail.ask_amount
          this.type_status = this.$route.query.type_status
          this.use_name = response.user_info.use_name
          this.user_image = process.env.VUE_APP_API + response.user_info.user_image
          this.resource_id = response.data.detail.id

          this.resData.title = response.data.detail.name
          this.resData.create_time = response.data.detail.create_time
          this.resData.show_count = response.data.detail.show_count
          this.resData.type_status_text = response.data.detail.type_status_text
          this.resData.map = response.data.detail.map

          this.resData.amount = response.data.detail.amount
          this.resData.count = response.data.detail.count
          this.resData.unit = response.data.detail.unit
          this.resData.business_choice = response.data.detail.business_choice
          this.resData.year = response.data.detail.year
          this.resData.gender = response.data.detail.gender
          // this.resData.map = response.data.detail.map

          this.resData.notes = response.data.detail.notes
          this.resData.times_price = response.data.detail.times_price
          this.resData.times_count = response.data.detail.times_count
          this.resData.last_count = response.data.detail.last_count
          this.resData.is_lock = response.data.detail.is_lock
          this.resData.show_price = response.data.detail.show_price
          this.resData.look_times = response.data.detail.look_times
          this.resData.looker = response.data.detail.looker
          this.resData.resource_url = response.data.detail.resource_url

          this.resData.talk = response.data.talk
          this.resData.ask = response.data.ask
          this.resData.imgUrl = response.data.resource_images
          this.data = response.side_list
          this.pagination.total = response.count
        })
        .catch(error => console.log(error, 'error')) // 失败的返回
    },
    fetchData (currentPage) {
      this.loading = true
      getKeywordDetail({
        'id': this.id,
        'page': currentPage,
        'size': 10,
        'type_status': this.type_status
      }).then(response => {
        console.log(response, '切页') // 成功的返回
        this.data = response.side_list
        this.pagination.total = response.count
        this.loading = false
      }).catch(err => {
        console.log('err', err)
        this.loading = false
      })
    },
    // 详情页内查看资源详情
    handleCustomEvent ({ index, row }) {
      console.log(index)
      console.log(row)
      console.log('哈哈', this.id, row.id)
      getKeywordDetail({
        'id': this.id,
        'page': 1,
        'size': 10,
        'resource_id': row.id,
        'type_status': this.type_status
      })
        .then(response => {
          console.log(response, 'success') // 成功的返回
          this.resData.pay_count = response.data.detail.pay_count
          this.resData.ask_amount = response.data.detail.ask_amount
          this.type_status = this.$route.query.type_status
          this.use_name = response.user_info.use_name
          this.user_image = process.env.VUE_APP_API + response.user_info.user_image
          this.resource_id = response.data.detail.id
          this.resData.title = response.data.detail.name
          this.resData.create_time = response.data.detail.create_time
          this.resData.show_count = response.data.detail.show_count
          this.resData.type_status_text = response.data.detail.type_status_text
          this.resData.map = response.data.detail.map

          this.resData.amount = response.data.detail.amount
          this.resData.count = response.data.detail.count
          this.resData.unit = response.data.detail.unit
          this.resData.business_choice = response.data.detail.business_choice
          this.resData.year = response.data.detail.year
          this.resData.gender = response.data.detail.gender
          // this.resData.map = response.data.detail.map

          this.resData.notes = response.data.detail.notes
          this.resData.times_price = response.data.detail.times_price
          this.resData.times_count = response.data.detail.times_count
          this.resData.last_count = response.data.detail.last_count
          this.resData.is_lock = response.data.detail.is_lock
          this.resData.show_price = response.data.detail.show_price
          this.resData.look_times = response.data.detail.look_times
          this.resData.looker = response.data.detail.looker
          this.resData.resource_url = response.data.detail.resource_url

          this.resData.talk = response.data.talk
          this.resData.ask = response.data.ask
          this.resData.imgUrl = response.data.resource_images
        })
        .catch(error => console.log(error, 'error')) // 失败的返回
    }
  }
}
</script>


<style>
.left {
  float: left;
}
.right {
  float: right;
}
.info {
  display: flex;
  justify-content: center;
  align-items: center;
}
.menu {
  display: flex;
  justify-content: center;
  align-items: center;
}
.round_icon {
  width: 100px;
  height: 100px;
  display: flex;
  border-radius: 50%;
  align-items: center;
  justify-content: center;
  overflow: hidden;
}
.img_list li {
  list-style-type: none;
  float: left;
}
</style>
