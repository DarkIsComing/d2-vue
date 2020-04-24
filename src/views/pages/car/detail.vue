
<template>
  <d2-container type="card">
    <div style="height: 800px; margin: -16px;">
      <SplitPane :min-percent='20'
                 :default-percent='30'
                 split="vertical">
        <template slot="paneL">
          <div style="margin: 10px;">
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
                <el-menu-item index="1">人找车信息</el-menu-item>
                <el-menu-item index="0">车找人信息</el-menu-item>
                <el-menu-item index="2">我的预约</el-menu-item>
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
          <SplitPane :default-percent='20'
                     split="horizontal">
            <template slot="paneL">

              <div class='up'>
                <h3>{{title}}</h3>
                <el-row style="color:#999">
                  <el-col :span="6">{{create_time}}</el-col>
                  <el-col :span="6">{{show_count}}</el-col>
                  <el-col :span="6">0</el-col>
                  <el-col :span="6">{{business_choice}}</el-col>
                </el-row>
              </div>

            </template>
            <template slot="paneR">
            </template>

          </SplitPane>
        </template>
      </SplitPane>
    </div>
  </d2-container>
</template>


<script>
import { getCarDetail } from '@api/car'
export default {
  data () {
    return {
      // 左边
      use_name: '',
      user_image: '',
      // 右边1
      title: '',
      create_time: '',
      type_status_text: '',
      show_count: '',

      // 右边2
      amount: '',
      count: '',
      unit: '',
      business_choice: '',
      year: '',
      gender: '',
      map: '',


      columns: [
        {
          title: '终点',
          key: 'end_area',
          width: '180'

        },
        {
          title: '途径',
          key: 'middle_area',
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
        pageSize: 20,
        total: 0
      }
    }
  },
  mounted: function () {
    console.info('id', this.$route.query.id)
    getCarDetail({
      'id': this.$route.query.id,
      'page': 1,
      'size': 10,
      'status': this.$route.query.status
    })
      .then(response => {
        console.log(response, 'success') // 成功的返回

        this.use_name = response.data.use_name
        this.user_image = process.env.VUE_APP_API + response.data.car_image

        this.create_time = response.data.detail.create_time
        this.show_count = response.data.detail.show_count
        this.type_status_text = response.data.detail.type_status_text

        this.amount = response.data.detail.amount
        this.count = response.data.detail.count
        this.unit = response.data.detail.unit
        this.business_choice = response.data.detail.business_choice
        this.year = response.data.detail.year
        this.gender = response.data.detail.gender
        this.map = response.data.detail.map

        // this.imgUrl = response.data.resource_images
        this.data = response.side_list
        this.pagination.total = response.count
      })
      .catch(error => console.log(error, 'error')) // 失败的返回
  },
  methods: {
    handleSelect (key, keyPath) {
      console.log(key, keyPath, this.$route.query.id)
      getCarDetail({
        'id': this.$route.query.id,
        'page': 1,
        'size': 10,
        'status': key
      })
        .then(response => {
          this.data = response.side_list
          this.type_status = key
          this.pagination.total = response.count
          console.log(response, 'success') // 成功的返回
        })
        .catch(error => console.log(error, 'error')) // 失败的返回
    },
    // 详情页内查看资源详情
    handleCustomEvent ({ index, row }) {
      console.log(index)
      console.log(row)
      getCarDetail({
        'id': row.id,
        'page': 1,
        'size': 10,
        'status': this.type_status
      })
        .then(response => {
          console.log(response, 'success') // 成功的返回
        })
        .catch(error => console.log(error, 'error')) // 失败的返回
    },
    getIndex (imgUrl) {
      console.log('getINDex:', imgUrl)
      this.ImgUrl = imgUrl
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
.title_left {
  display: flex;
  align-items: center;
}
.title_right {
  display: flex;
  align-items: center;
}
.title_item {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  margin-right: 20px;
}
.title_text {
  height: 21px;
  font-size: 16px;
  color: #333;
  margin-bottom: 10px;
}
.title_lable {
  font-size: 14px;
  color: #666;
}
.up {
  margin-left: 20px;
  margin-top: 50px;
}
.notes {
  height: 100%;
  overflow: auto;
  color: rgb(107, 97, 97);
}
</style>
