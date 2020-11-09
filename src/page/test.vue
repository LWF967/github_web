<template>

</template>

<script>
  import {setCookie,getCookie} from '../../assets/js/cookie.js'
  export default{
    mounted(){
      /*页面挂载获取cookie，如果存在username的cookie，则跳转到主页，不需登录*/
      if(getCookie('username')){
        this.$router.push('/home')
      }
    },
    methods:{
      login(){
        if(this.username == "" || this.password == ""){
          alert("请输入用户名或密码")
        }else{
          let data = {'username':this.username,'password':this.password}
          /*接口请求*/
          this.$http.post('http://localhost/vueapi/index.php/Home/user/login',data).then((res)=>{
            console.log(res)
            /*接口的传值是(-1,该用户不存在),(0,密码错误)，同时还会检测管理员账号的值*/
            if(res.data == -1){
              this.tishi = "该用户不存在"
              this.showTishi = true
            }else if(res.data == 0){
              this.tishi = "密码输入错误"
              this.showTishi = true
            }else if(res.data == 'admin'){
              /*路由跳转this.$router.push*/
              this.$router.push('/main')
            }else{
              this.tishi = "登录成功"
              this.showTishi = true
              setCookie('username',this.username,1000*60)
              setTimeout(function(){
                this.$router.push('/home')
              }.bind(this),1000)
            }
          })
        }
      }
    }
  }
</script>


<style scoped>

</style>
