<template>
  <div id="app">
    <div id="nav">
      <!-- router-link 封装了一个a标签，to制定了一个路径 -->
      <router-link to="/">Home</router-link>|
      <!-- 这里使用了v-bind来绑定此处软链的指向。与上一行的区别就是上一行用的是路径，这里用的是name属性。
           name属性需要在router文件里面设置后才能使用 -->
      <router-link v-bind:to="{name: 'about'}">About</router-link>
    </div>
    <!-- 如果只有一个router-view，就用transition，不用加-group
         另外，这个transition只要加上，就默认有一个渐入渐出效果，具体数值可以在下面的style里面控制 -->

    <!-- <transition-group name="router"> -->
    <!-- 这个transition还有一种变量写法
         这种写法需要在下面script里面加上export default -->
    <transition-group :name="routerTransition">
      <!-- router-view是一个视图渲染组件。如果没有任何属性标识，那它就绑定到default组件上。如果有，就绑定到指定组件。
         具体属性在router的component里面定义。如果有，就按照规则绑定。如果没有，就跳过不显示
         router里面有很多不同路径，它会自己卡component里面的属性，卡哪个算哪个-->
      <router-view key="default"/>
      <router-view key="email" name='email' />
      <router-view key="tel" name='tel' />
    </transition-group>
  </div>
</template>

<script>
export default {
  data () {
    return {
      routerTransition: ''
    }
  },
  watch: {
    // to表示当前路由路径
    '$route' (to) {
      // 这是在监听url的query的参数，如果存在query，且存在transitionName，就把这个参数的值赋给routerTransition
      // 这里，这个值必须和下面style的属性名字一致，即，它必须得是“router”，不然不好用
      // 这样，逻辑上就和第一种方法对应上了
      // 这里其实也可以用别的方法，比方？？？。应该是有的，但是没有讲
      to.query && to.query.transitionName && (this.routerTransition = to.query.transitionName)
    }
  }
}
</script>

<style lang="less">
// 下面router这一串，只有router是和上面transition的name属性对应的，后面的都是固定的
// 初始状态
.router-enter{
  // 这是透明度的意思
  opacity: 0;
}
// 初始到活动状态
.router-enter-active{
  transition: opacity 1s ease;
}
// 页面完全显示的状态
.router-enter-to{
  opacity: 1;
}
// 离开初始状态
.router-leave{
  // 这是透明度的意思
  opacity: 1;
}
// 离开的活动状态
.router-leave-active{
  transition: opacity 1s ease;
}
// 页面完全离开的状态
.router-leave-to{
  opacity: 0;
}
#app {
  font-family: "Avenir", Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

#nav {
  padding: 30px;

  a {
    font-weight: bold;
    color: #2c3e50;

    &.router-link-exact-active {
      color: #42b983;
    }
  }
}
</style>
