<template>
  <div id="app">
    <el-table :data="users"
              stripe
              style="width:100%"
              align="center">
      <el-table-column prop="name"
                       label="姓名"
                       width="180"
                       align="center"></el-table-column>
      <el-table-column prop="age"
                       label="年龄"
                       width="180"
                       align="center"></el-table-column>
      <el-table-column prop="birthday"
                       label="出生日期"
                       width="180"
                       align="center"></el-table-column>
      <el-table-column prop="city"
                       label="地址"
                       width="180"
                       align="center"></el-table-column>
    </el-table>
  </div>
</template>

<script>
import axios from 'axios' // vue2.x的引入axios进行前后端交互
export default {
  name: 'HelloWorld',
  data () {
    return {
      users: []
    }
  },
  mounted: function () {
    axios.get('/api/test').then(res => {
      console.log(res)
      this.users = res.data.user
    })
  }
}

</script>
