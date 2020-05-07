<template>
  <d2-container>
    <template slot='header'>
      <el-button type="primary"
                 @click="selectButton(0)">收信息箱</el-button>
      <el-button type="success"
                 @click="selectButton(1)">发布通知</el-button>
    </template>
    <div id="msg_manage"
         v-if="show_manage">
      <div class="msg_box">
        <div class="msg_nav">
          <div class="msg_nav_item"
               :class="{msg_nav_item_active:(menuId==0)}"
               @click="selectMenu(0)">钱包通知

          </div>
          <div class="msg_nav_item"
               :class="{msg_nav_item_active:(menuId==1)}"
               @click="selectMenu(1)">资源通知

          </div>
          <div class="msg_nav_item"
               :class="{msg_nav_item_active:(menuId==2)}"
               @click="selectMenu(2)">签到通知

          </div>
        </div>
        <!-- <div class="msg_nav_search">
          <div class="msg_nav_search_input">
            <input type="text"
                   placeholder="输入手机号、消息关键字进行筛选"
                   class="seachMsg" />
          </div>
        </div> -->
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
              {{msgItem.notes}}
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
          <div class="return_title">您的新的消息，请注意查收</div>
          <div class="return_tip">报修、付款、提现通知不用回复哦，如果遇到客户的提现的疑问须尽快回复哦！</div>
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
      </div>
    </div>
    <!-- 发布通知 -->
    <div id="send_notice"
         v-if="show_send">
      <div class="msg_box">
        <!-- <div class="msg_nav_search">
          <div class="msg_nav_search_input">
            <input type="text"
                   placeholder="输入手机号、消息关键字进行筛选"
                   class="seachMsg" />
          </div>
        </div> -->
        <div class="msg_list">
          <div class="msg_item"
               v-for="(sendItem,sendIndex) in sendList"
               @click="selectSend(sendIndex)"
               :key="sendIndex">
            <div class="msg_item_top">
              <div class="msg_top_left">
                <!-- <div class="msg_user_head"
                     :style="{backgroundImage:url(msgItem.user_image)}"></div> -->
                <div class="msg_user_name">{{sendItem.use_name}}</div>
              </div>
              <!-- <div class="msg_top_right">
                <img src="./msg_menu.png" @click="showDel"/>
              </div> -->
            </div>
            <div class="msg_item_content">
              {{sendItem.notes}}
            </div>
            <div class="msg_item_bottom">
              <div class="msg_item_time">{{sendItem.create_time}}</div>
            </div>
            <div class="msg_del">删除</div>
          </div>
        </div>
      </div>

      <div class="msg_return">
        <div class="msg_return_top">
          <div class="return_title">选择发送对像</div>

          <div class="msg_select_text">
            <el-radio v-model="radio"
                      label="0">@所有人</el-radio>
          </div>

          <div class="msg_select_text">
            <el-radio v-model="radio"
                      label="1">@某人</el-radio>
          </div>
          <el-autocomplete v-model="queryOption"
                           :fetch-suggestions="querySearchAsync"
                           @select="handleSelect"
                           placeholder="请输入用户名进行新增">
          </el-autocomplete>
          <!-- <div class="msg_select_use"> -->
          <!-- <input type="text"
                   placeholder="输入客户姓名或手机号，从下拉列表内选择"
                   class="searchUser" />
            <img src="./img/arrow_down.png" /> -->

          <!-- <div class="user_list">

            </div> -->
          <!-- </div> -->
        </div>
        <div class="msg_return_box">
          <div class="return_box_title">
            <span>发送一则新通知</span>
            <div id="text_area_tool"
                 class="toolbar"></div>
          </div>
          <!-- <div class="msg_return_text">
            <div id="text_area"></div>
          </div> -->
          <div>
            <quill-editor @change="onEditorChange($event)"
                          id="desc"
                          ref="quill"
                          v-model="desc"
                          :options="editorOption">
            </quill-editor>
          </div>
        </div>
        <div class="return_btn">
          <div class="return_btn_content"
               @click="publish">
            <img src="./img/return_icon.png" />
            <span>确认发布</span>
          </div>
        </div>
      </div>
    </div>
  </d2-container>
