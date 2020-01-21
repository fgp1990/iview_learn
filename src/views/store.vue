<template>
  <div>
    <!-- <a-input v-model="inputValue"/> -->
    <!-- 上面这个写法属于语法糖，相当于 -->
    <!-- 这里再补一下，inputValue是一个变量，它在下面的data里面声明，下面不声明，这个不能用的 -->
    <a-input :value="inputValue" @input="handleInput" />
    <!-- 上面的value就相当于AInput.vue里面props里的value属性(key) -->
    <!-- 把这个原始的作为正式代码是因为，用了这个方式，才需要在下面写上methods，不然就不用了 -->
    <p>{{ inputValue }} -> lastLetter is {{ inputValuelastLetter }}</p>
    <!-- 这个是AShow控制的 -->
    <a-show :content="inputValue" />
    <p>{{ appName }}</p>
    <p>{{ userName }}</p>
    <p>{{ tmptest }}</p>
    <p>{{ appNameWithVersion }}</p>
    <button @click="handleChangeAppName">修改appName</button>
    <p>{{ appVersion }}</p>
  </div>
</template>

<script>
import AInput from '_c/AInput.vue'
import AShow from '_c/AShow.vue'
// 这是vuex的结构赋值，这个和下面的const { mapState }是互斥的。不用命名空间，就必须用这个
import { mapState, mapMutations, mapActions } from 'vuex'
// 下面这个写法和上面一行等价
// import vuex from 'vuex'
// const mapState = vuex.mapState

// // 使用命名空间
// import { createNamespacedHelpers } from 'vuex'
// // 传入命名空间的名字，'user'
// const { mapState } = createNamespacedHelpers('user')
// // 命名空间结束

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
  computed: {
    // computed里面，貌似是只能以函数形式返回值，不接受变量
    // 上下两种写法：
    // 三个点是vuex里面的展开操作符，它可以展开一个对象。mapState会返回一个对象，就是下面那一堆。
    // 这种写法并不好，只能传一个值。且不能传模块套嵌下内部的值。
    //     (20200111:存疑，网上有例子传了多个值，这个值来自于store/state.js里面定义的key)
    // 比方创建一个user的store，里面有state等状态，这种方法取不到user里面的状态
    // ...mapState([
    //   'appName'
    // ]),
    // 建议用这种方法，比较高级。不引入命名空间。
    ...mapState({
      appName: state => state.appName
      // 这个表示这里面是可以输入多个key的。下面的是user的userName，注意state后面是要有user的
      // userName: state => state.user.userName
    }),
    // 另外提供一个使用命名空间的写法，需要在上面引入createNamespaceHelpers
    ...mapState({
      userName: state => state.userName,
      // 这是新增一个key-value，上面的是原本有，进行修改的
      appVersion: state => state.appVersion

    }),
    // 不使用命名空间，但是能传'user'的方法。这里也可以不用传user
    // ...mapState('user', {
    //   userName: state => state.userName
    // }),
    tmptest() {
      return 'suibianshishi'
    },
    // appName () {
    //   // 这个appName就是在store里面定义的名字
    //   // store前的$符，猜测是取当前实例的第一层，然后按层次取内容。第一层既有框架默认填充的字段，也会有自己定义的内容。
    //   // 这个内容在main.js里面有定义，这个工程定义了router和store，这两个就能取出来。
    //   // 在main.js里面可以查到层次关系
    //   return this.$store.state.appName
    // },
    // userName () {
    //   // 这里注意顺序，先有state，然后才有user
    //   return this.$store.state.user.userName
    // },
    appNameWithVersion () {
      return this.$store.getters.appNameWithVersion
    },
    inputValuelastLetter () {
      // .substr(start, length)
      // 第一个表示开始的下标，后面是长度
      return this.inputValue.substr(-1)
    }
  },
  methods: {
    ...mapMutations([
      'SET_APP_NAME',
      'SET_USER_NAME'
    ]),
    ...mapActions([
      'updateAppName'
    ]),
    handleInput(val) {
      this.inputValue = val
    },
    handleChangeAppName () {
      // 第一个参数是在mutations.js里面定义得方法名。这个函数提交给mutations，然后mutitions修改值。
      // this.$store.commit('SET_APP_NAME', 'newAppName')
      // 第二个参数也可以是一个对象
      // this.$store.commit('SET_APP_NAME', {
      //   appName: 'newAppName'
      // })
      // 这里也可以写一个对象，包括了这两个参数
      this.$store.commit({
        type: 'SET_APP_NAME',
        appName: 'newAppName'
      })
      this.updateAppName()
      this.$store.commit('SET_APP_VERSION', 'appVersion')
    }
  }
}
</script>
