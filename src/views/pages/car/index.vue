<template>
  <div class="tabZujian">

    <el-tabs v-model="activeName"
             @tab-click="handleClick">
      <el-tab-pane label="车找人系统"
                   name="first"
                   :key="'first'">
        <child1 v-if="isChildUpdate1"></child1>
      </el-tab-pane>

      <el-tab-pane label="人找车系统"
                   name="second"
                   :key="'second'">
        <child2 v-if="isChildUpdate2"></child2>
      </el-tab-pane>
    </el-tabs>

  </div>
</template>

<script>
import car from '@/views/pages/car/car'
import person from '@/views/pages/car/person'

export default {
  name: 'tabZujian',
  components: {
    child1: car,
    child2: person
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
