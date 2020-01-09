<template>
<!-- input表示输入框，给这个input标签绑定一个input事件。当input标签里面的值变化，会触发input事件，执行handleInput
     显示的值就是后面那个value的值 -->
  <input @input="handleInput" :value="value" />
</template>

<script>
export default {
  name: 'AInput',
  props: {
    value: {
      type: [String, Number],
      default: ''
    }
  },
  methods: {
    handleInput(event) {
      const value = event.target.value
      // 出发input事件，并将value作为回调函数的值返给它的父级组件（就是调用它的store）
      this.$emit('input', value)
    }
  }
}
</script>
