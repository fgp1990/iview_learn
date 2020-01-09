<template>
  <div class="email">
    <!-- email: email@hisense.com -->
    <b>email:</b>
    <button @click="handleClick">肏我</button>
  </div>
</template>

<script>
export default {
  methods: {
    handleClick() {
      // $emit能够触发当前实例上的事件
      // 这种写法就是在当前实例上触发事件，就应该在当前实例上接收
      // this.$emit('on-click', 'hello')
      // 这是在bus实例上触发事件，所以就应该在bus上接收。bus是全局实例，另一个地方从bus接收，就实现了数据传递。
      // 当然，这样的话，下面的mounted就失效了，这个触发的事件在bus上，不在当前实例上
      this.$bus.$emit('on-click', 'hello')
    }
  },
  mounted() {
    this.$on('on-click', mes => {
      console.log(mes)
    })
  }
}
</script>
<style>
.email {
  border: 1px solid green;
}
</style>
