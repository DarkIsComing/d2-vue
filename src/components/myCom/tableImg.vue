<template>
  <div class="imgs">
    <img :src="'http://10.168.1.136:8000'+imgs"
         alt="">
  </div>
</template>

<script>
export default {
  name: 'myImg',
  data () {
    return {
      image: {}
    }
  },
  props: {
    scope: {
      default: null
    }
  },
  computed: {
    imgs () {
      return this.scope.row.user_image
    }
  },
  mounted () {
    console.log(this.scope)
  }
}
</script>

<style>
.imgs {
  width: 100px;
}
.imgs img {
  width: 100%;
}
</style>