</template>

<script>
import { quillEditor, Quill } from 'vue-quill-editor'
import { ImageExtend, QuillWatch } from 'quill-image-extend-module'
import { getNoticeList, getNoticeUserList, postNotice } from '@api/notice'
Quill.register('modules/ImageExtend', ImageExtend)

export default {
  name: 'richText',
  components: { quillEditor },
  props: ['content'], // 父组件传过来的，将传过来的渲染到富文本编辑器
  data () {
    return {
      radio: '0',
      imgId: [],
      userId: '',
      queryOption: '',
      show_manage: true,
      show_send: '',
      status: 0,
      user_image: '',
      use_name: '',
      notes: '',
      create_time: '',
      msgList: [],
      sendList: [],
      menuId: 0,

      desc: '',
      editorOption: {
        placeholder: '请输入通知内容',
        modules: {
          ImageExtend: {
            loading: true,
            name: 'image', // 图片参数名
            size: 1, // 可选参数 图片大小，单位为M，1M = 1024kb
            action: 'http://192.168.1.143:8000/admin/notice/image/', // 上传的服务器地址，如果action为空，则采用base64插入图片
            // response 为一个函数，用来获取服务器返回的具体图片地址
            response: res => {
              console.log('返回结果', res)
              this.imgId.push(res.data.id)
              const imgUrl = 'http://192.168.1.143:8000' + res.data.image_url
              return imgUrl
            },
            // headers: xhr => {
            //   // 上传图片请求需要携带token的 在xhr.setRequestHeader中设置，这里我的token存放在sessionStorage中
            //   xhr.setRequestHeader('token', window.sessionStorage.getItem('token'))
            // },
            // 可选参数 设置请求头部
            sizeError: () => { }, // 图片超过大小的回调
            start: () => { }, // 可选参数 自定义开始上传触发事件
            end: () => { }, // 可选参数 自定义上传结束触发的事件，无论成功或者失败
            error: () => { }, // 可选参数 上传失败触发的事件
            success: () => {
              console.log('ImageExtend中的success：上传成功')
            }, // 可选参数  上传成功触发的事件
            change: (xhr, formData) => {
              // xhr.setRequestHeader('myHeader','myValue')
              // formData.append('token', 'myToken')
            } // 可选参数 每次选择图片触发，也可用来设置头部，但比headers多了一个参数，可设置formData
          },
          // 如果不上传图片到服务器，此处不必配置
          toolbar: {
            // container为工具栏，此次引入了全部工具栏，也可自行配置
            container: [
              ['bold', 'italic', 'underline', 'strike'],
              ['blockquote', 'code-block'],
              [{ header: 1 }, { header: 2 }],
              [{ list: 'ordered' }, { list: 'bullet' }],
              [{ script: 'sub' }, { script: 'super' }],
              [{ indent: '-1' }, { indent: '+1' }],
              [{ direction: 'rtl' }],
              [{ size: ['small', false, 'large', 'huge'] }],
              [{ header: [1, 2, 3, 4, 5, 6, false] }],
              [{ color: [] }, { background: [] }],
              [{ font: [] }],
              [{ align: [] }],
              ['image']
            ],
            // 上传成功，回显图片（会进入如上面ImageExtend的各过程，返回<img src="http://xx.xx.xx.xx:xxxx/file/xxx.jpg">）
            handlers: {
              image: function () {
                // 劫持原来的图片点击按钮事件
                QuillWatch.emit(this.quill.id)
              }
            }
          }
        }
      }

    }
  },
  methods: {

    onEditorChange (e) { // 富文本编辑器内容发生改变的时候
      // console.log('onEditorChange打印e')
      console.log(e)
    },
    publish () {
      if (this.desc.search('<img') !== -1) {
        this.status = 0
      } else {
        this.status = 1
      }
      console.log(this.desc, this.radio, typeof (this.desc))
      postNotice({
        'user': this.userId,
        'name': this.desc,
        'status': this.status,
        'receive_type': this.radio,
        'image': this.imgId
      }).then(response => {
        console.log(response, 'success') // 成功的返回
        this.imgId = []
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
      })
        .catch(error => console.log(error, 'error')) // 失败的返回
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
  background: url(./1.jpg) no-repeat;
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

#send_notice {
  box-sizing: border-box;
  width: 100%;
  height: 100vh;
  display: flex;
  padding-top: 0.3vw;
}
#send_notice .msg_box {
  width: 25.4vw;
  height: 100%;
  position: relative;
}
#send_notice .msg_box .msg_nav_search {
  width: 100%;
  margin-top: 2vw;
  box-sizing: border-box;
  height: 2.2vw;
  padding: 0 1.6vw;
}
#send_notice .msg_box .msg_nav_search .msg_nav_search_input {
  width: 100%;
  height: 2.2vw;
  display: flex;
  overflow: hidden;
  border-radius: 0.5vw;
  border: 1px solid #989898;
  align-items: center;
}
#send_notice .msg_box .msg_nav_search .msg_nav_search_input input {
  height: 2.2vw;
  outline: none;
  border: none;
  background: none;
  font-size: 0.5rem;
  text-align: center;
  flex: 1;
}
#send_notice .msg_box .msg_list {
  position: absolute;
  top: 4.2vw;
  left: 0;
  width: 100%;
  height: calc(100% - 4.2vw);
  box-sizing: border-box;
  padding: 0 0.6vw;
  overflow-y: auto;
}
#send_notice .msg_box .msg_list .msg_item {
  width: 100%;
  margin-top: 0.7vw;
  cursor: pointer;
  background-color: #f7f7f7;
  border-radius: 0.3vw;
  position: relative;
  box-sizing: border-box;
  padding: 1vw 1vw 1vw 1.7vw;
}
#send_notice .msg_box .msg_list .msg_item .msg_item_top {
  width: 100%;
  display: flex;
  margin-bottom: 0.9vw;
  align-items: center;
  justify-content: space-between;
}
#send_notice .msg_box .msg_list .msg_item .msg_item_top .msg_top_left {
  display: flex;
  align-items: center;
}
#send_notice
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
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: #005ffd;
  margin-right: 0.6vw;
}
#send_notice
  .msg_box
  .msg_list
  .msg_item
  .msg_item_top
  .msg_top_left
  .msg_user_head
  img {
  width: 1.2vw;
}
#send_notice
  .msg_box
  .msg_list
  .msg_item
  .msg_item_top
  .msg_top_left
  .msg_user_name {
  font-size: 0.6rem;
  color: #101010;
}
#send_notice .msg_box .msg_list .msg_item .msg_item_top .msg_top_right {
  width: 1.7vw;
  height: 1.7vw;
  display: flex;
}
#send_notice .msg_box .msg_list .msg_item .msg_item_top .msg_top_right img {
  width: 100%;
  height: 1.7vw;
}
#send_notice .msg_box .msg_list .msg_item .msg_item_content {
  font-size: 0.5rem;
  color: #7a7a7a;
  line-height: 0.7rem;
}
#send_notice .msg_box .msg_list .msg_item .msg_item_bottom {
  width: 100%;
  display: flex;
  justify-content: flex-end;
}
#send_notice .msg_box .msg_list .msg_item .msg_item_bottom .msg_item_time {
  font-size: 0.4rem;
  color: #000;
  opacity: 0.53;
}
#send_notice .msg_box .msg_list .msg_item .msg_del {
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
#send_notice .msg_box .msg_list .msg_item_active {
  background-color: rgba(39, 178, 105, 0.2);
}
#send_notice .msg_box .msg_list::-webkit-scrollbar {
  /*滚动条整体样式*/
  width: 3px;
  /*高宽分别对应横竖滚动条的尺寸*/
  height: 1px;
}
#send_notice .msg_box .msg_list::-webkit-scrollbar-thumb {
  /*滚动条里面小方块*/
  border-radius: 10px;
  box-shadow: inset 0 0 5px rgba(0, 0, 0, 0.2);
  background: #23b267;
}
#send_notice .msg_box .msg_list::-webkit-scrollbar-track {
  /*滚动条里面轨道*/
  box-shadow: inset 0 0 5px rgba(0, 0, 0, 0.2);
  border-radius: 10px;
  background: #ededed;
}
#send_notice .msg_return {
  flex: 1;
  height: 100%;
  box-sizing: border-box;
  padding: 0 2vw;
  padding-top: 2vw;
  display: flex;
  overflow-y: auto;
  flex-direction: column;
  align-items: center;
}
#send_notice .msg_return .msg_return_top {
  width: 100%;
  display: flex;
  align-items: center;
  margin-bottom: 2vw;
}
#send_notice .msg_return .msg_return_top .return_title {
  font-size: 0.5rem;
  color: #9f9f9f;
  margin-left: 2vw;
}
#send_notice .msg_return .msg_return_top .msg_select {
  width: 1.3vw;
  height: 1.3vw;
  border: 1px solid #d6d6d6;
  display: flex;
  cursor: pointer;
  align-items: center;
  margin-left: 6.6vw;
  justify-content: center;
}
#send_notice .msg_return .msg_return_top .msg_select img {
  width: 0.9vw;
}
#send_notice .msg_return .msg_return_top .msg_select_active {
  background-color: #27b36a;
  border: none;
}
#send_notice .msg_return .msg_return_top .msg_select_text {
  font-size: 0.5rem;
  color: #9f9f9f;
  margin-left: 0.2vw;
  margin-right: 0.7vw;
}
#send_notice .msg_return .msg_return_top .msg_select_use {
  width: 19vw;
  height: 2.3vw;
  position: relative;
  border-radius: 0.2vw;
  border: solid 1px #d6d6d6;
  display: flex;
  align-items: center;
  box-sizing: border-box;
  padding: 0 0.9vw;
}
#send_notice .msg_return .msg_return_top .msg_select_use input {
  flex: 1;
  font-size: 0.4rem;
  outline: none;
  border: none;
  background: none;
}
#send_notice .msg_return .msg_return_top .msg_select_use img {
  width: 0.9vw;
  margin-left: 1vw;
}
#send_notice .msg_return .msg_return_top .msg_select_use .user_list {
  width: 100%;
  display: none;
  position: absolute;
  border-radius: 0.2vw;
  box-shadow: 0vw 0.1vw 1vw 0vw rgba(0, 0, 0, 0.18);
  top: 2.4vw;
  left: 0;
  z-index: 9;
  background-color: #fff;
}
#send_notice .msg_return .msg_return_top .msg_select_use .user_list .user_item {
  width: 100%;
  height: 2.3vw;
  text-align: center;
  line-height: 2.3vw;
  font-size: 0.4rem;
  color: #333;
  cursor: pointer;
  border-bottom: 1px solid #e5e5e5;
}
#send_notice
  .msg_return
  .msg_return_top
  .msg_select_use
  .user_list
  .user_item:last-child {
  border-bottom: none;
}
#send_notice .msg_return .msg_return_box {
  width: 100%;
  border-radius: 0.4vw;
  box-shadow: 0vw 0.1vw 2vw 0vw rgba(0, 0, 0, 0.18);
}
#send_notice .msg_return .msg_return_box .return_box_title {
  width: 100%;
  height: 4vw;
  display: flex;
  align-items: center;
  justify-content: space-between;
  box-sizing: border-box;
  padding: 0 2.7vw;
  border-bottom: 1px solid #e5e5e5;
}
#send_notice .msg_return .msg_return_box .return_box_title span {
  font-size: 0.5rem;
  color: #9f9f9f;
}
#send_notice .msg_return .msg_return_box .msg_return_text {
  width: 100%;
  height: 36.4vw;
}
#send_notice .msg_return .msg_return_box .msg_return_text #text_area {
  width: 100%;
  height: 100%;
  font-size: 0.6rem;
}
#send_notice .msg_return .return_btn {
  width: 17.4vw;
  height: 2.7vw;
  margin-top: 1.8vw;
  cursor: pointer;
  background-color: #27b46a;
  border-radius: 1.3vw;
}
#send_notice .msg_return .return_btn .return_btn_content {
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
#send_notice .msg_return .return_btn .return_btn_content img {
  width: 1.5vw;
  margin-right: 0.9vw;
}
#send_notice .msg_return .return_btn .return_btn_content span {
  color: #fff;
  font-size: 0.5rem;
}
</style>
