<template>
  <div id="login">
    <van-form @submit="onSubmit">
      <van-field
        v-model="userName"
        name="用户名"
        label="用户名"
        placeholder="用户名"
        :rules="[{ required: true, message: '请填写用户名' }]"
      />
      <van-field
        v-model="password"
        type="password"
        name="密码"
        label="密码"
        placeholder="密码"
        :rules="[{ required: true, message: '请填写密码' }]"
      />
      <div style="margin: 16px;">
        <van-button round block type="info" native-type="submit">
          提交
        </van-button>
      </div>
    </van-form>
  </div>
</template>

<script>
  import axios from 'axios'
  import VueAxios from 'vue-axios'
  import { Dialog } from 'vant';
  export default {
    data() {
      return {
        userName: '',
        password: '',
      };
    },
    methods: {
      onSubmit () {
        let data = {
          userName: this.userName,
          userPassword: this.password
        }
        this.axios.get('/api/login', {
          params: data
        }).then((res) => {
          console.log(res)
          var code = res.data.statusCode
          var msg = res.data.msg
          if( code == 200) {
            //登录成功，直接跳转首页
            this.$router.push('/')
          }else {
            //这里用的vant框架，弹出框，错误提示
            Dialog.alert({
              message: msg,
            }).then(() => {
              // on close
            });
          }

        })
      }
    },
  }
</script>
