
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
          <SplitPane :default-percent='30'
                     split="horizontal">
            <template slot="paneL">
              <SplitPane :default-percent='40'
                         split="horizontal">
                <template slot="paneL">
                  <div style="margin: 20px;"
                       class='up'>

                    <div style="float: left;"> <span>到</span>
                      <h3>{{end_area}} </h3><span>途径</span>
                      <h3>{{middle_area}}</h3>
                    </div>
                    <el-row style="color:#999">
                      <el-col :span="6">{{create_time}}</el-col>
                      <el-col :span="6">{{look_count}}</el-col>
                      <el-col :span="6">{{car_type_text}}</el-col>
                    </el-row>
                  </div>
                </template>
                <template slot="paneR">
                  <div style="margin: 10px;">
                    <div class='left'>

                      <div class="title_left">
                        <div class="title_item">
                          <div class="title_text">{{count}}</div>
                          <div class="title_lable">可载人数</div>
                        </div>
                        <div class="title_item">
                          <div class="title_text">{{order_count}}</div>
                          <div class="title_lable">沟通人数</div>
                        </div>
                        <div class="title_item">
                          <div class="title_text">{{car_number}} {{car_model}}</div>
                          <div class="title_lable">车牌号</div>
                        </div>
                        <div class="title_item">
                          <div class="title_text">{{pay_status}}</div>
                          <div class="title_lable">是否收费</div>
                        </div>
                      </div>
                    </div>
                    <div class='right'>
                      <el-row>
                        {{map}}
                      </el-row>
                      <el-row>
                        {{create_time}}
                      </el-row>
                    </div>
                  </div>
                </template>
              </SplitPane>
            </template>
            <template slot="paneR">
              <div style="height:100%;overflow:auto"
                   class='notes'
                   v-html="notes">
              </div>
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
      type_status: '',
      title: '',
      create_time: '',
      car_type_text: '',
      look_count: '',
      order_count: '',
      // 右边2
      middle_area: '',
      end_area: '',
      pay_status: '',
      notes: '',
      count: '',
      car_number: '',
      car_model: '',
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

        this.end_area = response.data.end_area
        this.middle_area = response.data.middle_area
        this.create_time = response.data.create_time
        this.look_count = response.data.look_count
        this.car_type_text = response.data.car_type_text

        this.order_count = response.data.order_count
        this.count = response.data.count
        this.pay_status = response.data.pay_status
        this.car_model = response.data.car_model
        this.notes = response.data.notes
        this.car_number = response.data.car_number
        this.map = response.data.map

        // this.imgUrl = response.data.resource_images
        this.data = response.side_list
        this.pagination.total = response.side_count
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
          this.pagination.total = response.side_count
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
          this.end_area = response.data.end_area
          this.middle_area = response.data.middle_area
          this.create_time = response.data.create_time
          this.look_count = response.data.look_count
          this.car_type_text = response.data.car_type_text

          this.order_count = response.data.order_count
          this.count = response.data.count
          this.pay_status = response.data.pay_status
          this.car_model = response.data.car_model
          this.notes = response.data.notes
          this.car_number = response.data.car_number
          this.map = response.data.map
          console.log(response, 'success') // 成功的返回
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
