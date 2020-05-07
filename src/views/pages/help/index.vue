<template>
  <d2-container>
    <div id="msg_manage">
      <div class="msg_box">

        <div class="msg_nav_search">
          <div class="msg_nav_search_input">
            <input type="text"
                   placeholder="输入手机号、消息关键字进行筛选"
                   class="seachMsg" />
          </div>
        </div>
        <div class="msg_list">
          <div class="msg_item"
               v-for="(msgItem,msgIndex) in msgList"
               @click="select(msgIndex)"
               :key="msgIndex">
            <div class="msg_item_top">
              <div class="msg_top_left">
                <!-- <div class="msg_user_head"
                     :style="{backgroundImage:url(msgItem.user_image)}"></div> -->
                <div class="msg_user_name">{{msgItem.use_name}}</div>
              </div>
              <!-- <div class="msg_top_right">
                <img src="./msg_menu.png" @click="showDel"/>
              </div> -->
            </div>
            <div class="msg_item_content">
              企业ID:{{msgItem.notes}}
            </div>
            <div class="msg_item_bottom">
              <div class="msg_item_time">{{msgItem.create_time}}</div>
            </div>
            <div class="msg_del">删除</div>
          </div>
        </div>
      </div>

      <div class="msg_return">
        <div class="msg_return_top">
          <div class="return_title">公司名称</div>
          <div class="return_tip">企业ID: {{id}} &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; 员工人数: {{total}} </div>
        </div>
        <div class="user_msg">
          <div class="user_des">
            <div class="user_msg_head">
              <div class="user_msg_head_bg"></div>
              <div class="user_msg_dot"></div>
            </div>
            <div class="user_msg_name">{{use_name}}</div>
          </div>
          <div class="user_msg_content">
            {{notes}}
          </div>
          <div class="user_msg_time">{{create_time}}</div>
        </div>
        <br>
        <br>
        <br>
        <div class="user_msg">
          <div class="user_des">
            <div class="user_msg_head">
              <div class="user_msg_head_bg"></div>
              <div class="user_msg_dot"></div>
            </div>
            <div class="user_msg_name">{{use_name}}</div>
          </div>
          <div class="user_msg_content">
            {{notes}}
          </div>
          <div class="user_msg_time">{{create_time}}</div>
        </div>
        <center>
          <div class="return_btn">
            <div class="return_btn_content"
                 @click="publish">
              <img src="./img/return_icon.png" />
              <span>同意申请</span>
            </div>

          </div>
        </center>

      </div>
    </div>
  </d2-container>
</template>

<script>
import { getNoticeList, getNoticeUserList, postNotice } from '@api/notice'
export default {
  data () {
    return {
      content: '',
      radio: '0',
      userId: '',
      queryOption: '',
      status: 0,
      user_image: '',
      use_name: '',
      notes: '',
      create_time: '',
      msgList: [],
      sendList: [],
      menuId: 0
    }
  },
  methods: {
    publish () {
      postNotice({
        'user': this.userId,
        'name': this.content,
        'status': this.status
      })
    },
    selectButton (e) {
      if (e === 0) {
        this.show_send = false
        this.show_manage = true
        getNoticeList({
          'status': this.status,
          'page': 1,
          'size': 20
        })
          .then(response => {
            console.log(response, 'success') // 成功的返回
            this.msgList = response.data
            if (this.msgList.length > 0) {
              this.use_name = this.msgList[0].use_name
              this.notes = this.msgList[0].notes
              this.create_time = this.msgList[0].create_time
            }

            // for (var i = 0; i < this.msgList.length; i++) {
            //   this.msgList[i].user_image = process.env.VUE_APP_API + response.data.user_image
            // }
          })
          .catch(error => console.log(error, 'error')) // 失败的返回
      } else if (e === 1) {
        this.show_send = true
        this.show_manage = false
        getNoticeList({
          'page': 1,
          'size': 20,
          'status': 3
        })
          .then(response => {
            console.log(response, 'success') // 成功的返回
            this.sendList = response.data
            if (this.sendList.length > 0) {
              this.use_name = this.sendList[0].use_name
              this.notes = this.sendList[0].notes
              this.create_time = this.sendList[0].create_time
            }

            // for (var i = 0; i < this.msgList.length; i++) {
            //   this.msgList[i].user_image = process.env.VUE_APP_API + response.data.user_image
            // }
          })
          .catch(error => console.log(error, 'error')) // 失败的返回
      }
    },
    selectMenu (e) {
      this.menuId = e
      this.status = e
      getNoticeList({
        'status': this.status,
        'page': 1,
        'size': 20
      })
        .then(response => {
          console.log(response, 'success') // 成功的返回
          this.msgList = response.data
          if (this.msgList.length > 0) {
            this.use_name = this.msgList[0].use_name
            this.notes = this.msgList[0].notes
            this.create_time = this.msgList[0].create_time
          }

          // for (var i = 0; i < this.msgList.length; i++) {
          //   this.msgList[i].user_image = process.env.VUE_APP_API + response.data.user_image
          // }
        })
        .catch(error => console.log(error, 'error')) // 失败的返回
    },
    handleSelect (item) {
      this.userId = item.id
      console.log('item:', item, this.userId)
      // do something
    },
    select (index) {
      this.use_name = this.msgList[index].use_name
      this.notes = this.msgList[index].notes
      this.create_time = this.msgList[index].create_time
      console.log(index)
    },
    selectSend (index) {
      this.use_name = this.sendList[index].use_name
      this.notes = this.sendList[index].notes
      this.create_time = this.sendList[index].create_time
      console.log(index)
    },
    onEditorBlur (editor) {
      console.log(this.content)
    },
    querySearchAsync (queryString, callback) {
      let lists = []
      getNoticeUserList({ 'item': queryString }).then(response => {
        console.log(response, 'success') // 成功的返回
        lists = response.data
        callback(lists)
        this.loading = false
      }).catch(err => {
        console.log('err', err)
        this.loading = false
      })
    }
    // selectMsg (even, id, img, name, content, time) {
    //   $('.msg_return').css({
    //     'display': 'flex'
    //   })
    //   $(this).find('.msg_del').hide()
    //   $(even).addClass('msg_item_active').siblings().removeClass('msg_item_active')
    //   msgId = id
    //   console.log(img)
    //   $('.user_msg_head_bg').css({
    //     'background-image': 'url(' + img + ')'
    //   })
    //   $('.user_msg_name').text(name)
    //   $('.user_msg_content').html(content)
    //   $('.user_msg_time').text(time)
    // }

  },
  mounted: function () {
    getNoticeList({
      'status': this.status,
      'page': 1,
      'size': 20
    })
      .then(response => {
        console.log(response, 'success') // 成功的返回
        this.msgList = response.data
        if (this.msgList.length > 0) {
          this.use_name = this.msgList[0].use_name
          this.notes = this.msgList[0].notes
          this.create_time = this.msgList[0].create_time
        }

        // for (var i = 0; i < this.msgList.length; i++) {
        //   this.msgList[i].user_image = process.env.VUE_APP_API + response.data.user_image
        // }
      })
      .catch(error => console.log(error, 'error')) // 失败的返回
  }
}
</script>

<style scoped>
.quill-editor {
  height: 500px;
}

.ql-container {
  height: 400px;
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
