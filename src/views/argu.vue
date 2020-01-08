<template>
  <div>
    <!-- route表示当前加载路由对象，里面包含一个params的对象，对象里面有一个name值
    类似于request函数获取uri或者body的能力 -->
    {{ $route.params.name }}
  </div>
</template>

<script>
export default {
  //
}
</script>
