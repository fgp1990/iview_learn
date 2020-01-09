<template>
  <div>
    <!-- route表示当前加载路由对象，里面包含一个params的对象，对象里面有一个name值
    类似于request函数获取uri或者body的能力 -->
    <!-- {{ $route.params.name }} -->
    {{ name }}
  </div>
</template>

<script>
export default {
  props: {
    // 定义好了之后上面就可以使用标签,就是这里定义的
    // 这个name的名字，要和传入的参数名一致
    name: {
      // 类型使用数组，表示兼容。即两种类型都可以
      // 也可以是单独类型
      // type: [String, Number]
      type: String,
      default: 'gouride'
    }
  },
  beforeRouteUpdate (to, from, next) {
    // 这里面是可以使用this
    // 这个只有在hash模式下才生效。只有hash模式才不会重新请求系统端，history会再次请求系统端，就不是在原页面下单纯刷新内容了
    console.log(to.name, from.name)
  }
}
</script>
