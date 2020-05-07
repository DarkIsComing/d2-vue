// Vue
import Vue from 'vue'
import VCharts from 'v-charts'
import i18n from './i18n'
import App from './App'
// 核心插件
import d2Admin from '@/plugin/d2admin'
// store
import store from '@/store/index'

// D2CRUD
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import D2Crud from '@d2-projects/d2-crud'
import pluginExport from '@d2-projects/vue-table-export'
import SplitPane from 'vue-splitpane'
import ECharts from 'vue-echarts'
import VueQuillEditor from 'vue-quill-editor'
// 菜单和路由设置
import router from './router'
import menuHeader from '@/menu/header'
import menuAside from '@/menu/aside'
import { frameInRoutes } from '@/router/routes'

import 'quill/dist/quill.core.css'
import 'quill/dist/quill.snow.css'
import 'quill/dist/quill.bubble.css'


import axios from 'axios'

axios.defaults.withCredentials = true // 让ajax携带cookie

Vue.prototype.$http = axios

axios.defaults.baseURL = 'http://192.168.1.143:8000' // 初始化基础地址
axios.defaults.withCredentials = true
// axios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded'
// axios.defaults.headers.common['Access-Control-Allow-Credentials'] = true
// axios.defaults.headers.common['Access-Control-Allow-Origin'] = 'http://192.168.1.143:8000'
// axios.defaults.headers.common['Access-Control-Allow-Headers'] = 'X-PINGOTHER, Content-Type'
// axios.defaults.headers.common['Access-Control-Expose-Headers'] = 'Access-Token, Uid'
// axios.defaults.headers.common['Access-Control-Allow-Methods'] = 'POST, GET, OPTIONS'
// 核心插件
Vue.use(d2Admin)
Vue.use(VCharts)
Vue.use(ElementUI)
Vue.use(D2Crud)
Vue.use(pluginExport)
Vue.component('SplitPane', SplitPane)
Vue.component('chart', ECharts)
Vue.use(VueQuillEditor /* { default global options } */)
new Vue({
  router,
  store,
  i18n,
  render: h => h(App),
  created () {
    // 处理路由 得到每一级的路由设置
    this.$store.commit('d2admin/page/init', frameInRoutes)
    // 设置顶栏菜单
    this.$store.commit('d2admin/menu/headerSet', menuHeader)
    // 设置侧边栏菜单
    this.$store.commit('d2admin/menu/asideSet', menuAside)
    // 初始化菜单搜索功能
    this.$store.commit('d2admin/search/init', menuHeader)
  },
  mounted () {
    // 展示系统信息
    this.$store.commit('d2admin/releases/versionShow')
    // 用户登录后从数据库加载一系列的设置
    this.$store.dispatch('d2admin/account/load')
    // 获取并记录用户 UA
    this.$store.commit('d2admin/ua/get')
    // 初始化全屏监听
    this.$store.dispatch('d2admin/fullscreen/listen')
  }
}).$mount('#app')
