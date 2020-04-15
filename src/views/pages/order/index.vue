<template>
  <d2-container>

    <el-container class="d2-mb">
      <el-header>资源信息</el-header>
      <el-main>
        <div>
          <el-row :gutter="20">
            <el-col :span="6"><div class="grid-content bg-purple"></div></el-col>
            <el-col :span="6"><div class="grid-content bg-purple"></div></el-col>
            <el-col :span="6"><div class="grid-content bg-purple"></div></el-col>
            <el-col :span="6"><div class="grid-content bg-purple"></div></el-col>
          </el-row>
        </div>
        </el-main>
    </el-container>

    <el-container class="d2-mb">
      <el-header>资源发布量</el-header>
      <el-main>
        <ve-line :data="chartData" :settings="chartSettings"></ve-line>
      </el-main>
       <el-header>资源访问量</el-header>
       <el-container class="d2-mb">
      <el-aside width="1000px">
        <ve-histogram :data="chartData2"></ve-histogram>
      </el-aside>
      <el-container class="d2-mb">
      <el-main>
        <ve-histogram :data="chartData2"></ve-histogram>
      </el-main>
      <el-footer>
        <ve-histogram :data="chartData2"></ve-histogram>
      </el-footer>
      </el-container>
      </el-container>
    </el-container>

    <el-container  width="200px" class="d2-mb">
      <el-header>顶栏</el-header>
      <el-container>
        <el-aside width="200px">侧边栏</el-aside>
        <el-main>
          <el-table :data="tableData">
            <el-table-column prop="date" label="日期" width="140">
            </el-table-column>
            <el-table-column prop="name" label="姓名" width="120">
            </el-table-column>
            <el-table-column prop="address" label="地址">
            </el-table-column>
          </el-table>
        </el-main>
      </el-container>
    </el-container>

    <el-container class="d2-mb">
      <el-header>顶栏</el-header>
      <el-container>
        <el-aside width="200px">侧边栏</el-aside>
        <el-container>
          <el-main>主体</el-main>
          <el-footer>底栏</el-footer>
        </el-container>
      </el-container>
    </el-container>

    <el-container class="d2-mb">
      <el-aside width="200px">侧边栏</el-aside>
      <el-container>
        <el-header>顶栏</el-header>
        <el-main>主体</el-main>
      </el-container>
    </el-container>

  </d2-container>
</template>

<script>
export default {
  data () {
     this.chartSettings = {
        metrics: ['访问用户', '下单用户'],
        dimension: ['日期']
      }
    return {
      filename: __filename,
      chartData: {
          columns: ['日期', '访问用户', '下单用户', '下单率'],
          rows: [
            { '日期': '1/1', '访问用户': 1393, '下单用户': 1093, '下单率': 0.32 },
            { '日期': '1/2', '访问用户': 3530, '下单用户': 3230, '下单率': 0.26 },
            { '日期': '1/3', '访问用户': 2923, '下单用户': 2623, '下单率': 0.76 },
            { '日期': '1/4', '访问用户': 1723, '下单用户': 1423, '下单率': 0.49 },
            { '日期': '1/5', '访问用户': 3792, '下单用户': 3492, '下单率': 0.323 },
            { '日期': '1/6', '访问用户': 4593, '下单用户': 4293, '下单率': 0.78 }
          ]
        },
      chartData2: {
          columns: ['日期', '访问用户', '下单用户', '下单率'],
          rows: [
            { '日期': '1/1', '访问用户': 1393, '下单用户': 1093, '下单率': 0.32 },
            { '日期': '1/2', '访问用户': 3530, '下单用户': 3230, '下单率': 0.26 },
            { '日期': '1/3', '访问用户': 2923, '下单用户': 2623, '下单率': 0.76 },
            { '日期': '1/4', '访问用户': 1723, '下单用户': 1423, '下单率': 0.49 },
            { '日期': '1/5', '访问用户': 3792, '下单用户': 3492, '下单率': 0.323 },
            { '日期': '1/6', '访问用户': 4593, '下单用户': 4293, '下单率': 0.78 }
          ]
        }
    }
  }
}
</script>

<style lang="scss" scoped>
.el-header, .el-footer {
  background-color: #B3C0D1;
  color: #333;
  text-align: center;
  line-height: 60px;
}
.el-aside {
  background-color: #D3DCE6;
  color: #333;
  text-align: center;
  line-height: 500px;
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
.el-container:nth-child(5) .el-aside,
.el-container:nth-child(6) .el-aside {
  line-height: 520px;
}
.el-container:nth-child(7) .el-aside {
  line-height: 640px;
}
  .el-row {
    margin-bottom: 20px;
    &:last-child {
      margin-bottom: 0;
    }
  }
  .el-col {
    border-radius: 10px;
  }
  .bg-purple-dark {
    background: #99a9bf;
  }
  .bg-purple {
    background: #d3dce6;
  }
  .bg-purple-light {
    background: #e5e9f2;
  }
  .grid-content {
    border-radius: 4px;
    min-height: 36px;
  }
  .row-bg {
    padding: 10px 0;
    background-color: #f9fafc;
  }
</style>
