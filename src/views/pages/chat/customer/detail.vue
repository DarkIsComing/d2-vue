<template>
  <d2-container>
    <div id="msg_manage">
      <div class="msg_box">
        <div class="msg_nav_search">
          <div class="msg_nav_search_input">
            <input type="text"
                   placeholder="搜索用户名/关键字"
                   v-model="keyword"
                   class="seachMsg"
                   @blur="search" />
          </div>
        </div>
        <div class="msg_list">
          <div class="msg_item"
               v-for="(msgItem,msgIndex) in msgList"
               @click="select(msgIndex,msgItem.to_id)"
               :key="msgIndex">
            <div class="msg_item_top">
              <div class="msg_top_left">
                <div class="msg_user_head"><img :src="getImgUrl(msgItem.user_image)"
                       height="50"
                       width="50"></div>
                <div class="msg_user_name">{{msgItem.use_name}}</div>
              </div>
              <!-- <div class="msg_top_right">
                <img src="./msg_menu.png" @click="showDel"/>
              </div> -->
            </div>
            <div class="msg_item_content">
              {{msgItem.last_chat}}
            </div>
            <div class="msg_item_bottom">
              <div class="msg_item_time">{{msgItem.time}}</div>
            </div>
            <div class="msg_del">删除</div>
          </div>
        </div>
      </div>

      <div class="msg_return">
        <div class="msg_return_top">
          <div class="return_title">{{title}}</div>
        </div>
        <el-divider></el-divider>

        <div class="main">

          <div class="talkshow">
            <div v-for="item in list"
                 :key="item.form_id"
                 :class="item.form_id==userId?'atalk':'btalk'">
              <img :src="getImgUrl(item.form_avatar)"
                   height="50"
                   width="50"
                   v-if="form_id===userId">
              <img :src="getImgUrl(item.to_avatar)"
                   height="50"
                   width="50"
                   v-else>
              <span v-if="item.type===1">{{item.content}}</span>
              <span v-else-if="item.type===0">
                <img :src="getImgUrl(item.content)"
                     height="50"
                     width="50"></span>
            </div>
          </div>
        </div>
      </div>
    </div>
  </d2-container>
</template>

<script>
import { getChatDetail, getChatList, getChatInfo } from '@api/chat'
export default {
  data () {
    return {
      list: [
        // {
        //   'id': 1,
        //   'name': '小',
        //   'content': '你好'
        // },
        // {
        //   'id': 2,
        //   'name': '大',
        //   'content': '你也是'
        // }
      ],
      keyword: '',
      title: '',
      userId: '',
      toId: '',
      queryOption: '',
      status: 0,
      user_image: '',
      use_name: '',
      last_chat: '',
      time: '',
      msgList: [],
      sendList: [],
      menuId: 0
    }
  },
  methods: {
    search () {
      getChatDetail({
        'id': this.$route.query.id,
        'item': this.keyword
      })
        .then(response => {
          console.log(response, 'success') // 成功的返回
          this.msgList = response.data
          // if (this.msgList.length > 0) {
          //   this.use_name = this.msgList[0].use_name
          //   this.last_chat = this.msgList[0].last_chat
          //   this.time = this.msgList[0].time
          // }
        })
        .catch(error => console.log(error, 'error')) // 失败的返回
    },
    getImgUrl (url) {
      return (process.env.VUE_APP_API + url)
    },
    select (index, toId) {
      console.log(index)
      getChatInfo({
        'id': this.userId,
        'to_id': toId
      }).then(response => {
        console.log(response, 'success') // 成功的返回
        this.list = response.data
        this.title = response.data[0].to_name
      })
        .catch(error => console.log(error, 'error')) // 失败的返回
    },

    getChats () {
      getChatList({
        'start_time': '',
        'end_time': '',
        'item': '',
        'page': 1,
        'size': 20
      }).then(response => {
        console.log(response, 'success') // 成功的返回
      }).catch(error => console.log(error, 'error')) // 失败的返回
    },
    getMsgs () {
      getChatInfo({
        'id': this.userId,
        'to_id': 0
      }).then(response => {
        console.log(response, 'success') // 成功的返回
      })
        .catch(error => console.log(error, 'error')) // 失败的返回
    }
  },
  mounted: function () {
    getChatDetail({
      'id': this.$route.query.id,
      'item': ''
    })
      .then(response => {
        this.userId = this.$route.query.id
        console.log(response, 'success') // 成功的返回
        this.msgList = response.data
        // if (this.msgList.length > 0) {
        //   this.use_name = this.msgList[0].use_name
        //   this.last_chat = this.msgList[0].last_chat
        //   this.time = this.msgList[0].time
        // }
      })
      .catch(error => console.log(error, 'error')) // 失败的返回
  }
}
</script>

