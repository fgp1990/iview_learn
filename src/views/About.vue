<template>
  <div class="about">
    <h1>This is an about page</h1>
    <b>{{ food }}</b>
  </div>
</template>

<script>
export default {
  props: {
    food: {
      type: String,
      // 这个默认值，一定要设置上。就跟写后端一样，务必有默认值。
      default: 'apple'
    }
  }
}
</script>
