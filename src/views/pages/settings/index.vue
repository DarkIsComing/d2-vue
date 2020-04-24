<template>
  <d2-container>
    <template slot="header">header</template>
    <el-row :gutter="20"
            type="flex"
            justify="center">
      <el-col :span="8"
              :offset="6">
        <div class="grid-content">
          <p>邀请新客户注册奖励</p>
          <div>
            <span>资源</span>
            <input ref="searchInput"
                   v-model="inputVal"
                   type="text"
                   placeholder="搜索目的地"
                   maxlength="20" />
          </div>
        </div>
      </el-col>
      <el-col :span="8"
              :offset="6">
        <div class="grid-content">2</div>
      </el-col>
      <el-col :span="8"
              :offset="6">
        <div class="grid-content">3</div>
      </el-col>
    </el-row>
    <template slot="footer">footer</template>
  </d2-container>
</template>


<script>
export default {
  data () {
    return {
      inputVal: '',
      timeout: null
    }
  }
}
</script>
