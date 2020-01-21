<template>
  <div class="home">
    <!-- <img alt="Vue logo" src="../assets/img/logo.png">
    <HelloWorld msg="Welcome to Your Vue.js App"/> -->
    <b>{{ food }}</b>
    <br>
    <b>{{ drink }}</b>
    <br>
    <button @click="handleClick('back')">返回上一页</button>
    <button @click="handleClick('push')">跳转到parent</button>
    <button @click="handleClick('replace')">替换到parent</button>
    <button @click="getInfo">请求数据</button>
  </div>
</template>

<script>
// @ is an alias to /src
// import HelloWorld from '@/components/HelloWorld.vue'
// import axios from 'axios'
import { getUserInfo } from '@/api/user'

export default {
  name: 'home',
  components: {
    // HelloWorld
  },
  props: {
    // 这个food并不要求和router里面route.query.food中的food一致，个人觉得应该是和参数数量有关
    food: {
      type: String,
      default: 'food'
    },
    drink: {
      type: String,
      default: 'drink'
    }
  },
  // 这是组件内守卫，和路由守卫类似。去哪里，从哪里，干什么。需要有next()函数，不然就卡主。
  // 这是在路由进入之前调用，此时页面还没有渲染，就无法使用this函数获取页面内容
  beforeRouteEnter(to, from, next) {
    // console.log(from.name)
    // 如果想用this,可以这样
    // next()
    next(vm => {
      // 这个vm就是this组件的内容
      // console.log(vm)
    })
  },
  beforeRouteLeave(to, from, next) {
    // 这里面是可以使用this的
    // 当用户要离开页面，提示用户没有保存。就用这个。
    // const leave = confirm('你摇滚了吗？')
    // if (leave) next()
    // else next(false)
    next()
  },
  methods: {
    handleClick(type) {
      // 这个this连接到了main.js文件里面声明Vue时候，注册的实例
      // go(-1)表示上一页，go(1)表示下一页
      // 这种写法还等价于
      // this.$router.go(-1)
      // 相等比较是三个=，这和其余语言不一样
      if (type === 'back') this.$router.back()
      // 这里的push的入参是一个访问路径，需要有斜线。或者输入一个对象。
      // else if (type === 'push') this.$router.push('/parent')
      else if (type === 'push') {
        // this.$router.push({
        //   name: 'argu',
        //   query: {
        //     // 这个用来在uri后面添加参数的，就是问号后面的部分。?name=goubi
        //     // 在跳转时，可以用这个方法向系统端传递参数。
        //     name: 'goubi'
        //   },
        //   params: {
        //     // 这是uri的部分，在问号之前
        //     name: 'params_value'
        //   }
        // })
        // 第二种写法。上面是用对象告诉程序自己组装uri，这个是人来拼好uri。
        // 这里path和params是不兼容的，如果使用了path，程序会自己忽略params。如果要用params的话，就得用上面的方法
        const name = 'params_value' // 这个变量得自己定义
        this.$router.push({
          path: `/argu/${name}` // 这个地方必须要用反引号，因为有name这个变量。用单引号就变成了字符了
        })
      } else if (type === 'replace') {
        // replace 不会在浏览器的浏览历史里面留下痕迹。新页面的内容会覆盖原来的内容。
        // 此时点击浏览器的后退按钮，就不是点击替换时的页面，而是这之前的那个页面。
        this.$router.replace({
          name: 'parent'
        })
      }
    },
    // 这是在这里定义getInfo函数，下面还有个调用axios里面定义好的函数
    // getInfo () {
    //   axios.post('/coupon/getCustomerCouponNum', { userId: 21 }).then(res => {
    //     console.log(res)
    //   })
    // }
    getInfo () {
      getUserInfo({ userId: 21 }).then(res => {
        console.log('res: ', res)
      })
    }
  }
}
</script>
