<template>
  <d2-container>

    <div class="setting_list">
      <div class="setting_item">
        <div class="setting_title">邀请新客户注册奖励</div>
        <div class="setting_span">

          <input type="text"
                 @blur="resourceFunc"
                 v-model="invite_amount"
                 placeholder="资源"
                 class="start_time" />
        </div>
        <div class="setting_span">
          <input type="text"
                 @blur="moneyFunc"
                 v-model="invite_count"
                 placeholder="金额"
                 class="end_time" />
        </div>
      </div>
      <div class="setting_item">
        <div class="setting_title">新客户注册获得资源</div>
        <div class="setting_input">
          <input type="text"
                 @blur="newFunc"
                 v-model="register_count"
                 class="cold_money" />
        </div>
        <div class="setting_item_tip">新客户注册后获得的金额</div>
      </div>
      <div class="setting_item">
        <div class="setting_title">自动确认交易时间</div>
        <div class="setting_input">
          <input type="text"
                 @blur="timeFunc"
                 v-model="resource_order_time"
                 placeholder="80"
                 class="fee_money" />
        </div>
        <div class="setting_item_tip">自动确认订单交易成功</div>
      </div>

    </div>
  </d2-container>
</template>


<script>
import { getSettings, putSettings } from '@api/settings'
export default {
  data () {
    return {
      invite_amount: 0,
      invite_count: 10,
      register_count: 12,
      resource_order_time: 80


    }
  },
  methods: {
    timeFunc () {
      putSettings({
        'resource_order_time': this.resource_order_time,
        'invite_count': this.invite_count,
        'invite_amount': this.invite_amount,
        'register_count': this.register_count
      }).then(response => {
        console.log(response, 'success') // 成功的返回
      })
        .catch(error => console.log(error, 'error')) // 失败的返回
    },
    resourceFunc () {
      putSettings({
        'resource_order_time': this.resource_order_time,
        'invite_count': this.invite_count,
        'invite_amount': this.invite_amount,
        'register_count': this.register_count
      }).then(response => {
        console.log(response, 'success') // 成功的返回
      })
        .catch(error => console.log(error, 'error')) // 失败的返回
    },
    moneyFunc () {
      putSettings({
        'resource_order_time': this.resource_order_time,
        'invite_count': this.invite_count,
        'invite_amount': this.invite_amount,
        'register_count': this.register_count
      }).then(response => {
        console.log(response, 'success') // 成功的返回
      })
        .catch(error => console.log(error, 'error')) // 失败的返回
    },
    newFunc () {
      putSettings({
        'resource_order_time': this.resource_order_time,
        'invite_count': this.invite_count,
        'invite_amount': this.invite_amount,
        'register_count': this.register_count
      }).then(response => {
        console.log(response, 'success') // 成功的返回
      })
        .catch(error => console.log(error, 'error')) // 失败的返回
    }
  },
  mounted: function () {
    getSettings().then(response => {
      this.invite_amount = response.data.invite_amount
      this.invite_count = response.data.invite_count
      this.register_count = response.data.register_count
      this.resource_order_time = response.data.resource_order_time
      console.log(response, 'success') // 成功的返回
    })
      .catch(error => console.log(error, 'error')) // 失败的返回
  }
}
</script>


<style>
.setting_list {
  width: 100%;
  display: flex;
  flex-wrap: wrap;
}

.setting_list .setting_item {
  width: 22%;
  height: 20vw;
  margin-bottom: 2vw;
  position: relative;
  background-color: #ffffff;
  box-shadow: 0vw 0.2vw 0.7vw 0vw rgba(0, 0, 0, 0.1);
  border-radius: 0.5vw;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  margin-right: 4%;
}

.setting_list .setting_item:nth-child(4n) {
  margin-right: 0;
}

.setting_list .setting_item .setting_title {
  font-size: 0.7rem;
  color: #333333;
}

.setting_list .setting_item .setting_span {
  width: 8vw;
  height: 3.1vw;
  display: flex;
  overflow: hidden;
  margin-top: 2.2vw;
  align-items: center;
  justify-content: center;
  border-radius: 0.5vw;
  border: solid 1px #b2b2b2;
}

.setting_list .setting_item .setting_span span {
  font-size: 0.7rem;
  color: #333;
}

.setting_list .setting_item .setting_span input {
  flex: 1;
  outline: none;
  border: none;
  background: none;
  text-align: center;
  font-size: 0.7rem;
}

.setting_list .setting_item .setting_input {
  width: 8vw;
  height: 3.1vw;
  display: flex;
  overflow: hidden;
  margin-top: 4vw;
  align-items: center;
  justify-content: center;
  border-radius: 0.5vw;
  border: solid 1px #b2b2b2;
}

.setting_list .setting_item .setting_input input {
  flex: 1;
  outline: none;
  border: none;
  background: none;
  text-align: center;
  font-size: 0.7rem;
}

.setting_list .setting_item .setting_item_tip {
  position: absolute;
  width: 100%;
  box-sizing: border-box;
  padding: 0 3vw;
  text-align: center;
  font-size: 0.4rem;
  color: #666666;
  bottom: 0.6vw;
  left: 0;
}

.setting_list .setting_item .see_office {
  width: 8vw;
  display: flex;
  margin-top: 0.5vw;
  justify-content: flex-end;
}

.setting_list .setting_item .see_office .see_office_btn {
  font-size: 0.4rem;
  color: #26b369;
  cursor: pointer;
}
</style>
