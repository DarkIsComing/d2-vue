<template>
  <d2-container>
      <el-container class="d2-mb">
        <el-header>
          <el-row :gutter="20">
            <el-col :xs="24" :sm="12" :md="12" :lg="6" :xl="6"><div class="grid-content bg-purple-light">本月新用户注册</div></el-col>
            <el-col :xs="24" :sm="12" :md="12" :lg="6" :xl="6"><div class="grid-content bg-purple-light">用户签到量</div></el-col>
            <el-col :xs="24" :sm="12" :md="12" :lg="6" :xl="6"><div class="grid-content bg-purple-light">签到瓜分金额</div></el-col>
            <el-col :xs="24" :sm="12" :md="12" :lg="6" :xl="6"><div class="grid-content bg-purple-light">转发有奖金额</div></el-col>
          </el-row>
        </el-header>
      <el-main>
        <template>
          <div>
            <d2-crud
              :columns="columns"
              :data="data"
              :options="options"
              :rowHandle="rowHandle"
              @row-remove="handleRowRemove"/>
          </div>
        </template>
      </el-main>
      <el-footer>底栏</el-footer>
    </el-container>
  </d2-container>
</template>

<script>
export default {
  name: 'user'
}
</script>
<style lang="scss" scoped>
.el-row {
  margin-bottom: 20px;
  &:last-child {
    margin-bottom: 0;
  }
}
.el-col {
  border-radius: 4px;
}
.bg-purple {
  background: #e5e9f2;
}
.grid-content {
  border-radius: 4px;
  min-height: 36px;
}
.el-header, .el-footer {
  background-color: #B3C0D1;
  color: #333;
  text-align: center;
  line-height: 60px;
}
.el-main {
  background-color: #E9EEF3;
  color: #333;
  text-align: center;
  line-height: 160px;
}
body > .el-container {
  margin-bottom: 40px;
}
</style>
