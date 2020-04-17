<template>
  <div class="tabZujian">

    <el-tabs v-model="activeName"
             @tab-click="handleClick">
      <el-tab-pane label="待提现记录"
                   name="first"
                   :key="'first'">
        <child1 v-if="isChildUpdate1"></child1>
      </el-tab-pane>

      <el-tab-pane label="已提现历史"
                   name="second"
                   :key="'second'">
        <child2 v-if="isChildUpdate2"></child2>
      </el-tab-pane>
    </el-tabs>

  </div>
</template>

<script>
import uncash from '@/views/pages/cash/uncash'
import cashed from '@/views/pages/cash/cashed'

export default {
  name: 'tabZujian',
  components: {
    child1: uncash,
    child2: cashed
  },
  data () {
    return {
      // 默认第一个选项卡
      activeName: 'first',
      isChildUpdate1: true,
      isChildUpdate2: false
    }
  },
  mounted () {

  },
  methods: {
    handleClick (tab) {
      if (tab.name === 'first') {
        this.isChildUpdate1 = true
        this.isChildUpdate2 = false
      } else if (tab.name === 'second') {
        this.isChildUpdate1 = false
        this.isChildUpdate2 = true
      }
    }
  }
}
</script>
