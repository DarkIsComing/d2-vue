<template>
  <div class="page-login">
    <div class="page-login--layer page-login--layer-area">
      <ul class="circles">
        <li v-for="n in 10"
            :key="n"></li>
      </ul>
    </div>
    <div class="page-login--layer page-login--layer-time"
         flex="main:center cross:center">
      {{time}}
    </div>
    <div class="page-login--layer">
      <div class="page-login--content"
           flex="dir:top main:justify cross:stretch box:justify">
        <div class="page-login--content-header">
          <!-- <p class="page-login--content-header-motto">
            时间是一切财富中最宝贵的财富
          </p> -->
        </div>
        <div class="page-login--content-main"
             flex="dir:top main:center cross:center">
          <!-- logo -->
          <img class="page-login--logo"
               src="./image/logo@2x.png">
          <!-- form -->
          <div class="page-login--form">
            <el-card shadow="never">
              <el-form ref="loginForm"
                       label-position="top"
                       :rules="rules"
                       :model="formLogin"
                       size="default">
                <el-form-item prop="username">
                  <el-input type="text"
                            v-model="formLogin.username"
                            placeholder="用户名">
                    <i slot="prepend"
                       class="fa fa-user-circle-o"></i>
                  </el-input>
                </el-form-item>
                <el-form-item prop="password">
                  <el-input type="password"
                            v-model="formLogin.password"
                            placeholder="密码">
                    <i slot="prepend"
                       class="fa fa-keyboard-o"></i>
                  </el-input>
                </el-form-item>
                <el-form-item prop="code">
                  <el-input type="text"
                            v-model="formLogin.code"
                            placeholder="验证码">
                    <i slot="prefix"
                       class="icon-yanzhengma yanzhengma"
                       style=""></i>
                    <template slot="append"><span @click="getcode"
                            class="msg-text"
                            :class="[{display:msgKey}]">{{msgText}}</span></template>
                  </el-input>
                </el-form-item>
                <el-button size="default"
                           @click="submit"
                           type="primary"
                           class="button-login">
                  登录
                </el-button>
              </el-form>
            </el-card>
            <p class="page-login--options"
               flex="main:justify cross:center">
              <span>
                <d2-icon name="question-circle" /> 忘记密码</span>
            </p>
          </div>
        </div>
        <div class="page-login--content-footer">
          <p class="page-login--content-footer-locales">
            <a v-for="language in $languages"
               :key="language.value"
               @click="onChangeLocale(language.value)">
              {{ language.label }}
            </a>
          </p>
          <p class="page-login--content-footer-copyright">
            Copyright
            <d2-icon name="copyright" />
            2020 预享信息科技(上海)有限公司
            <a href="https://soulemo.com">
              @FairyEver
            </a>
          </p>
          <p class="page-login--content-footer-options">
            <a href="#">帮助</a>
            <a href="#">隐私</a>
            <a href="#">条款</a>
          </p>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import dayjs from 'dayjs'
import { mapActions } from 'vuex'
import { isvalidatemobile } from '@/utils/validate'
import localeMixin from '@/locales/mixin.js'
import { AccountLogin, GetCode } from '@api/sys.login'

