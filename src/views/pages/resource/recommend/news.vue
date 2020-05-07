<template>
  <div class="child2">
    <div class="head_nav">
      <el-button slot="header"
                 type="primary"
                 style="margin-bottom: 5px"
                 @click="exportExcel">导出</el-button>

      <el-button slot="header"
                 type="danger"
                 style="margin-bottom: 5px"
                 @click="stops">刪除</el-button>
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
                style="margin-bottom: 5px; width: 500px;"
                v-model="name"
                placeholder="请输入用户昵称">
      </el-input>

      <span class="demonstration">资源定位</span>
      <el-cascader v-model="resource"
                   :options="Resource"
                   :props="{ expandTrigger: 'hover' }"
                   @change="handleChange"></el-cascader>
      <span class="demonstration"
            slot="header"
            style="margin-bottom: 5px">资源城市</span>
      <el-input slot="header"
                style="margin-bottom: 5px; width: 500px;"
                v-model="city"
                placeholder="请输入资源城市">
      </el-input>
      <el-button slot="header"
                 style="margin-bottom: 5px; margin-left: 15px;"
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
             @custom-emit-1="viewDetail"
             @custom-emit-2="open_recommend"
             :pagination="pagination"
             @pagination-current-change="paginationCurrentChange"
             :options="options">

    </d2-crud>
    <el-dialog title="推荐"
               :visible.sync="dialogFormVisible">
      <span> 电脑端投放</span>
      <div class='time'>
        <span>起始时间</span>
        <el-date-picker v-model="pc_start_time"
                        value-format="yyyy-MM-dd"
                        type="datetime"
                        placeholder="选择日期时间">
        </el-date-picker>
      </div>
      <div class='time'>
        <span>结束时间</span>
        <el-date-picker v-model="pc_end_time"
                        value-format="yyyy-MM-dd"
                        type="datetime"
                        placeholder="选择日期时间">
        </el-date-picker>
        <el-switch v-model="pc_top_show"
                   active-text="置顶"
                   inactive-text="不置顶">
        </el-switch>
      </div>

      <span> 手机端投放</span>
      <div class='time'>
        <span>起始时间</span>
        <el-date-picker v-model="phone_start_time"
                        value-format="yyyy-MM-dd"
                        type="datetime"
                        placeholder="选择日期时间">
        </el-date-picker>
      </div>
      <div class='time'>
        <span>结束时间</span>
        <el-date-picker v-model="phone_end_time"
                        value-format="yyyy-MM-dd"
                        type="datetime"
                        placeholder="选择日期时间">
        </el-date-picker>
        <el-switch v-model="phone_top_show"
                   active-text="置顶"
                   inactive-text="不置顶">
        </el-switch>
      </div>

      <span>显示地区</span>
      <el-select v-model="map"
                 placeholder="请选择">
        <el-option v-for="item in mapOptions"
                   :key="item.value"
                   :label="item.label"
                   :value="item.value">
        </el-option>
      </el-select>

      <div slot="footer"
           class="dialog-footer">
        <el-button @click="quit">取 消</el-button>
        <el-button type="primary"
                   @click="recommend">确 定</el-button>
      </div>
    </el-dialog>
    <myImg></myImg>
  </div>
</template>