<style scoped>
.main {
  height: 85%;
  overflow: scroll;
  background-color: gray;
}
.atalk {
  margin: 30px 80px;
}
.atalk span {
  display: inline-block;
  padding: 3px 10px;
  border: 1px solid aliceblue;
  border-radius: 15px;
  padding: 5px 50px;
}
.btalk {
  text-align: right;
  margin: 30px 80px;
}
.btalk span {
  display: inline-block;
  padding: 3px 50px;
  border: 1px solid aliceblue;
  border-radius: 15px;
}
#msg_manage {
  box-sizing: border-box;
  width: 100%;
  height: 100vh;
  display: flex;
  padding-top: 0.3vw;
}
#msg_manage .msg_box {
  width: 25.4vw;
  height: 100%;
  position: relative;
}
#msg_manage .msg_box .msg_nav {
  width: 100%;
  display: flex;
  position: relative;
  z-index: 9;
  background-color: #fff;
}
#msg_manage .msg_box .msg_nav .msg_nav_item {
  flex: 1;
  height: 4vw;
  cursor: pointer;
  position: relative;
  text-align: center;
  line-height: 4vw;
  font-size: 0.6rem;
  color: #101010;
}
#msg_manage .msg_box .msg_nav .msg_nav_item .msg_nav_dot {
  position: absolute;
  box-sizing: border-box;
  padding: 0 0.2vw;
  top: 1vw;
  left: 68%;
  line-height: 0.8vw;
  background-color: #fa6851;
  border-radius: 0.4vw;
  font-size: 0.4rem;
  color: #fff;
  height: 0.8vw;
}
#msg_manage .msg_box .msg_nav .msg_nav_item_active {
  position: relative;
}
#msg_manage .msg_box .msg_nav .msg_nav_item_active::after {
  content: "";
  position: absolute;
  width: 70%;
  height: 1px;
  background-color: #23b267;
  border-radius: 1px;
  bottom: 1vw;
  left: 15%;
}
#msg_manage .msg_box .msg_nav_search {
  width: 100%;
  box-sizing: border-box;
  height: 2.2vw;
  padding: 0 1.6vw;
}
#msg_manage .msg_box .msg_nav_search .msg_nav_search_input {
  width: 100%;
  height: 2.2vw;
  display: flex;
  overflow: hidden;
  border-radius: 0.5vw;
  border: 1px solid #989898;
  align-items: center;
}
#msg_manage .msg_box .msg_nav_search .msg_nav_search_input input {
  height: 2.2vw;
  outline: none;
  border: none;
  background: none;
  font-size: 0.5rem;
  text-align: center;
  flex: 1;
}
#msg_manage .msg_box .msg_list {
  position: absolute;
  width: 100%;
  height: calc(100% - 6.2vw);
  top: 6.2vw;
  left: 0;
  box-sizing: border-box;
  padding: 0 0.6vw;
  overflow-y: auto;
}
#msg_manage .msg_box .msg_list .msg_item {
  width: 100%;
  cursor: pointer;
  margin-top: 0.7vw;
  background-color: #f7f7f7;
  border-radius: 0.3vw;
  position: relative;
  box-sizing: border-box;
  padding: 1vw 1vw 1vw 1.7vw;
}
#msg_manage .msg_box .msg_list .msg_item .msg_item_top {
  width: 100%;
  display: flex;
  margin-bottom: 0.9vw;
  align-items: center;
  justify-content: space-between;
}
#msg_manage .msg_box .msg_list .msg_item .msg_item_top .msg_top_left {
  display: flex;
  align-items: center;
}
#msg_manage
  .msg_box
  .msg_list
  .msg_item
  .msg_item_top
  .msg_top_left
  .msg_user_head {
  width: 1.4vw;
  height: 1.4vw;
  border-radius: 50%;
  overflow: hidden;
  /* background: url(./1.jpg) no-repeat; */
  background-position: center center;
  background-size: cover;
  margin-right: 0.6vw;
}
#msg_manage
  .msg_box
  .msg_list
  .msg_item
  .msg_item_top
  .msg_top_left
  .msg_user_name {
  font-size: 0.6rem;
  color: #101010;
}
#msg_manage .msg_box .msg_list .msg_item .msg_item_top .msg_top_right {
  width: 1.7vw;
  height: 1.7vw;
  display: flex;
}
#msg_manage .msg_box .msg_list .msg_item .msg_item_top .msg_top_right img {
  width: 100%;
  height: 1.7vw;
}
#msg_manage .msg_box .msg_list .msg_item .msg_item_content {
  font-size: 0.5rem;
  color: #7a7a7a;
  line-height: 0.7rem;
}
#msg_manage .msg_box .msg_list .msg_item .msg_item_bottom {
  width: 100%;
  display: flex;
  justify-content: flex-end;
}
#msg_manage .msg_box .msg_list .msg_item .msg_item_bottom .msg_item_time {
  font-size: 0.4rem;
  color: #000;
  opacity: 0.53;
}
#msg_manage .msg_box .msg_list .msg_item .msg_del {
  width: 5vw;
  height: 2vw;
  display: none;
  border-radius: 0.2vw;
  box-shadow: 0vw 0.1vw 1vw 0vw rgba(0, 0, 0, 0.18);
  background-color: #fff;
  position: absolute;
  right: 1vw;
  top: 2.8vw;
  font-size: 0.5rem;
  color: #333;
  cursor: pointer;
  text-align: center;
  line-height: 2vw;
}
#msg_manage .msg_box .msg_list .msg_item_active {
  background-color: rgba(39, 178, 105, 0.2);
}
#msg_manage .msg_box .msg_list::-webkit-scrollbar {
  /*滚动条整体样式*/
  width: 3px;
  /*高宽分别对应横竖滚动条的尺寸*/
  height: 1px;
}
#msg_manage .msg_box .msg_list::-webkit-scrollbar-thumb {
  /*滚动条里面小方块*/
  border-radius: 10px;
  box-shadow: inset 0 0 5px rgba(0, 0, 0, 0.2);
  background: #23b267;
}
#msg_manage .msg_box .msg_list::-webkit-scrollbar-track {
  /*滚动条里面轨道*/
  box-shadow: inset 0 0 5px rgba(0, 0, 0, 0.2);
  border-radius: 10px;
  background: #ededed;
}
#msg_manage .msg_return {
  flex: 1;
  min-height: 100%;
  box-sizing: border-box;
  padding: 0 2vw;
  /* display: none; */
  overflow-y: auto;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}
