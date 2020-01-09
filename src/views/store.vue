<template>
  <div>
    <!-- <a-input v-model="inputValue"/> -->
    <!-- 上面这个写法属于语法糖，相当于 -->
    <!-- 这里再补一下，inputValue是一个变量，它在下面的data里面声明，下面不声明，这个不能用的 -->
    <a-input :value="inputValue" @input="handleInput" />
    <!-- 上面的value就相当于AInput.vue里面props里的value属性(key) -->
    <!-- 把这个原始的作为正式代码是因为，用了这个方式，才需要在下面写上methods，不然就不用了 -->
    <p>{{ inputValue }}</p>
    <a-show :content="inputValue" />
  </div>
</template>

<script>
import AInput from '_c/AInput.vue'
import AShow from '_c/AShow.vue'

export default {
  name: 'store',
  data() {
    return {
      // 这里是空串，就是个默认值，写什么页面出来就是什么，不是必须得是空串
      inputValue: ''
    }
  },
  components: {
    AInput,
    AShow
  },
  methods: {
    handleInput(val) {
      this.inputValue = val
    }
  }
}
</script>