<script>
import { getResourceRecommendList, stopUse, Recommend } from '@api/resourceList'
import myImg from '../../../../components/myCom/tableImg'
export default {
  components: {
    myImg
  },
  data () {
    return {
      select_list: [],
      dialogFormVisible: false,
      currentId: '',
      map: '',
      mapOptions: [{
        value: '0',
        label: '本地城市'
      }, {
        value: '1',
        label: '外地城市'
      }],
      phone_top_show: false,
      pc_top_show: false,
      phone_start_time: '',
      phone_end_time: '',
      pc_start_time: '',
      pc_end_time: '',
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
      loading: true,
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
      resource: [],
      Resource: [{
        value: '0',
        label: '注册公司',
        children: [
          {
            value: '3',
            label: '行业信息'
          }, {
            value: '0',
            label: '我提供注册'
          }, {
            value: '1',
            label: '我需要注册'
          }, {
            value: '4',
            label: '提供付费咨询'
          }, {
            value: '5',
            label: '愿意付费咨询'
          }
        ]
      },
      {
        value: '1',
        label: '财政纳税',
        children: [
          {
            value: '3',
            label: '财政信息'
          }, {
            value: '0',
            label: '提供纳税服务'
          }, {
            value: '1',
            label: '需要纳税服务'
          }, {
            value: '4',
            label: '提供付费咨询'
          }, {
            value: '5',
            label: '愿意付费咨询'
          }]
      },
      {
        value: '2',
        label: '法律咨询',
        children: [
          {
            value: '3',
            label: '法律信息'
          }, {
            value: '0',
            label: '提供法律咨询'
          }, {
            value: '1',
            label: '需要法律咨询'
          }, {
            value: '4',
            label: '提供付费咨询'
          }, {
            value: '5',
            label: '愿意付费咨询'
          }]
      },
      {
        value: '3',
        label: '职业规划',
        children: [
          {
            value: '3',
            label: '职场信息'
          }, {
            value: '0',
            label: '提供职业规划'
          }, {
            value: '1',
            label: '需要职业规划'
          }, {
            value: '4',
            label: '提供付费咨询'
          }, {
            value: '5',
            label: '愿意付费咨询'
          }]
      },
      {
        value: '4',
        label: '人才服务',
        children: [
          {
            value: '3',
            label: '人才信息'
          }, {
            value: '0',
            label: '公司找人'
          }, {
            value: '1',
            label: '人找公司'
          }]
      },
      {
        value: '5',
        label: '政策解读',
        children: [
          {
            value: '3',
            label: '政策新闻'
          }, {
            value: '0',
            label: '提供政策解读'
          }, {
            value: '1',
            label: '需要政策解读'
          }, {
            value: '4',
            label: '提供付费咨询'
          }, {
            value: '5',
            label: '愿意付费咨询'
          }]
      },
      {
        value: '6',
        label: '兼职零工',
        children: [
          {
            value: '1',
            label: '个人找兼职'
          }, {
            value: '0',
            label: '公司找零时工'
          }]
      },
      {
        value: '7',
        label: '共享资源',
        children: [
          {
            value: '3',
            label: '我分享'
          }, {
            value: '0',
            label: '我提供'
          }, {
            value: '1',
            label: '我需要'
          }, {
            value: '2',
            label: '我悬赏'
          }]
      }
      ],
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
      ItemOptions: [{
        value: '0',
        label: '注册公司'
      }, {
        value: '1',
        label: '财政纳税'
      }, {
        value: '2',
        label: '法律咨询'
      }, {
        value: '3',
        label: '职业规划'
      }, {
        value: '4',
        label: '人才服务'
      }, {
        value: '5',
        label: '政策解读'
      }, {
        value: '6',
        label: '兼职零工'
      }, {
        value: '7',
        label: '共享资源'
      }],
      job: '',
      status: '',
      type_status: '',
      city: '',
      name: '',
      // 自定义操作列
      rowHandle: {
        custom: [
          {
            text: '查看详情',
            type: 'Success',
            size: 'small',
            emit: 'custom-emit-1'
          },
          {
            text: '推荐',
            size: 'small',
            fixed: 'right',
            emit: 'custom-emit-2'
          }
        ]
      },
      value1: '',
      sels: []
    }
  },
  methods: {
    handleChange (value) {
      console.log(value[0], value[1], this.resource)
      this.status = value[1]
      this.type_status = value[0]
    },
    quit () {
      this.dialogFormVisible = false
    },
    open_recommend ({ index, row }) {
      this.dialogFormVisible = true
      this.currentId = row.id
    },
    recommend () {
      this.dialogFormVisible = false
      console.log(this.pc_start_time, this.pc_end_time, this.phone_start_time, this.phone_end_time, this.pc_top_show, this.phone_top_show)
      Recommend({
        'pc_start_time': this.pc_start_time,
        'pc_end_time': this.pc_end_time,
        'phone_start_time': this.phone_start_time,
        'phone_end_time': this.phone_end_time,
        'pc_top_show': this.pc_top_show,
        'phone_top_show': this.phone_top_show,
        'map': this.map,
        'id': this.currentId
      })
        .then(response => {
          console.log(response, 'success') // 成功的返回
        })
        .catch(error => console.log(error, 'error')) // 失败的返回
    },
    handleSelectionChange (selection) {
      console.log('选择', selection)
      this.sels = selection
    },
    viewDetail ({ index, row }) {
      this.$router.push({ name: 'resourceDetail', query: { 'id': row.id } })
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
          setTimeout(() => {
            stopUse({
              'id': ids
            })
              .then(response => {
                this.$message({
                  message: '删除成功',
                  type: 'success'
                })
                getResourceRecommendList({
                  'create_time': '',
                  'map': '',
                  'status': '',
                  'item': '',
                  'page': 1,
                  'size': 20,
                  'type_status': '',
                  'recommand_status': 1
                }).then(response => {
                  this.data = response.data
                  this.pagination.total = response.count
                  this.loading = false
                }).catch(err => {
                  console.log('err', err)
                  this.loading = false
                })
                console.log(response, 'success') // 成功的返回
              })
              .catch(error => console.log(error, 'error')) // 失败的返回
          }, 300)
        })
        .catch(() => { })
    },
    paginationCurrentChange (currentPage) {
      this.pagination.currentPage = currentPage
      this.fetchData(currentPage)
    },
    fetchData (currentPage) {
      this.loading = true
      getResourceRecommendList({
        'create_time': this.value1,
        'map': this.city,
        'status': this.status,
        'item': this.name,
        'page': currentPage,
        'size': 20,
        'type_status': this.type_status,
        'recommand_status': 1
      }).then(response => {
        console.log(response, 'success') // 成功的返回
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
    query (item) {
      console.log(this.value1, this.city, this.status, this.name)
      getResourceRecommendList({
        'create_time': this.value1,
        'item': this.name,
        'map': this.city,
        'status': this.status,
        'page': 1,
        'size': 20,
        'type_status': this.type_status,
        'recommand_status': 1
      })
        .then(response => {
          this.data = response.data
          this.loading = false
          this.pagination.total = response.count
          console.log(response, 'success') // 成功的返回
        })
        .catch(error => console.log(error, 'error')) // 失败的返回
    },
    // 重置
    reset () {
      this.loading = true
      this.value1 = ''
      this.city = ''
      this.resource = ''
      this.status = ''
      this.type_status = ''
      this.name = ''
      getResourceRecommendList({
        'create_time': '',
        'map': '',
        'status': '',
        'item': '',
        'page': 1,
        'size': 20,
        'type_status': '',
        'recommand_status': 1
      })
        .then(response => {
          this.loading = false
          this.data = response.data
          this.pagination.total = response.count
          console.log(response, 'success') // 成功的返回
        })
        .catch(error => console.log(error, 'error')) // 失败的返回
    }
  },

  mounted: function () {
    getResourceRecommendList({
      'create_time': '',
      'map': '',
      'status': '',
      'item': '',
      'page': 1,
      'size': 20,
      'type_status': '',
      'recommand_status': 1
    })
      .then(response => {
        this.loading = false
        this.data = response.data
        this.pagination.total = response.count
        console.log(response, 'success') // 成功的返回
      })
      .catch(error => console.log(error, 'error')) // 失败的返回
  }
}
</script>

<style>
.time {
  display: flex;
}
.head_nav {
  width: 100%;
  display: flex;
  align-items: center;
}
.demonstration {
  background: none !important;
  width: 200px !important;
}
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
