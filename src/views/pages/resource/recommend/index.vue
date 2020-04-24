<template>
  <div class="tabZujian">

    <el-tabs v-model="activeName"
             @tab-click="handleClick">
      <el-tab-pane label="已推荐资源"
                   name="first"
                   :key="'first'">
        <child1 v-if="isChildUpdate1"></child1>
      </el-tab-pane>

      <el-tab-pane label="最新资源"
                   name="second"
                   :key="'second'">
        <child2 v-if="isChildUpdate2"></child2>
      </el-tab-pane>
      <el-tab-pane label="高浏览量"
                   name="third"
                   :key="'third'">
        <child3 v-if="isChildUpdate3"></child3>
      </el-tab-pane>

      <el-tab-pane label="高转发量"
                   name="fourth"
                   :key="'fourth'">
        <child4 v-if="isChildUpdate4"></child4>
      </el-tab-pane>
    </el-tabs>

  </div>
</template>

<script>
import suggest from '@/views/pages/resource/recommend/suggest'
import news from '@/views/pages/resource/recommend/news'
import view from '@/views/pages/resource/recommend/view'
import transmit from '@/views/pages/resource/recommend/transmit'

export default {
  name: 'tabZujian',
  components: {
    child1: suggest,
    child2: news,
    child3: view,
    child4: transmit
  },
  data () {
    return {
      // 默认第一个选项卡
      activeName: 'first',
      isChildUpdate1: true,
      isChildUpdate2: false,
      isChildUpdate3: false,
      isChildUpdate4: false
    }
  },
  mounted () {

  },
  methods: {
    handleClick (tab) {
      if (tab.name === 'first') {
        this.isChildUpdate1 = true
        this.isChildUpdate2 = false
        this.isChildUpdate3 = false
        this.isChildUpdate4 = false
      } else if (tab.name === 'second') {
        this.isChildUpdate1 = false
        this.isChildUpdate2 = true
        this.isChildUpdate3 = false
        this.isChildUpdate4 = false
      } else if (tab.name === 'third') {
        this.isChildUpdate1 = false
        this.isChildUpdate2 = false
        this.isChildUpdate3 = true
        this.isChildUpdate4 = false
      } else if (tab.name === 'fourth') {
        this.isChildUpdate1 = false
        this.isChildUpdate2 = false
        this.isChildUpdate3 = false
        this.isChildUpdate4 = true
      }
    }
  }
}
</script>
