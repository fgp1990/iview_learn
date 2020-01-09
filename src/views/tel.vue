<template>
  <div class="tel">
    <!-- tel: 66666666666 -->
    <b>tel:{{ message }}</b>
  </div>
</template>

<script>
export default {
  data() {
    return {
      message: ''
    }
  },
  mounted() {
    // $on能给当前实例绑定一个事件监听
    this.$bus.$on('on-click', mes => {
      this.message = mes
    })
  }
}
</script>

<style>
.tel {
  border: 1px solid red;
}
</style>
