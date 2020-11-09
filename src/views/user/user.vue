
<template>
  <div>哈哈哈</div>
</template>

<script>
  export default {
    created(){

      this.$axios.get('/apis/users/getUserInfo?id=1').then(res=>{
      console.log(res)
    })
  }
  }
</script>

<style lang="less" scoped>

</style>
