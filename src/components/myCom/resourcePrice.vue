<template slot="paneR">
  <SplitPane :default-percent='30'
             split="horizontal">
    <template slot="paneL">
      <SplitPane :default-percent='40'
                 split="horizontal">
        <template slot="paneL">
          <div style="margin: 20px;"
               class='up'>
            <h3>{{resData.title}}</h3>
            <el-row style="color:#999">
              <el-col :span="6">{{resData.create_time}}</el-col>
              <el-col :span="6">{{resData.show_count}}</el-col>
              <el-col :span="6">0</el-col>
              <el-col :span="6">{{resData.type_status_text}}</el-col>
            </el-row>
          </div>
        </template>
        <template slot="paneR">
          <div style="margin: 10px;">
            <div class='left'>
              <!-- <el-row :gutter="20">
                <el-col :span="4">{{resData.amount}}</el-col>
                <el-col :span="4">{{resData.count}}{{resData.unit}}</el-col>
                <el-col :span="4">{{resData.business_choice}}</el-col>
                <el-col :span="4">{{resData.year}}</el-col>
                <el-col :span="4">{{resData.gender}}</el-col>
              </el-row>
              <el-row :gutter="20">
                <el-col :span="
                              4">单价</el-col>
                <el-col :span="4">余量</el-col>
                <el-col :span="4">交易方式</el-col>
                <el-col :span="4">经验</el-col>
                <el-col :span="4">性别</el-col>
              </el-row> -->
              <div class="title_left">
                <div class="title_item">
                  <div class="title_text">{{resData.amount}}</div>
                  <div class="title_lable">单价</div>
                </div>
                <div class="title_item">
                  <div class="title_text">{{resData.count}}{{resData.unit}}</div>
                  <div class="title_lable">余量</div>
                </div>
                <div class="title_item">
                  <div class="title_text">{{resData.business_choice}}</div>
                  <div class="title_lable">交易方式</div>
                </div>
                <div class="title_item">
                  <div class="title_text">{{resData.year}}</div>
                  <div class="title_lable">经验</div>
                </div>
                <div class="title_item">
                  <div class="title_text">{{resData.gender}}</div>
                  <div class="title_lable">性别</div>
                </div>
              </div>
            </div>
            <div class='right'>
              <el-row>
                {{resData.map}}
              </el-row>
              <el-row>
                {{resData.create_time}}
              </el-row>
            </div>
          </div>
        </template>
      </SplitPane>
    </template>
    <template slot="paneR">
      <div style="margin: 50px;">
        <div class='left'
             v-if="resData.imgUrl.length === 0">
        </div>
        <div class='left'
             v-else>
          <div class="goodDetails_name_img">
            <div style="width: 300px;height: 300px">
              <img :src="resData.ImgUrl"
                   style="width: 100%;height: 100%">
            </div>
            <div class="little_img">
              <ul v-for="(img,index) in resData.imgUrl"
                  :key="index"
                  class="img_list">
                <li @click='getIndex(img.url)'>
                  <img :src="img.url"
                       style="width: 50px; height: 50px">
                </li>
              </ul>
            </div>
          </div>
        </div>

      </div>

      <div class='right'>
        <el-row type="flex">
          <div class='notes'
               v-html="resData.notes">
          </div>
        </el-row>
        <el-row>
          <el-col :span="12">
            <span v-if="resData.times_price === null">转发有奖：非转发有奖资源</span>
            <span v-else> 转发有奖：¥{{resData.times_price}} 已转发{{resData.times_count}}次 余量{{resData.last_count}}</span>
          </el-col>
          <el-col :span="12">
            <span v-if="resData.is_lock=false">保密设置：¥{{resData.show_price}}, {{resData.look_times}}人已查看</span>
            <span v-else>保密设置：否</span>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="12">
            <span>在线沟通：0人 </span>
          </el-col>
          <el-col :span="12">
            <span>谁可以看：{{resData.looker}} </span>
          </el-col>
        </el-row>
        <el-row>
          <span v-if="resData.resource_url === null">链接地址：无</span>
          <span v-else>链接地址：{{resData.resource_url}} </span>
        </el-row>
      </div>

    </template>

  </SplitPane>
</template>

<script>
export default {
  data () {
    return {

    }
  },
  props: {
    resData: {
      type: Object
    }
  },
  methods: {
    getIndex (imgUrl) {
      console.log('getINDex:', imgUrl)
      this.ImgUrl = imgUrl
    }
  },
  mounted () {
    console.log(45456)
    console.log(this.resData)
  }
}
</script>
<style scoped>
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
.notes {
  height: 100%;
  overflow: auto;
  color: rgb(107, 97, 97);
}
</style>