import axios from 'axios'
import util from '@/libs/util.js'
axios.defaults.withCredentials = true
const MSGINIT = '发送验证码'
// const MSGERROR = '验证码发送失败'
const MSGSCUCCESS = 'time秒后重发'
const MSGTIME = 60
export default {
  mixins: [
    localeMixin
  ],
  data () {
    const validatePhone = (rule, value, callback) => {
      if (isvalidatemobile(value)[0]) {
        callback(new Error(isvalidatemobile(value)[1]))
      } else {
        callback()
      }
    }
    const validateCode = (rule, value, callback) => {
      if (value.length !== 6) {
        callback(new Error('请输入6位数的验证码'))
      } else {
        callback()
      }
    }
    return {
      msgText: MSGINIT,
      msgTime: MSGTIME,
      msgKey: false,
      timeInterval: null,
      time: dayjs().format('HH:mm:ss'),
      // 表单
      formLogin: {
        username: '',
        password: '',
        code: ''
      },
      // 表单校验
      rules: {
        username: [
          {
            required: true,
            message: '请输入正确的用户名',
            trigger: 'blur',
            validator: validatePhone
          }
        ],
        password: [
          {
            required: true,
            message: '请输入正确的密码',
            trigger: 'blur'
          }
        ],
        code: [
          {
            required: true,
            message: '请输入正确的验证码',
            trigger: 'blur',
            validator: validateCode
          }
        ]
      }
    }
  },
  mounted () {
    this.timeInterval = setInterval(() => {
      this.refreshTime()
    }, 1000)
  },
  beforeDestroy () {
    clearInterval(this.timeInterval)
  },
  methods: {
    ...mapActions('d2admin/account', [
      'login', 'getCode'
    ]),
    refreshTime () {
      this.time = dayjs().format('HH:mm:ss')
    },
    /**
     * @description 提交表单
     */
    // 提交登录信息
    submit () {
      this.$refs.loginForm.validate((valid) => {
        if (valid) {
          // 登录
          // console.log('跳转路径', this.$route.query.redirect)


          axios.post('http://192.168.1.143:8000/admin/login/', {
            username: this.formLogin.username,
            password: this.formLogin.password,
            token: this.formLogin.code
          }).then(response => {
            console.log(document.cookie, 'cookie1')
            console.log(response.headers, 'headers1')
            console.log(util.cookies.getAll(), 'util.cookies1')
          })
          AccountLogin({
            username: this.formLogin.username,
            password: this.formLogin.password,
            token: this.formLogin.code
          })
            .then(response => {
              console.log(response, 'success') // 成功的返回
              const token = util.cookies.getAll()
              let cookie2 = document.cookie
              console.log(cookie2, 'cookie2') // 成功的返回
              console.log(response.headers, 'headers2') // 成功的返回
              console.log(token, 'util.cookies2') // 成功的返回
              // 重定向对象不存在则返回顶层路径
              // this.$router.replace(this.$route.query.redirect || '/')
            }).catch(error => console.log(error, 'error')) // 失败的返回
        } else {
          // 登录表单校验失败
          this.$message.error('填写错误,请认真填写!')
        }
      })
    },
    // 获取验证码
    getcode () {
      const phone = this.formLogin.username
      if (isvalidatemobile(phone)[0]) {
        this.$message.error('填写错误,请认真填写!')
      } else {
        GetCode({
          phone: this.formLogin.username
        })
          .then(() => {
            this.msgText = MSGSCUCCESS.replace('time', this.msgTime)
            this.msgKey = true
            const time = setInterval(() => {
              this.msgTime--
              this.msgText = MSGSCUCCESS.replace('time', this.msgTime)
              if (this.msgTime === 0) {
                this.msgTime = MSGTIME
                this.msgText = MSGINIT
                this.msgKey = false
                clearInterval(time)
              }
            }, 1000)
          })
      }
    }
  }
}
</script>