#msg_manage .msg_return .msg_return_top {
  width: 100%;
  margin-bottom: 2vw;
}
#msg_manage .msg_return .msg_return_top .return_title {
  font-size: 0.6rem;
  color: #000000;
  margin-bottom: 0.7vw;
}
#msg_manage .msg_return .msg_return_top .return_tip {
  font-size: 0.4rem;
  color: #010101;
  opacity: 0.53;
}
#msg_manage .msg_return .user_msg {
  width: 100%;
  box-sizing: border-box;
  padding: 1vw 2vw 2vw;
  box-shadow: 0vw 0.1vw 2vw 0vw rgba(0, 0, 0, 0.18);
  border-radius: 0.2rem;
}
#msg_manage .msg_return .user_msg .user_des {
  width: 100%;
  margin-bottom: 1.2vw;
  display: flex;
  align-items: center;
}
#msg_manage .msg_return .user_msg .user_des .user_msg_head {
  width: 2vw;
  height: 2vw;
  margin-right: 1.2vw;
  position: relative;
}
#msg_manage .msg_return .user_msg .user_des .user_msg_head .user_msg_head_bg {
  width: 2vw;
  height: 2vw;
  border-radius: 50%;
  overflow: hidden;
  /* background: url(./1.jpg) no-repeat; */
  background-position: center center;
  background-size: cover;
}
#msg_manage .msg_return .user_msg .user_des .user_msg_head .user_msg_dot {
  width: 0.6vw;
  height: 0.6vw;
  background-color: #0eff14;
  border-radius: 50%;
  position: absolute;
  bottom: 0;
  left: 0;
}
#msg_manage .msg_return .user_msg .user_des .user_msg_name {
  font-size: 0.6rem;
  color: #101010;
}
#msg_manage .msg_return .user_msg .user_msg_content {
  font-size: 0.5rem;
  color: #000;
  line-height: 0.8rem;
  width: 100%;
  margin-bottom: 4.2vw;
}
#msg_manage .msg_return .user_msg .user_msg_time {
  width: 100%;
  text-align: right;
  font-size: 0.4rem;
  color: #010101;
  opacity: 0.53;
}
#msg_manage .msg_return .msg_return_box {
  width: 100%;
  margin-top: 2vw;
  border-radius: 0.4vw;
  box-shadow: 0vw 0.1vw 2vw 0vw rgba(0, 0, 0, 0.18);
}
#msg_manage .msg_return .msg_return_box .return_box_title {
  width: 100%;
  height: 4vw;
  display: flex;
  align-items: center;
  justify-content: space-between;
  box-sizing: border-box;
  padding: 0 2.7vw;
  border-bottom: 1px solid #e5e5e5;
}
#msg_manage .msg_return .msg_return_box .return_box_title span {
  font-size: 0.5rem;
  color: #9f9f9f;
}
#msg_manage .msg_return .msg_return_box .msg_return_text {
  width: 100%;
  height: 13.4vw;
}
#msg_manage .msg_return .msg_return_box .msg_return_text #text_area {
  width: 100%;
  height: 100%;
  font-size: 0.6rem;
}
#msg_manage .msg_return .return_btn {
  width: 17.4vw;
  height: 2.7vw;
  margin-top: 1.8vw;
  cursor: pointer;
  background-color: #27b46a;
  border-radius: 1.3vw;
}
#msg_manage .msg_return .return_btn .return_btn_content {
  width: calc(100% - 4px);
  height: calc(100% - 4px);
  border: 1px solid #fff;
  border-radius: 1.3vw;
  display: flex;
  margin-top: 2px;
  margin-left: 2px;
  align-items: center;
  justify-content: center;
}
#msg_manage .msg_return .return_btn .return_btn_content img {
  width: 1.5vw;
  margin-right: 0.9vw;
}
#msg_manage .msg_return .return_btn .return_btn_content span {
  color: #fff;
  font-size: 0.5rem;
}
</style>
