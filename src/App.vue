<template>
  <div id="app">
    <div id="nav">
      <!-- router-link 封装了一个a标签，to制定了一个路径 -->
      <router-link to="/">Home</router-link>|
      <!-- 这里使用了v-bind来绑定此处软链的指向。与上一行的区别就是上一行用的是路径，这里用的是name属性。
           name属性需要在router文件里面设置后才能使用 -->
      <router-link v-bind:to="{name: 'about'}">About</router-link>
    </div>
    <!-- router-view是一个视图渲染组件 -->
    <router-view />
    <router-view name='email' />
    <router-view name='tel' />
  </div>
</template>

<style lang="less">
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
