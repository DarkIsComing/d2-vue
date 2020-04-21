

<template>
  <d2-container>
    <div style="height:100%;width:100%">
      <el-row :gutter="10"
              type="flex"
              class="row-bg"
              justify="center">
        <el-col :span="18">
          <div class="grid-content ">
            <ve-line :title="title1"
                     :data="chartData1"></ve-line>
          </div>
        </el-col>
        <el-col :span="6">
          <div class="grid-content ">
            <div class="block">
              <span class="demonstration">日期：</span>
              <el-date-picker v-model="value1"
                              type="date"
                              placeholder="选择日期">
              </el-date-picker>
            </div>
          </div>
        </el-col>
      </el-row>
      <br>
      <el-row :gutter="10"
              type="flex"
              class="row-bg"
              justify="center">
        <el-col :span="18">
          <div class="grid-content ">
            <div class="grid-content ">
              <ve-line :title="title2"
                       :data="chartData2"></ve-line>
            </div>
          </div>
        </el-col>
        <el-col :span="6">
          <div class="grid-content ">
            <div class="grid-content ">
              <div class="block">
                <span class="demonstration">日期：</span>
                <el-date-picker v-model="value2"
                                type="date"
                                placeholder="选择日期">
                </el-date-picker>
              </div>
            </div>
          </div>
        </el-col>
      </el-row>
      <br>
      <el-row :gutter="10"
              type="flex"
              class="row-bg"
              justify="center">
        <el-col :span="18">
          <div class="grid-content ">
            <div class="grid-content ">
              <div class="grid-content ">
                <ve-line :title="title3"
                         :data="chartData3"></ve-line>
              </div>
            </div>
          </div>
        </el-col>
        <el-col :span="6">
          <div class="grid-content ">
            <div class="grid-content ">
              <div class="block">
                <span class="demonstration">日期：</span>
                <el-date-picker v-model="value3"
                                type="date"
                                placeholder="选择日期">
                </el-date-picker>
              </div>
            </div>
          </div>
        </el-col>
      </el-row>
    </div>
  </d2-container>
</template>

<script>
import "echarts/lib/component/title";
export default {
  data: function () {
    return {
      value1: '',
      value2: '',
      value3: '',
      title1: {
        text: '订单交易量',
        textStyle: { color: 'darkgray' }
      },
      title2: {
        text: '转发有奖订单',
        textStyle: { color: 'darkgray' }
      },
      title3: {
        text: '保密资源订单',
        textStyle: { color: 'darkgray' }
      },
      chartData1: {
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
      },
      chartData3: {
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