<style lang="scss">
.page-login {
  @extend %unable-select;
  $backgroundColor: #f0f2f5;
  // ---
  background-color: $backgroundColor;
  height: 100%;
  position: relative;
  // 层
  .page-login--layer {
    @extend %full;
    overflow: auto;
  }
  .page-login--layer-area {
    overflow: hidden;
  }
  // 时间
  .page-login--layer-time {
    font-size: 24em;
    font-weight: bold;
    color: rgba(0, 0, 0, 0.03);
    overflow: hidden;
  }
  // 登陆页面控件的容器
  .page-login--content {
    height: 100%;
    min-height: 500px;
  }
  // header
  .page-login--content-header {
    padding: 1em 0;
    .page-login--content-header-motto {
      margin: 0px;
      padding: 0px;
      color: $color-text-normal;
      text-align: center;
      font-size: 12px;
    }
  }
  // main
  .page-login--logo {
    width: 240px;
    margin-bottom: 2em;
    margin-top: -2em;
  }
  // 登录表单
  .page-login--form {
    width: 280px;
    // 卡片
    .el-card {
      margin-bottom: 15px;
    }
    // 登录按钮
    .button-login {
      width: 100%;
    }
    // 输入框左边的图表区域缩窄
    .el-input-group__prepend {
      padding: 0px 14px;
    }
    .login-code {
      height: 40px - 2px;
      display: block;
      margin: 0px -20px;
      border-top-right-radius: 2px;
      border-bottom-right-radius: 2px;
    }
    // 登陆选项
    .page-login--options {
      margin: 0px;
      padding: 0px;
      font-size: 14px;
      color: $color-primary;
      margin-bottom: 15px;
      font-weight: bold;
      justify-content: flex-end;
    }
    // .page-login--quick {
    //   width: 100%;
    // }
  }
  // 验证码
  .yanzhengma {
    display: block;
    margin-top: 8px;
  }
  .msg-text {
    display: block;
    width: 60px;
    font-size: 12px;
    text-align: center;
    cursor: pointer;
  }
  .msg-text.display {
    color: #ccc;
  }
  // footer
  .page-login--content-footer {
    padding: 1em 0;
    .page-login--content-footer-locales {
      padding: 0px;
      margin: 0px;
      margin-bottom: 15px;
      font-size: 12px;
      line-height: 12px;
      text-align: center;
      color: $color-text-normal;
      a {
        color: $color-text-normal;
        margin: 0 0.5em;
        &:hover {
          color: $color-text-main;
        }
      }
    }
    .page-login--content-footer-copyright {
      padding: 0px;
      margin: 0px;
      margin-bottom: 10px;
      font-size: 12px;
      line-height: 12px;
      text-align: center;
      color: $color-text-normal;
      a {
        color: $color-text-normal;
      }
    }
    .page-login--content-footer-options {
      padding: 0px;
      margin: 0px;
      font-size: 12px;
      line-height: 12px;
      text-align: center;
      a {
        color: $color-text-normal;
        margin: 0 1em;
      }
    }
  }
  // 背景
  .circles {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    overflow: hidden;
    margin: 0px;
    padding: 0px;
    li {
      position: absolute;
      display: block;
      list-style: none;
      width: 20px;
      height: 20px;
      background: #fff;
      animation: animate 25s linear infinite;
      bottom: -200px;
      @keyframes animate {
        0% {
          transform: translateY(0) rotate(0deg);
          opacity: 1;
          border-radius: 0;
        }
        100% {
          transform: translateY(-1000px) rotate(720deg);
          opacity: 0;
          border-radius: 50%;
        }
      }
      &:nth-child(1) {
        left: 15%;
        width: 80px;
        height: 80px;
        animation-delay: 0s;
      }
      &:nth-child(2) {
        left: 5%;
        width: 20px;
        height: 20px;
        animation-delay: 2s;
        animation-duration: 12s;
      }
      &:nth-child(3) {
        left: 70%;
        width: 20px;
        height: 20px;
        animation-delay: 4s;
      }
      &:nth-child(4) {
        left: 40%;
        width: 60px;
        height: 60px;
        animation-delay: 0s;
        animation-duration: 18s;
      }
      &:nth-child(5) {
        left: 65%;
        width: 20px;
        height: 20px;
        animation-delay: 0s;
      }
      &:nth-child(6) {
        left: 75%;
        width: 150px;
        height: 150px;
        animation-delay: 3s;
      }
      &:nth-child(7) {
        left: 35%;
        width: 200px;
        height: 200px;
        animation-delay: 7s;
      }
      &:nth-child(8) {
        left: 50%;
        width: 25px;
        height: 25px;
        animation-delay: 15s;
        animation-duration: 45s;
      }
      &:nth-child(9) {
        left: 20%;
        width: 15px;
        height: 15px;
        animation-delay: 2s;
        animation-duration: 35s;
      }
      &:nth-child(10) {
        left: 85%;
        width: 150px;
        height: 150px;
        animation-delay: 0s;
        animation-duration: 11s;
      }
    }
  }
}
</style>
