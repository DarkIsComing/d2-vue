<template>
  <d2-container>
    <d2-main>
      <h1>基本信息</h1>
      <el-divider></el-divider>
      <el-row>
        <el-col :span="6">
          <div class="grid-content bg-purple">姓名: {{name}}</div>
        </el-col>
        <el-col :span="6">
          <div class="grid-content bg-purple-light">身份证号: {{idcard}}</div>
        </el-col>
        <el-col :span="6">
          性别:
          <span class="grid-content bg-purple"
                v-if="gender==1"> 男</span>
          <span class="grid-content bg-purple"
                v-else-if="gender==0"> 女</span>
          <span class="grid-content bg-purple"
                v-else> 无</span>
        </el-col>
        <el-col :span="6">
          <div class="grid-content bg-purple-light">实名认证类别: {{type}}</div>
        </el-col>
      </el-row>
      <el-divider></el-divider>
      <h1>身份认证</h1>
      <el-divider></el-divider>
      <el-row>
        <el-col :span="6">
          <div class="grid-content bg-purple"><img :src="postive"
                 height="300"
                 width="300"></div>
          <div class="grid-content bg-purple">身份证正面</div>
        </el-col>
        <el-col :span="6">
          <div class="grid-content bg-purple-light"><img v-bind:src="negative"
                 height="300"
                 width="300"></div>
          <div class="grid-content bg-purple-light">身份证反面</div>
        </el-col>
        <el-col :span="6">
          <div class="grid-content bg-purple"><img :src="face"
                 height="300"
                 width="300"></div>
          <div class="grid-content bg-purple">人脸识别</div>
        </el-col>
        <el-col :span="6">
          <div class="grid-content bg-purple-light"><img :src="license"
                 height="300"
                 width="300"></div>
          <div class="grid-content bg-purple-light">营业执照</div>
        </el-col>
      </el-row>
      <br>
      <br>
      <br>
      <br>
      <el-button type="success"
                 style="display:block;margin:0 auto"
                 @click="commit">通过审核</el-button>
    </d2-main>

    <d2-footer>

    </d2-footer>
  </d2-container>
</template>

<script>
import { getIdcardDetail, postId } from '@api/name'
export default {
  data () {
    return {
      name: '',
      idcard: '',
      gender: '',
      type: '',
      postive: '',
      negative: '',
      face: '',
      license: ''
    }
  },
  methods: {
    commit () {
      postId({
        'id': this.$route.query.id
      }).then(response => {
        console.log(response, 'success') // 成功的返回
      }).catch(error => console.log(error, 'error')) // 失败的返回
    }
  },
  mounted: function () {
    console.info('id', this.$route.query.id)
    getIdcardDetail({
      'id': this.$route.query.id
    })
      .then(response => {
        this.name = response.data.name
        this.idcard = response.data.user_idcard
        this.gender = response.data.gender
        this.type = response.data.check_status
        this.postive = process.env.VUE_APP_API + response.data.user_idcard_up
        this.negative = process.env.VUE_APP_API + response.data.user_idcard_down
        this.face = process.env.VUE_APP_API + response.data.user_face
        this.license = process.env.VUE_APP_API + response.data.user_license
        console.log(response, 'success') // 成功的返回
      })
      .catch(error => console.log(error, 'error')) // 失败的返回
  }
}
</script>
